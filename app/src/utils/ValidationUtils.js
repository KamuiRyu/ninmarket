class ValidationUtils {
  static validateNull(value, field = "") {
    if (!value) {
      return {
        isValid: false,
        errorMessage: "The field " + field + " is required.",
      };
    }
  }
  static validateEmail(email, type = 1, error = "") {
    // Type 1 = register, Type 2 = login
    const emailValidation = this.validateNull(email, "email");
    if (emailValidation && emailValidation.isValid === false) {
      return emailValidation;
    }
    switch (error) {
      case "email-required":
        return {
          isValid: false,
          errorMessage: "The field email is required",
        };
      case "email-invalid":
        return {
          isValid: false,
          errorMessage: "Please provide a valid email.",
        };
      case "email-existing":
        return {
          isValid: false,
          errorMessage: "Email already exists",
        };
      default:
        break;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        errorMessage: "Please provide a valid email.",
      };
    }
    return { isValid: true, errorMessage: "" };
  }
  static validateConfirmPassword(password, confirmPassword, error = "") {
    if (confirmPassword === "" && password === "") {
      return {
        isValid: false,
        errorMessage: "The field confirm password is required",
      };
    }
    if (error === "confirmPassword-invalid") {
      return {
        isValid: false,
        errorMessage: "The passwords do not match.",
      };
    }
    if (password !== confirmPassword) {
      return {
        isValid: false,
        errorMessage: "The passwords do not match.",
      };
    }
    return { isValid: true, errorMessage: "" };
  }
  static validatePassword(password, type = 1, error = "") {
    // Type 1 = register, Type 2 = login
    if (error === "password-invalid") {
      return {
        isValid: false,
        errorMessage: "The field password is required.",
      };
    }
    const passwordValidation = this.validateNull(password, "password");
    if (passwordValidation && passwordValidation.isValid === false) {
      return passwordValidation;
    }
    let isLevel = "";
    if (type === 1) {
      if (password.length < 8) {
        return {
          isLevel: "",
          isValid: false,
          errorMessage: "The password must have at least 8 characters.",
        };
      }

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
      return {
        isLevel: isLevel,
        isValid: true,
        errorMessage: "",
      };
    }
    return { isLevel: isLevel, isValid: true, errorMessage: "" };
  }

  static validateNinjaName(ninjaName, error = "") {
    if (error === "name-invalid" || error === "name-existing") {
      if (error === "name-invalid") {
        return {
          isValid: false,
          errorMessage: "The field ninja name is required.",
        };
      } else {
        return {
          isValid: false,
          errorMessage: "Ninja name already exists.",
        };
      }
    }
    const ninjaNameValidation = this.validateNull(ninjaName, "ninja name");
    if (ninjaNameValidation && ninjaNameValidation.isValid === false) {
      return ninjaNameValidation;
    }

    if (ninjaName.length > 20) {
      return {
        isValid: false,
        errorMessage: "The ninja name must have a maximum of 20 characters.",
      };
    }

    return { isValid: true, errorMessage: "" };
  }
}
export default ValidationUtils;
