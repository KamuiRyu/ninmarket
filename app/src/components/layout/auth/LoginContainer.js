import React, { useState, useEffect } from "react";
import FormElements from "../../common/FormElements";
import ValidationUtils from "../../../utils/ValidationUtils";
import AuthToken from "../../../services/AuthToken";
import axios from "axios";
import { ErrorAlert } from "../../common/Alerts";

function LoginContainer({ handlePageChange }) {
  const [emailValidation, setEmailValidation] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [error, setError] = useState(null);
  const validateEmailReturn = (event) => {
    const validation = ValidationUtils.validateEmail(event.target.value, "", 2);
    setEmailValidation(validation);
  };
  const validatePasswordReturn = (event) => {
    const validation = ValidationUtils.validatePassword(
      event.target.value,
      "",
      2
    );
    setPasswordValidation(validation);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
    const [isOpened, setIsOpened] = useState(false);
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
      const validationEmail = ValidationUtils.validateEmail(email, "", 2),
        validationPassword = ValidationUtils.validatePassword(password, "", 2);
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
        const authToken = new AuthToken();
        const tokenData = await authToken.checkTokenExpiration();
        const csrfData = await authToken.fetchCSRFToken(tokenData.token);
        if (tokenData.token && csrfData.csrfToken) {
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
                Authorization: `Bearer ${tokenData.token}`,
                "xsrf-token": csrfData.csrfToken,
              },
              credentials: "include",
              mode: "cors",
            }
          );
          if (response.data.login === false) {
            setError(response.data);
              setIsOpened(true);
              setEmailValidation(({
                isValid: false,
                errorMessage: "Email not registered or invalid"
              }));
              setPasswordValidation(({
                isValid: false,
                errorMessage: "Invalid email or password"
              }));

            return false;
          }
          const data = response.data;
          localStorage.setItem("auth_login", true);
          localStorage.setItem("user_id", data.user.id);
          localStorage.setItem("user_ninja_name", data.user.ninja_name);
          localStorage.setItem("user_email", data.user.email);
          localStorage.setItem(
            "user_remember_token",
            data.remember_token.token
          );
          localStorage.setItem(
            "user_rememberExpirationTime",
            data.remember_token.expireTime
            );
            setIsOpened(false);
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
        <h1 className="text-3xl font-semibold text-gray-700">Sign in</h1>
        <p className="text-sm text-center text-gray-400 mt-1">
          Don't have an account yet?&nbsp;
          <FormElements.ButtonForm
            divParentActive={false}
            type="button"
            classButton="font-semibold text-indigo-500 link-button"
            classButtonFocus="focus:text-indigo-600 focus:outline-none focus:underline"
            onClickButton={() => handleClick("register")}
          >
            Sign up
          </FormElements.ButtonForm>
        </p>
      </div>
      {isOpened === true && error && <ErrorAlert>{error.error}</ErrorAlert>}
      <div className="m-6">
        <form className="mb-4" onSubmit={handleSubmit}>
          <div>
            <FormElements.InputForm
              label="Email Address"
              id="signinEmail"
              name="email"
              type="email"
              placeholder="Email Address"
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
            />
          </div>
          <div>
            <FormElements.InputForm
              label="Password"
              id="signinPassword"
              name="password"
              type="password"
              placeholder="Password"
              classSubChildren="flex justify-between"
              classChildren="mb-6"
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
              })}
            >
              <FormElements.ButtonForm
                type="button"
                classButton="text-sm text-gray-400"
                classButtonFocus="focus:outline-none focus:text-indigo-500"
                classButtonHover="hover:text-indigo-500 dark:hover:text-indigo-300"
                onClickButton={() => handleClick("forgot-password")}
              >
                Forgot password?
              </FormElements.ButtonForm>
            </FormElements.InputForm>
          </div>
          <div>
            <FormElements.CheckboxDescForm
              id="signinRememberMe"
              name="rememberMe"
              labelTitle="Remember me"
              spanTitle="Not recommended on shared computers"
              divClass="mb-5"
              onBlurCheck={handleChange}
            ></FormElements.CheckboxDescForm>
          </div>
          <div>
            <FormElements.ButtonForm
              classButton="w-full px-3 py-4 text-white bg-indigo-500 rounded-md"
              classButtonHover="hover:bg-indigo-600"
              classButtonFocus="focus:outline-none"
              classButtonAnimation="duration-100 ease-in-out"
              type="submit"
            >
              Sign in
            </FormElements.ButtonForm>
          </div>
        </form>
        <FormElements.SeperatorForm
          classTo="mb-8"
          classChildren="bg-white text-gray-500"
        >
          or sign-in with
        </FormElements.SeperatorForm>
        <div className="flex flex-row gap-2">
          <FormElements.ButtonForm
            divParentActive={false}
            classButton="bg-red-500 text-white w-full p-2 flex flex-row justify-center gap-2 items-center rounded-sm"
            classButtonHover="hover:bg-green-600"
            classButtonAnimation="duration-100 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="w-5"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
                  fill="currentColor"
                />
              </g>
            </svg>
            Google
          </FormElements.ButtonForm>
          <FormElements.ButtonForm
            divParentActive={false}
            classButton="bg-indigo-500 text-white w-full p-2 flex flex-row justify-center gap-2 items-center rounded-sm "
            classButtonHover="hover:bg-gray-800"
            classButtonAnimation="duration-100 ease-in-out"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-discord"
              viewBox="0 0 16 16"
            >
              <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
            </svg>
            Discord
          </FormElements.ButtonForm>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
