import { useState, useEffect } from "react";
import axios from "axios";
import AuthServices from "../../../services/AuthServices";
import ValidationUtils from "../../../utils/ValidationUtils";
import FormElements from "../../common/FormElements";
import { SuccessAlert } from "../../common/Alerts";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterContainer({ handlePageChange }) {
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
      setEmailValidation(
        error["emailRequired"]
          ? ValidationUtils.validateEmail(
              "",
              1,
              error["emailRequired"].errorTag
            )
          : error["emailInvalid"]
          ? ValidationUtils.validateEmail("", 1, error["emailInvalid"].errorTag)
          : error["emailExisting"]
          ? ValidationUtils.validateEmail(
              "",
              1,
              error["emailExisting"].errorTag
            )
          : null
      );

      setNinjaNameValidation(
        error["nameInvalid"]
          ? ValidationUtils.validateNinjaName("", error["nameInvalid"].errorTag)
          : error["nameExisting"]
          ? ValidationUtils.validateNinjaName(
              "",
              error["nameExisting"].errorTag
            )
          : null
      );

      setPasswordValidation(
        error["passwordInvalid"]
          ? ValidationUtils.validatePassword(
              "",
              1,
              error["passwordInvalid"].errorTag
            )
          : null
      );

      setConfirmPasswordValidation(
        error["confirmPasswordInvalid"]
          ? ValidationUtils.validateConfirmPassword(
              "",
              "",
              error["confirmPasswordInvalid"].errorTag
            )
          : null
      );
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
          <h1 className="text-3xl font-semibold text-gray-700">Sign up</h1>
          <p className="text-sm text-center text-gray-400 mt-1">
            Existing user?&nbsp;
            <FormElements.ButtonForm
              divParentActive={false}
              classButton="font-semibold text-indigo-500 link-button"
              classButtonFocus="focus:text-indigo-600 focus:outline-none focus:underline"
              onClickButton={handleClick}
            >
              Sign In
            </FormElements.ButtonForm>
          </p>
        </div>
        <div className="mx-6">
          {response && response.success === true && (
            <SuccessAlert divClass="mb-4" onClose={true} onCloseBtn={false}>
              Your account has been created successfully! You will be redirected
              on <span id="success-alert-cont">{countdown}</span>
            </SuccessAlert>
          )}
          <form className="mb-4" onSubmit={handleSubmit} noValidate>
            <div>
              <FormElements.InputForm
                label="Ninja Name"
                id="signupNinjaName"
                name="name"
                type="text"
                placeholder="Ninja name"
                classTo="w-full"
                classChildren="mb-6"
                classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                classInputFocus="focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                classInputPlaceholder="placeholder:italic placeholder-gray-300"
                classLabel="block mb-2 text-sm"
                classColorLabel="text-gray-600 dark:text-gray-400"
                onBlurInput={validateNinjaNameReturn}
                onChangeInput={handleChange}
                maxLength="20"
                {...(ninjaNameValidation && {
                  isValid: ninjaNameValidation.isValid,
                  errorMessage: ninjaNameValidation.errorMessage,
                })}
              ></FormElements.InputForm>
            </div>
            <div>
              <FormElements.InputForm
                label="Email Address"
                id="signupEmail"
                type="email"
                name="email"
                placeholder="Email address"
                classTo="w-full"
                classChildren="mb-6"
                classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                classInputFocus="focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                classInputPlaceholder="placeholder:italic placeholder-gray-300"
                classLabel="block mb-2 text-sm"
                classColorLabel="text-gray-600 dark:text-gray-400"
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
                password={true}
                label="Password"
                id="signupPassword"
                type="Password"
                name="password"
                placeholder="Password"
                classTo="w-full"
                classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                classInputFocus="focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                classInputPlaceholder="placeholder:italic placeholder-gray-300"
                classLabel="block mb-2 text-sm"
                classColorLabel="text-gray-600 dark:text-gray-400"
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
                label="Confirm password"
                id="signupConfirmPassword"
                type="Password"
                name="confirmPassword"
                placeholder="Confirm Password"
                classTo="w-full"
                classChildren="mb-6"
                classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                classInputFocus="focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                classInputPlaceholder="placeholder:italic placeholder-gray-300"
                classLabel="block mb-2 text-sm"
                classColorLabel="text-gray-600 dark:text-gray-400"
                onChangeInput={handleChange}
                onBlurInput={validateConfirmPasswordReturn}
                {...(confirmPasswordValidation && {
                  isValid: confirmPasswordValidation.isValid,
                  errorMessage: confirmPasswordValidation.errorMessage,
                })}
              ></FormElements.InputForm>
            </div>
            <div>
              <FormElements.ButtonForm
                classButton="w-full px-3 py-4 text-white bg-indigo-500 rounded-md"
                classButtonHover="hover:bg-indigo-600"
                classButtonFocus="focus:outline-none"
                classButtonAnimation="duration-100 ease-in-out"
                type="submit"
              >
                Join now
              </FormElements.ButtonForm>
            </div>
          </form>
        </div>
      </>
    </div>
  );
}
