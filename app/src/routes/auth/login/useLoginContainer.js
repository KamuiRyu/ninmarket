import { useState } from "react";
import AuthServices from "../../../services/AuthServices";
import axios from "axios";
import ValidationUtils from "../../../utils/ValidationUtils";
import { useTranslation } from "react-i18next";

const INITIAL_FORM_DATA = {
  email: "",
  password: "",
  rememberMe: false,
};

export function useLoginContainer(handlePageChange) {
  const { t } = useTranslation();
  const [emailValidation, setEmailValidation] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const validateEmailReturn = (event) => {
    const validation = ValidationUtils.validateEmail(event.target.value, 2, "");
    setEmailValidation(validation);
  };

  const validatePasswordReturn = (event) => {
    const validation = ValidationUtils.validatePassword(event.target.value, 2, "");
    setPasswordValidation(validation);
  };

  const validateAll = (error, email = "", password = "") => {
    if (error) {
      if (error["emailInvalid"]) {
        setEmailValidation(
          ValidationUtils.validateEmail("", 2, error["emailInvalid"].errorTag)
        );
      }
      if (error["passwordInvalid"]) {
        setPasswordValidation(
          ValidationUtils.validatePassword("", 2, error["passwordInvalid"].errorTag)
        );
      }
    } else {
      const validationEmail = ValidationUtils.validateEmail(email, 2, "");
      const validationPassword = ValidationUtils.validatePassword(password, 2, "");

      if (!validationPassword.isValid || !validationEmail.isValid) {
        setEmailValidation(validationEmail);
        setPasswordValidation(validationPassword);
        return false;
      }
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validator = validateAll("", formData.email, formData.password);
    if (validator) {
      try {
        const authToken = new AuthServices();
        const csrfData = await authToken.fetchCSRFToken();
        if (csrfData.csrfToken) {
          axios.defaults.withCredentials = true;
          const response = await axios.post(
            process.env.REACT_APP_API_URL +
              ":" +
              process.env.REACT_APP_API_PORT +
              "/api/auth/login",
            {
              email: formData.email,
              password: formData.password,
              rememberMe: formData.rememberMe ? formData.rememberMe : false,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "xsrf-token": csrfData.csrfToken,
              },
              credentials: "include",
              mode: "cors",
            }
          );
          if (response.data.login === false) {
            setEmailValidation({
              isValid: false,
              errorMessage: t("validation.emailOrPasswordInvalid"),
            });
            setPasswordValidation({
              isValid: false,
              errorMessage: t("validation.emailOrPasswordInvalid"),
            });
            return false;
          }
          const data = response.data;
          localStorage.setItem("auth_login", true);
          localStorage.setItem("auth_email", data.user.email);
          localStorage.setItem("auth_name", data.user.name);
          localStorage.setItem("auth_photo", data.user.photo);
          localStorage.setItem("auth_status", data.user.status);
          localStorage.setItem("auth_expirationToken", data.user.expirationToken);
          localStorage.setItem("auth_token", data.user.token);
          localStorage.setItem("auth_role", data.user.role_id);
          window.location.reload();
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  const handleClick = (page) => {
    handlePageChange(page);
  };

  return {
    emailValidation,
    passwordValidation,
    formData,
    handleChange,
    validateEmailReturn,
    validatePasswordReturn,
    handleSubmit,
    handleClick,
    t,
  };
}