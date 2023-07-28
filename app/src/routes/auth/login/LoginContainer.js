import React from "react";
import FormElements from "../../../components/common/FormElements/";
import { useLoginContainer } from "./useLoginContainer";

function LoginContainer({ handlePageChange }) {
  const {
    emailValidation,
    passwordValidation,
    handleChange,
    validateEmailReturn,
    validatePasswordReturn,
    handleSubmit,
    handleClick,
    t,
  } = useLoginContainer(handlePageChange);
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
