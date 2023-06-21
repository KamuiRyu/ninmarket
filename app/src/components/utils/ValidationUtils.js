class ValidationUtils {
    static validateNull(value, field = "") {
        if (!value) {
            return {
                isValid: false,
                errorMessage: "The field " + field + " is required.",
            };
        }
    }
    static validateEmail(email) {
        const emailValidation = this.validateNull(email, "email");
        if (emailValidation && emailValidation.isValid === false) {
            return emailValidation;
        }
        switch (email) {
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
    static validateConfirmPassword(password, confirmPassword) {
        if (confirmPassword === "" && password === "") {
            return {
                isValid: false,
                errorMessage: "The field confirm password is required",
            };
        }
        if (confirmPassword === "confirmPassword-invalid") {
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
    static validatePassword(password) {
        if (password === "password-invalid") {
            return {
                isValid: false,
                errorMessage: "The field password is required.",
            };
        }

        const regexPassword =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#]).{8,}$|^(?=.*[a-zA-Z]).{8,}$|^(?=.*[a-z])(?=.*[A-Z]).{8,}$|^(?=.*[a-z])(?=.*\d).{8,}$/;
        let isLevel = "weak";

        if (regexPassword.test(password)) {
            if (regexPassword.test(password)) {
                if (
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#]).{8,}$/.test(
                        password
                    )
                ) {
                    isLevel = "strongest";
                } else if (/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
                    isLevel = "strong";
                } else if (/^(?=.*[a-z])(?=.*\d).{8,}$/.test(password)) {
                    isLevel = "medium";
                } else if (/^(?=.*[a-zA-Z]).{8,}$/.test(password)) {
                    isLevel = "weak";
                }
            }
        }
        const passwordValidation = this.validateNull(password, "password");
        if (passwordValidation && passwordValidation.isValid === false) {
            return passwordValidation;
        }

        if (password.length < 8) {
            return {
                isLevel: isLevel,
                isValid: false,
                errorMessage: "The password must have at least 8 characters.",
            };
        }

        return { isLevel: isLevel, isValid: true, errorMessage: "" };
    }

    static validateNinjaName(ninjaName) {
        if (ninjaName === "name-invalid" || ninjaName === "name-existing") {
            if (ninjaName === "name-invalid") {
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
                errorMessage:
                    "The ninja name must have a maximum of 20 characters.",
            };
        }

        return { isValid: true, errorMessage: "" };
    }
    // Adicione outros métodos de validação conforme necessário
}

export default ValidationUtils;
