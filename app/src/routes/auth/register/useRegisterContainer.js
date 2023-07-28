import { useState, useEffect } from "react";
import axios from "axios";
import AuthServices from "../../../services/AuthServices";
import ValidationUtils from "../../../utils/ValidationUtils";
import { useTranslation } from "react-i18next";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const useRegisterContainer = ({
  handlePageChange,
  onOpenTerms,
  onOpenPolicy,
}) => {
  const { t } = useTranslation();
  const [emailValidation, setEmailValidation] = useState(null);
  const [ninjaNameValidation, setNinjaNameValidation] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [confirmPasswordValidation, setConfirmPasswordValidation] =
    useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [response, setResponse] = useState(null);
  const [countdown, setCountdown] = useState(4);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validator = validateAll();
    if (validator) {
      try {
        const authToken = new AuthServices();
        const csrfData = await authToken.fetchCSRFToken();

        if (csrfData.csrfToken) {
          axios.defaults.withCredentials = true;
          const config = {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "xsrf-token": csrfData.csrfToken,
            },
            credentials: "include",
            mode: "cors",
          };

          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/users`,
            formData,
            config
          );

          if (response.data.success === false) {
            validateAll(response.data);
            return false;
          }

          if (response.status !== 200) {
            throw new Error("Falha na solicitação");
          }
          setResponse(response.data);
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          validateAll(error.response.data);
        }
        setResponse(null);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateAll = (
    error,
    name = formData.name,
    email = formData.email,
    password = formData.password,
    confirmPassword = formData.confirmPassword
  ) => {
    if (error) {
      let errorType = [];

      for (let key in error) {
        if (
          error[key] &&
          typeof error[key] === "object" &&
          Object.values(error[key]).some(
            (value) => typeof value === "string" && value.includes("email")
          )
        ) {
          errorType.push("email");
        }
        if (
          error[key] &&
          typeof error[key] === "object" &&
          Object.values(error[key]).some(
            (value) => typeof value === "string" && value.includes("password")
          )
        ) {
          errorType.push("password");
        }
        if (
          error[key] &&
          typeof error[key] === "object" &&
          Object.values(error[key]).some(
            (value) => typeof value === "string" && value.includes("name")
          )
        ) {
          errorType.push("name");
        }
        if (
          error[key] &&
          typeof error[key] === "object" &&
          Object.values(error[key]).some(
            (value) =>
              typeof value === "string" && value.includes("confirmPassword")
          )
        ) {
          errorType.push("confirmPassword");
        }
      }
      for (let i = 0; i < errorType.length; i++) {
        const type = errorType[i];
        switch (type) {
          case "email":
            if (error["emailRequired"]) {
              setEmailValidation(
                ValidationUtils.validateEmail(
                  "",
                  1,
                  error["emailRequired"].errorTag
                )
              );
            }
            if (error["emailInvalid"]) {
              setEmailValidation(
                ValidationUtils.validateEmail(
                  "",
                  1,
                  error["emailInvalid"].errorTag
                )
              );
            }
            if (error["emailExisting"]) {
              setEmailValidation(
                ValidationUtils.validateEmail(
                  "",
                  1,
                  error["emailExisting"].errorTag
                )
              );
            }
            break;
          case "password":
            if (error["passwordInvalid"]) {
              setPasswordValidation(
                ValidationUtils.validatePassword(
                  password,
                  1,
                  error["passwordInvalid"].errorTag
                )
              );
            }
            break;
          case "name":
            if (error["nameInvalid"]) {
              setNinjaNameValidation(
                ValidationUtils.validateNinjaName(
                  "",
                  error["nameInvalid"].errorTag
                )
              );
            }
            if (error["nameExisting"]) {
              setNinjaNameValidation(
                ValidationUtils.validateNinjaName(
                  "",
                  error["nameExisting"].errorTag
                )
              );
            }
            break;
          case "confirmPassword":
            if (error["confirmPasswordInvalid"]) {
              setConfirmPasswordValidation(
                ValidationUtils.validateConfirmPassword(
                  "",
                  "",
                  error["confirmPasswordInvalid"].errorTag
                )
              );
            }
            break;
          default:
            break;
        }
      }
    } else {
      const validationNinjaName = ValidationUtils.validateNinjaName(name);
      const validationEmail = ValidationUtils.validateEmail(email);
      const validationPassword = ValidationUtils.validatePassword(password);
      const validationConfirmPassword = ValidationUtils.validateConfirmPassword(
        password,
        confirmPassword
      );
      setNinjaNameValidation(validationNinjaName);
      setEmailValidation(validationEmail);
      setPasswordValidation(validationPassword);
      setConfirmPasswordValidation(validationConfirmPassword);

      return (
        validationNinjaName.isValid &&
        validationEmail.isValid &&
        validationPassword.isValid &&
        validationConfirmPassword.isValid
      );
    }
  };

  const validateEmailReturn = (event) => {
    const validation = ValidationUtils.validateEmail(event.target.value);
    setEmailValidation(validation);
  };

  const validateNinjaNameReturn = (event) => {
    const validation = ValidationUtils.validateNinjaName(event.target.value);
    setNinjaNameValidation(validation);
  };

  const validatePasswordReturn = (event) => {
    const validation = ValidationUtils.validatePassword(event.target.value);
    setPasswordValidation(validation);
  };

  const validateConfirmPasswordReturn = (event) => {
    const passwordValue = formData.password;
    if (passwordValue !== "") {
      const validation = ValidationUtils.validateConfirmPassword(
        event.target.value,
        passwordValue
      );
      setConfirmPasswordValidation(validation);
    }
  };

  useEffect(() => {
    let countdownInterval;
    if (response && response.success === true) {
      countdownInterval = setInterval(() => {
        if (countdown === 1) {
          handleClick();
        } else {
          setCountdown((countdown) => countdown - 1);
        }
      }, 1000);
    }
    return () => {
      clearInterval(countdownInterval);
    };
  }, [response, countdown]);

  const handleClick = (e = "") => {
    handlePageChange("login");
  };

  return {
    emailValidation,
    ninjaNameValidation,
    passwordValidation,
    confirmPasswordValidation,
    formData,
    response,
    countdown,
    handleSubmit,
    handleChange,
    handleClick,
    validateEmailReturn,
    validateNinjaNameReturn,
    validatePasswordReturn,
    validateConfirmPasswordReturn,
    t
  };
};

export default useRegisterContainer;
