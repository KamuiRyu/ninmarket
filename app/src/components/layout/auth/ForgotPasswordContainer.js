import React, { useState } from "react";
import FormElements from "../../common/FormElements";
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
                <h1 className="text-3xl font-semibold text-gray-700">
                    Forgot your password?
                </h1>
                <p className="text-sm text-center text-gray-400 mt-1">
                    Remember the password?&nbsp;
                    <FormElements.ButtonForm
                        divParentActive={false}
                        type="button"
                        classButton="font-semibold text-indigo-500 link-button"
                        classButtonFocus="focus:text-indigo-600 focus:outline-none focus:underline"
                        onClickButton={() => handleClick("login")}
                    >
                        Sign in
                    </FormElements.ButtonForm>
                    .
                </p>
            </div>
            <div className="m-6">
                <form className="mb-4">
                    <div>
                        <FormElements.InputForm
                            label="Email Address"
                            id="signinEmail"
                            type="email"
                            placeholder="Email Address"
                            classChildren="mb-6"
                            classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            classInputFocus="focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            classInputPlaceholder="placeholder:italic placeholder-gray-300"
                            classLabel="block mb-2 text-sm"
                            classColorLabel="text-gray-600 dark:text-gray-400"
                            onBlurInput={validateEmailReturn}
                            {...(emailValidation && {
                                isValid: emailValidation.isValid,
                                errorMessage: emailValidation.errorMessage,
                            })}
                        />
                    </div>
                    <div>
                        <FormElements.ButtonForm
                            type="button"
                            classButton="w-full px-3 py-4 text-white bg-indigo-500 rounded-md"
                            classButtonHover="hover:bg-indigo-600"
                            classButtonFocus="focus:outline-none"
                            classButtonAnimation="duration-100 ease-in-out"
                        >
                            Recover
                        </FormElements.ButtonForm>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPasswordContainer;
