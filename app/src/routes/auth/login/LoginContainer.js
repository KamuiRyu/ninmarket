import React, { useState } from "react";
import FormElements from "../../../components/common/FormElements";
import ValidationUtils from "../../../utils/ValidationUtils";
import AuthServices from "../../../services/AuthServices";
import axios from "axios";
import { useTranslation } from "react-i18next";

function LoginContainer({ handlePageChange }) {
  const { t } = useTranslation();
  const [emailValidation, setEmailValidation] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);
  const validateEmailReturn = (event) => {
    const validation = ValidationUtils.validateEmail(event.target.value, 2, "");
    setEmailValidation(validation);
  };
  const validatePasswordReturn = (event) => {
    const validation = ValidationUtils.validatePassword(
      event.target.value,
      2,
      ""
    );
    setPasswordValidation(validation);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
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
          ValidationUtils.validatePassword(
            "",
            2,
            error["passwordInvalid"].errorTag
          )
        );
      }
    } else {
      const validationEmail = ValidationUtils.validateEmail(email, 2, ""),
        validationPassword = ValidationUtils.validatePassword(password, 2, "");
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
          localStorage.setItem(
            "auth_expirationToken",
            data.user.expirationToken
          );
          localStorage.setItem(
            "auth_token",
            data.user.token
          );
          localStorage.setItem(
            "auth_role",
            data.user.role_id
          );
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
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="text-center mx-6">
        <h1 className="text-3xl font-semibold text-white">
          {t("login.welcomeBack.title")}
        </h1>
        <p className="text-sm text-center text-gray-300 mt-1">
          {t("login.welcomeBack.subtitle")}
        </p>
      </div>
      <div className="flex flex-row gap-2 space-x-5 mt-8 justify-center">
        <FormElements.ButtonForm
          divParentActive={false}
          classButton="btnSocial google"
        >
          <i className="bx bxl-google"></i>
        </FormElements.ButtonForm>
        <FormElements.ButtonForm
          divParentActive={false}
          classButton="btnSocial discord"
        >
          <i className="bx bxl-discord-alt"></i>
        </FormElements.ButtonForm>
      </div>
      <FormElements.SeperatorForm
        classTo="mt-5 w-5/6 mx-auto"
        classChildren="text-dark-medium bg-dark-900"
        classSeparator="bg-dark-700"
      >
        {t("login.signInWith")}
      </FormElements.SeperatorForm>
      <div className="m-6">
        <form className="mb-4" onSubmit={handleSubmit} noValidate>
          <div>
            <FormElements.InputForm
              label={t("login.emailAddress")}
              id="signinEmail"
              name="email"
              type="email"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              maxLength="999"
              spellCheck="false"
              classTo="mb-6"
              onBlurInput={validateEmailReturn}
              onChangeInput={handleChange}
              {...(emailValidation && {
                isValid: emailValidation.isValid,
                errorMessage: emailValidation.errorMessage,
              })}
            />
          </div>
          <div>
            <FormElements.InputForm
              label={t("login.password")}
              id="signinPassword"
              name="password"
              type="password"
              classTo="mb-1"
              onBlurInput={validatePasswordReturn}
              onChangeInput={handleChange}
              {...(passwordValidation && {
                isValid: passwordValidation.isValid,
                errorMessage: passwordValidation.errorMessage,
              })}
            ></FormElements.InputForm>
          </div>
          <FormElements.ButtonForm
            type="button"
            classButton="text-sm text-color-main"
            classTo="mb-6"
            onClickButton={() => handleClick("forgot-password")}
          >
            {t("login.forgotPassword")}
          </FormElements.ButtonForm>
          <div>
            <FormElements.CheckboxDescForm
              id="signinRememberMe"
              name="rememberMe"
              labelTitle={t("login.rememberMe.title")}
              spanTitle={t("login.rememberMe.subtitle")}
              classLabelTitle="text-dark-high"
              classSpanTitle="text-dark-medium"
              checkClass="text-color-main"
              divClass="mb-5"
              onBlurCheck={handleChange}
            ></FormElements.CheckboxDescForm>
          </div>
          <p className="text-sm text-left text-gray-300 mb-3">
            {t("login.needAccount")}
            &nbsp;
            <FormElements.ButtonForm
              divParentActive={false}
              type="button"
              classButton="font-semibold text-color-main link-button"
              classButtonFocus="focus:text-indigo-600 focus:outline-none focus:underline"
              onClickButton={() => handleClick("register")}
            >
              {t("login.signUp")}
            </FormElements.ButtonForm>
          </p>
          <div>
            <FormElements.ButtonForm
              classButton="formBtn w-full h-[50px]"
              classButtonHover="hover:bg-indigo-600"
              classButtonFocus="focus:outline-none"
              classButtonAnimation="duration-100 ease-in-out"
              type="submit"
            >
              {t("login.signIn")}
            </FormElements.ButtonForm>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginContainer;
