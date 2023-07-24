import { useState, useEffect } from "react";
import axios from "axios";
import AuthServices from "../../../services/AuthServices";
import ValidationUtils from "../../../utils/ValidationUtils";
import FormElements from "../../../components/common/FormElements";
import { SuccessAlert } from "../../../components/common/Alerts";
import { useTranslation } from "react-i18next";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterContainer({
  handlePageChange,
  onOpenTerms,
  onOpenPolicy,
}) {
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

          if (!response.status === 200) {
            throw new Error("Falha na solicitação");
          }

          if (response.data.success === false) {
            validateAll(response.data);
            return false;
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

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <>
        <div className="text-center m-6">
          <h1 className="text-3xl font-semibold text-white">
            {t("register.title")}
          </h1>
        </div>
        <div className="mx-6">
          {response && response.success === true && (
            <SuccessAlert
              divClass="mb-4 shadow rounded-md py-5 pl-6 pr-8 sm:pr-6 bg-dark-1000"
              childrenClass="text-dark-high"
              onClose={true}
              onCloseBtn={false}
            >
              {t("register.successAlertMessage", { countdown: countdown })}
            </SuccessAlert>
          )}
          <form className="mb-4" onSubmit={handleSubmit} noValidate>
            <div>
              <FormElements.InputForm
                maxLength="20"
                label={t("register.ninjaNameLabel")}
                id="signupNinjaName"
                name="name"
                type="text"
                autoComplete="on"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                classTo="mb-6"
                onBlurInput={validateNinjaNameReturn}
                onChangeInput={handleChange}
                {...(ninjaNameValidation && {
                  isValid: ninjaNameValidation.isValid,
                  errorMessage: ninjaNameValidation.errorMessage,
                })}
              ></FormElements.InputForm>
            </div>
            <div>
              <FormElements.InputForm
                label={t("register.emailLabel")}
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
              ></FormElements.InputForm>
            </div>
            <div className="mb-6">
              <FormElements.InputForm
                label={t("register.passwordLabel")}
                id="signupPassword"
                name="password"
                type="password"
                maxLength="999"
                classTo="mb-6"
                onBlurInput={validatePasswordReturn}
                onChangeInput={handleChange}
                {...(passwordValidation && {
                  isValid: passwordValidation.isValid,
                  errorMessage: passwordValidation.errorMessage,
                  classError: "mx-1",
                })}
              ></FormElements.InputForm>
              {passwordValidation && (
                <div className="mt-2 flex">
                  <div className="w-1/4 px-1">
                    <div
                      className={`h-2 rounded-xl transition-colors ${
                        passwordValidation.isLevel === "strongest"
                          ? "bg-green-500"
                          : passwordValidation.isLevel === "strong"
                          ? "bg-yellow-500"
                          : passwordValidation.isLevel === "medium"
                          ? "bg-orange-500"
                          : passwordValidation.isLevel === "weak"
                          ? "bg-red-400"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                  <div className="w-1/4 px-1">
                    <div
                      className={`h-2 rounded-xl transition-colors ${
                        passwordValidation.isLevel === "strongest"
                          ? "bg-green-500"
                          : passwordValidation.isLevel === "strong"
                          ? "bg-yellow-500"
                          : passwordValidation.isLevel === "medium"
                          ? "bg-orange-500"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                  <div className="w-1/4 px-1">
                    <div
                      className={`h-2 rounded-xl transition-colors ${
                        passwordValidation.isLevel === "strongest"
                          ? "bg-green-500"
                          : passwordValidation.isLevel === "strong"
                          ? "bg-yellow-500"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                  <div className="w-1/4 px-1">
                    <div
                      className={`h-2 rounded-xl transition-colors ${
                        passwordValidation.isLevel === "strongest"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <FormElements.InputForm
                label={t("register.confirmPasswordLabel")}
                id="signupConfirmPassword"
                name="confirmPassword"
                type="password"
                maxLength="999"
                classTo="mb-6"
                onChangeInput={handleChange}
                onBlurInput={validateConfirmPasswordReturn}
                {...(confirmPasswordValidation && {
                  isValid: confirmPasswordValidation.isValid,
                  errorMessage: confirmPasswordValidation.errorMessage,
                })}
              ></FormElements.InputForm>
            </div>
            <p className="text-sm text-left text-gray-400 mt-1">
              {t("register.termsOfService.1")}&nbsp;
              <FormElements.ButtonForm
                divParentActive={false}
                type="button"
                classButton="font-semibold text-color-main link-button"
                classButtonFocus="focus:text-indigo-600 focus:outline-none focus:underline"
                onClickButton={onOpenTerms}
              >
                {t("register.termsLink")}&nbsp;
              </FormElements.ButtonForm>
              {t("register.termsOfService.2")}&nbsp;
              <FormElements.ButtonForm
                divParentActive={false}
                type="button"
                classButton="font-semibold text-color-main link-button"
                classButtonFocus="focus:text-indigo-600 focus:outline-none focus:underline"
                onClickButton={onOpenPolicy}
              >
                {t("register.privacyLink")}&nbsp;
              </FormElements.ButtonForm>
              {t("register.termsOfService.3")}
            </p>
            <div>
              <FormElements.ButtonForm
                classButton="formBtn w-full h-[50px]"
                classButtonHover="hover:bg-indigo-600"
                classButtonFocus="focus:outline-none"
                classButtonAnimation="duration-100 ease-in-out"
                type="submit"
              >
                {t("register.joinNow")}
              </FormElements.ButtonForm>
            </div>
          </form>
          <p className="text-sm text-center text-gray-400 mt-1">
            {t("register.existingUserPrompt")}&nbsp;
            <FormElements.ButtonForm
              divParentActive={false}
              type="button"
              classButton="font-semibold text-color-main link-button"
              classButtonFocus="focus:text-indigo-600 focus:outline-none focus:underline"
              onClickButton={handleClick}
            >
              {t("register.signInLink")}
            </FormElements.ButtonForm>
          </p>
        </div>
      </>
    </div>
  );
}
