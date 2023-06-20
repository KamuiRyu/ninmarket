import React from "react";

export function ButtonForm(props) {
    const divParentActive = props.divParentActive ?? true;
    if (divParentActive) {
        return (
            <div className={props.classTo}>
                <button
                    type={props.type}
                    className={` ${props.classButton} ${props.classButtonHover} ${props.classButtonFocus} ${props.classButtonAnimation}`}
                    onClick={props.onClickButton}
                >
                    {props.children}
                </button>
            </div>
        );
    } else {
        return (
            <button
                type={props.type}
                className={` ${props.classButton} ${props.classButtonHover} ${props.classButtonFocus} ${props.classButtonAnimation}`}
                onClick={props.onClickButton}
            >
                {props.children}
            </button>
        );
    }
}

export function InputForm(props) {
    return (
        <div className={`flex flex-col w-full gap-2 ${props.classTo}`}>
            <div className={`${props.classChildren}`}>
                <div className={`${props.classSubChildren}`}>
                    <label
                        htmlFor={props.id}
                        className={`${props.classLabel} ${
                            props.isValid === false
                                ? "text-red-700"
                                : props.isValid === true
                                ? "text-green-700"
                                : props.classColorLabel ?? ""
                        }`}
                    >
                        {props.label}
                    </label>
                    {props.children}
                </div>
                <input
                    type={props.type}
                    name={props.name}
                    id={props.id}
                    maxLength={props.maxLength}
                    placeholder={props.placeholder}
                    className={`${props.classInput} ${props.classInputFocus} ${
                        props.classInputHover
                    } ${props.classInputPlaceholder} ${props.classAnimation} ${
                        props.isValid === false
                            ? "border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-200 focus:border-red-500"
                            : props.isValid === true
                            ? "border-green-500 text-green-900 placeholder-green-700 focus:ring-green-200 focus:border-green-500"
                            : ""
                    }`}
                    onBlur={props.onBlurInput}
                    onChange={props.onChangeInput}
                />
                {!props.isValid ? (
                    <p
                        className={`mt-2 text-sm text-red-600 dark:text-red-500 ${props.classError}`}
                    >
                        <span>{props.errorMessage}</span>
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export function SeperatorForm(props) {
    return (
        <div className={`flex flex-row justify-center ${props.classTo}`}>
            <span className={`absolute px-4 ${props.classChildren}`}>
                {props.children}
            </span>
            <div className="w-full bg-gray-200 mt-3 h-px" />
        </div>
    );
}

const FormElements = {
    InputForm,
    ButtonForm,
    SeperatorForm,
};

export default FormElements;
