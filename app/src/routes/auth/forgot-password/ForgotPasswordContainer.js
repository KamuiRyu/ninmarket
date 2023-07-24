import React, { useState } from "react";
import FormElements from "../../../components/common/FormElements";
import ValidationUtils from "../../../utils/ValidationUtils";

function ForgotPasswordContainer({ handlePageChange }) {
  const [emailValidation, setEmailValidation] = useState(null);
  const handleClick = () => {
    handlePageChange("login");
  };

  const validateEmailReturn = (event) => {
    const validation = ValidationUtils.validateEmail(event.target.value);
    setEmailValidation(validation);
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="text-center my-6">
        <h1 className="text-3xl font-semibold text-white">
          Forgot your password?
        </h1>
      </div>
      <div className="m-6">
        <form className="mb-4">
          <div>
            <FormElements.InputForm
              label="Email address"
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
              {...(emailValidation && {
                isValid: emailValidation.isValid,
                errorMessage: emailValidation.errorMessage,
              })}
            />
          </div>
          <div>
            <FormElements.ButtonForm
              classButton="formBtn w-full h-[50px]"
              classButtonHover="hover:bg-indigo-600"
              classButtonFocus="focus:outline-none"
              classButtonAnimation="duration-100 ease-in-out"
            >
              Recover
            </FormElements.ButtonForm>
          </div>
        </form>
        <p className="text-sm text-center text-gray-400 mt-1">
          Remember the password?&nbsp;
          <FormElements.ButtonForm
            divParentActive={false}
            type="button"
            classButton="font-semibold text-color-main link-button"
            classButtonFocus="focus:text-indigo-600 focus:outline-none focus:underline"
            onClickButton={() => handleClick("login")}
          >
            Sign in
          </FormElements.ButtonForm>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordContainer;
