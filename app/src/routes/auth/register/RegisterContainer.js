import { React } from "react";
import FormElements from "../../../components/common/FormElements/";
import Alerts from "../../../components/common/Alerts";
import useRegisterContainer from "./useRegisterContainer";

export default function RegisterContainer({
  handlePageChange,
  onOpenTerms,
  onOpenPolicy,
}) {
  const {
    emailValidation,
    ninjaNameValidation,
    passwordValidation,
    confirmPasswordValidation,
    response,
    countdown,
    handleSubmit,
    handleChange,
    handleClick,
    t,
    validateNinjaNameReturn,
    validateEmailReturn,
    validatePasswordReturn,
    validateConfirmPasswordReturn
  } = useRegisterContainer({ handlePageChange, onOpenTerms, onOpenPolicy });
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
            <div className="mb-4">
            <Alerts.Alert childrenClass="text-dark-high" onType="success">
              {t("register.successAlertMessage", { countdown: countdown })}
            </Alerts.Alert>
            </div>
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
