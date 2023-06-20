import React, { useState, useEffect } from "react";
import FormElements from "../../common/FormElements";
import ValidationUtils from "../../utils/ValidationUtils";
import axios from "axios";
import { SuccessAlert } from "../../common/Alerts";

export default function RegisterContainer({ handlePageChange }) {
    useEffect(() => {
        checkTokenExpiration();
    }, []);
    const [emailValidation, setEmailValidation] = useState(null);
    const [ninjaNameValidation, setNinjaNameValidation] = useState(null);
    const [passwordValidation, setPasswordValidation] = useState(null);
    const [confirmPasswordValidation, setconfirmPasswordValidation] =
        useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [response, setResponse] = useState(null);
    const [success, setSuccess] = useState(false);
    const fetchToken = async () => {
        const url = "http://localhost:3000/api/login";
        const data = {
            email: "admin@ninmarket.com",
            password: "Senha@2023",
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Falha na solicitação");
            }

            const tokenData = await response.json();
            localStorage.setItem("token", tokenData.token);
            localStorage.setItem("tokenExpirationTime", tokenData.expiresIn);
        } catch (error) {
            console.error("Erro ao obter o token:", error.message);
        }
    };
    const checkTokenExpiration = () => {
        const storedToken = localStorage.getItem("token");
        const storedExpirationTime = localStorage.getItem(
            "tokenExpirationTime"
        );
        console.log(storedToken);
        if (storedToken && storedExpirationTime) {
            const currentTime = Date.now();
            const timeRemaining = storedExpirationTime - currentTime;
            const fiveMinutes = 5 * 60 * 1000;

            if (timeRemaining < fiveMinutes) {
                return fetchToken();
            } else {
                return storedToken;
            }
        } else {
            return fetchToken();
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await checkTokenExpiration();
            if (token !== "") {
                const response = await axios.post(
                    "http://localhost:3000/api/users",
                    formData,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                setResponse(response.data);
                console.log(response.data);
                setSuccess(true);
            }
        } catch (error) {
            console.log(error);
            validateAll(error.response.data);
            setResponse(null);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateAll = (error) => {
        if (error["nameInvalid"] || error["nameExisting"]) {
            if (error["nameInvalid"]) {
                setNinjaNameValidation(
                    ValidationUtils.validateNinjaName(
                        error["nameInvalid"].errorTag
                    )
                );
            } else {
                setNinjaNameValidation(
                    ValidationUtils.validateNinjaName(
                        error["nameExisting"].errorTag
                    )
                );
            }
        }
        if (error["emailInvalid"] || error["emailExisting"]) {
            if (error["emailInvalid"]) {
                setEmailValidation(
                    ValidationUtils.validateEmail(
                        error["emailInvalid"].errorTag
                    )
                );
            } else {
                setEmailValidation(
                    ValidationUtils.validateEmail(
                        error["emailExisting"].errorTag
                    )
                );
            }
        }
        if (error["passwordInvalid"]) {
            setPasswordValidation(
                ValidationUtils.validatePassword(
                    error["passwordInvalid"].errorTag
                )
            );
        }
    };
    const validateEmailReturn = (event) => {
        const validation = ValidationUtils.validateEmail(event.target.value);
        setEmailValidation(validation);
    };
    const validateNinjaNameReturn = (event) => {
        const validation = ValidationUtils.validateNinjaName(
            event.target.value
        );
        setNinjaNameValidation(validation);
    };

    const validatePasswordReturn = (event) => {
        const validation = ValidationUtils.validatePassword(event.target.value);
        setPasswordValidation(validation);
    };

    const validateConfirmPasswordReturn = (event) => {
        const passwordValue = document.getElementById("signupPassword").value;
        if (passwordValue !== "") {
            const validation = ValidationUtils.validatePassword(
                event.target.value,
                passwordValue
            );
            setconfirmPasswordValidation(validation);
        }
    };

    const handleClick = () => {
        handlePageChange("login");
    };
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <>
                <div className="text-center my-6">
                    <h1 className="text-3xl font-semibold text-gray-700">
                        Sign up
                    </h1>
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
                <div className="m-6">
                    {success === true && <SuccessAlert />}
                    <form className="mb-4" onSubmit={handleSubmit}>
                        <div>
                            <FormElements.InputForm
                                label="Ninja Name"
                                id="signupNinjaName"
                                name="name"
                                type="text"
                                placeholder="Ninja name"
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
                                    errorMessage:
                                        ninjaNameValidation.errorMessage,
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
                                classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                classInputFocus="focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                                classInputPlaceholder="placeholder:italic placeholder-gray-300"
                                classLabel="block mb-2 text-sm"
                                classColorLabel="text-gray-600 dark:text-gray-400"
                                onBlurInput={validatePasswordReturn}
                                onChangeInput={handleChange}
                                {...(passwordValidation && {
                                    isValid: passwordValidation.isValid,
                                    errorMessage:
                                        passwordValidation.errorMessage,
                                    classError: "mx-1",
                                })}
                            ></FormElements.InputForm>
                            {passwordValidation && (
                                <div className="mt-2 flex">
                                    <div className="w-1/4 px-1">
                                        <div
                                            className={`h-2 rounded-xl transition-colors ${
                                                passwordValidation.isLevel ===
                                                "strongest"
                                                    ? "bg-green-500"
                                                    : passwordValidation.isLevel ===
                                                      "strong"
                                                    ? "bg-yellow-500"
                                                    : passwordValidation.isLevel ===
                                                      "medium"
                                                    ? "bg-orange-500"
                                                    : passwordValidation.isLevel ===
                                                      "weak"
                                                    ? "bg-red-400"
                                                    : "bg-gray-200"
                                            }`}
                                        ></div>
                                    </div>
                                    <div className="w-1/4 px-1">
                                        <div
                                            className={`h-2 rounded-xl transition-colors ${
                                                passwordValidation.isLevel ===
                                                "strongest"
                                                    ? "bg-green-500"
                                                    : passwordValidation.isLevel ===
                                                      "strong"
                                                    ? "bg-yellow-500"
                                                    : passwordValidation.isLevel ===
                                                      "medium"
                                                    ? "bg-orange-500"
                                                    : "bg-gray-200"
                                            }`}
                                        ></div>
                                    </div>
                                    <div className="w-1/4 px-1">
                                        <div
                                            className={`h-2 rounded-xl transition-colors ${
                                                passwordValidation.isLevel ===
                                                "strongest"
                                                    ? "bg-green-500"
                                                    : passwordValidation.isLevel ===
                                                      "strong"
                                                    ? "bg-yellow-500"
                                                    : "bg-gray-200"
                                            }`}
                                        ></div>
                                    </div>
                                    <div className="w-1/4 px-1">
                                        <div
                                            className={`h-2 rounded-xl transition-colors ${
                                                passwordValidation.isLevel ===
                                                "strongest"
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
                                placeholder="Confirm Password"
                                classChildren="mb-6"
                                classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                classInputFocus="focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                                classInputPlaceholder="placeholder:italic placeholder-gray-300"
                                classLabel="block mb-2 text-sm"
                                classColorLabel="text-gray-600 dark:text-gray-400"
                                onBlurInput={validateConfirmPasswordReturn}
                                {...(confirmPasswordValidation && {
                                    isValid: confirmPasswordValidation.isValid,
                                    errorMessage:
                                        confirmPasswordValidation.errorMessage,
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
