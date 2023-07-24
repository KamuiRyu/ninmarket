import i18n from '../i18n';
class ValidationUtils {
  static setTranslationFunction() {
    return i18n.t.bind(i18n);
  }

  static validateNull(value, field = "", isLevel = "") {
    const t = this.setTranslationFunction();
    if (value === "") {
      return {
        isLevel: isLevel,
        isValid: false,
        errorMessage: t("validation.fieldRequired", { field: field }),
      };
    }
  }
  static validateEmail(email, type = 1, error = "") {
    // Type 1 = register, Type 2 = login
    const t = this.setTranslationFunction();
    const emailValidation = this.validateNull(email, t("validation.emailField"));
    if(error !== ""){
      switch (error) {
        case "email-required":
          return {
            isValid: false,
            errorMessage: t("validation.emailRequired"),
          };
        case "email-invalid":
          return {
            isValid: false,
            errorMessage: t("validation.emailInvalid"),
          };
        case "email-existing":
          return {
            isValid: false,
            errorMessage: t("validation.emailExisting", { email: email }),
          };
        default:
          break;
      }
    }else{
      if (emailValidation && emailValidation.isValid === false) {
        return emailValidation;
      }
     
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        return {
          isValid: false,
          errorMessage: t("validation.emailInvalid"),
        };
      }
      return { isValid: true, errorMessage: "" };
    }
    
  }
  static validateConfirmPassword(password, confirmPassword, error = "") {
    const t = this.setTranslationFunction();
    if (confirmPassword === "" && password === "") {
      return {
        isValid: false,
        errorMessage: t("validation.confirmPasswordRequired"),
      };
    }
    if (error === "confirmPassword-invalid") {
      return {
        isValid: false,
        errorMessage: t("validation.passwordMismatch"),
      };
    }
    if (password !== confirmPassword) {
      return {
        isValid: false,
        errorMessage: t("validation.passwordMismatch"),
      };
    }
    return { isValid: true, errorMessage: "" };
  }
  static validatePassword(password, type = 1, error = "") {
    const t = this.setTranslationFunction();
    // Type 1 = register, Type 2 = login
    let isLevel = "";
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/.test(
        password
      )
    ) {
      isLevel = "strongest";
    } else if (/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/.test(password)) {
      isLevel = "strong";
    } else if (/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      isLevel = "medium";
    } else if (/.{8,}/.test(password)) {
      isLevel = "weak";
    }
    if (error === "password-invalid") {
      return {
        isLevel: isLevel,
        isValid: false,
        errorMessage: t("validation.fieldRequired", { field: "password" }),
      };
    }
    const passwordValidation = this.validateNull(password, t("validation.passwordField"), isLevel);
    if (passwordValidation && passwordValidation.isValid === false) {
      return passwordValidation;
    }

    if (type === 1) {
      if (password.length < 8) {
        return {
          isLevel: "",
          isValid: false,
          errorMessage: t("validation.passwordLength"),
        };
      }
      return {
        isLevel: isLevel,
        isValid: true,
        errorMessage: "",
      };
    }
    return { isLevel: isLevel, isValid: true, errorMessage: "" };
  }

  static validateNinjaName(ninjaName, error = "") {
    const t = this.setTranslationFunction();
    if (error === "name-invalid" || error === "name-existing") {
      if (error === "name-invalid") {
        return {
          isValid: false,
          errorMessage: t("validation.ninjaNameRequired"),
        };
      } else {
        return {
          isValid: false,
          errorMessage: t("validation.ninjaNameExisting", { ninjaName: ninjaName }),
        };
      }
    }
    const ninjaNameValidation = this.validateNull(ninjaName, t("validation.ninjaNameField"));
    if (ninjaNameValidation && ninjaNameValidation.isValid === false) {
      return ninjaNameValidation;
    }

    if (ninjaName.length > 20) {
      return {
        isValid: false,
        errorMessage: t("validation.ninjaNameLength"),
      };
    }

    return { isValid: true, errorMessage: "" };
  }
}
export default ValidationUtils;
