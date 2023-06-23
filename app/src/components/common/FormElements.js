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
        <div className="relative">
          <input
            type={props.type}
            name={props.name}
            id={props.id}
            maxLength={props.maxLength}
            placeholder={props.placeholder}
            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
              props.classInput
            } ${props.classInputFocus} ${props.classInputHover} ${
              props.classInputPlaceholder
            } ${props.classAnimation} ${
              props.isValid === false
                ? "border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-200 focus:border-red-500"
                : props.isValid === true
                ? "border-green-500 text-green-900 placeholder-green-700 focus:ring-green-200 focus:border-green-500"
                : ""
            }`}
            onBlur={props.onBlurInput}
            onChange={props.onChangeInput}
          />
          {props.isValid === false && (
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
              <svg
                className="h-5 w-5 text-red-500"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
            </div>
          )}
          {props.isValid === true && (
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
              <svg
                className="h-5 w-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
              </svg>
            </div>
          )}
        </div>
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

export function CheckboxDescForm(props) {
  return (
    <div className={`relative flex items-start ${props.divClass}`}>
      <div className={`flex items-center h-5 mt-1 ${props.divChildrenClass}`}>
        <input
          id={props.id}
          name={props.name}
          type="checkbox"
          className={`border-gray-200 rounded text-blue-600 ${props.checkClass}`}
          aria-describedby="hs-checkbox-delete-description"
          defaultChecked=""
          onBlur={props.onBlurCheck}
        />
      </div>
      <label
        htmlFor="hs-checkbox-delete"
        className={`ml-3 ${props.labelClass}`}
      >
        <span className="block text-sm font-semibold text-gray-800">
          {props.labelTitle}
        </span>
        <span
          id="hs-checkbox-delete-description"
          className="block text-sm text-gray-600"
        >
          {props.spanTitle}
        </span>
      </label>
    </div>
  );
}

const FormElements = {
  InputForm,
  ButtonForm,
  SeperatorForm,
  CheckboxDescForm,
};

export default FormElements;
