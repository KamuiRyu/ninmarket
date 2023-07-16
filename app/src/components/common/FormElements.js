import { React } from "react";
import "../../assets/styles/formElements.css";

export function ButtonForm(props) {
  const divParentActive = props.divParentActive ?? true,
    classTo = props.classTo ? props.classTo : "",
    type = props.type ? props.type : "button",
    classButton = props.classButton ? props.classButton : "",
    onClickButton = props.onClickButton ? props.onClickButton : undefined,
    children = props.children ? props.children : "";
  if (divParentActive) {
    return (
      <div className={classTo}>
        <button
          type={type}
          className={` ${classButton}`}
          onClick={onClickButton}
        >
          {children}
        </button>
      </div>
    );
  } else {
    return (
      <>
        <button type={type} className={classButton} onClick={onClickButton}>
          {children}
        </button>
      </>
    );
  }
}
export function InputForm(props) {
  const classTo = props.classTo ? props.classTo : "",
    classLabel = props.classLabel ? props.classLabel : "",
    classInput = props.classInput ? props.classInput : "",
    classValidate = props.isValid === false ? "inputInvalid" : "",
    classValidateLabel = props.isValid === false ? "labelInvalid" : "",
    errorMessage = props.errorMessage ? props.errorMessage : "",
    label = props.label ? props.label : "",
    id = props.id ? props.id : "",
    name = props.name ? props.name : "",
    type = props.type ? props.type : "text",
    placeholder = props.placeholder ? props.placeholder : "",
    autocomplete = props.autoComplete ? props.autoComplete : "",
    autocapitalize = props.autoCapitalize ? props.autoCapitalize : "",
    autocorrect = props.autoCorrect ? props.autoCorrect : "",
    maxlength = props.maxLength ? props.maxLength : "",
    spellcheck = props.spellCheck ? props.spellCheck : "",
    onBlur= props.onBlurInput ? props.onBlurInput : undefined,
    onChange= props.onChangeInput ? props.onChangeInput : undefined;
  return (
    <div className={`inputBlock ${classTo}`}>
      <label className={`inputLabel ${classLabel} ${classValidateLabel} `}>
        {label}
        <span> - {errorMessage}</span>
      </label>
      <div className="inputContainer">
        <div className="inputWrapper">
          <input
            className={`inputDefault ${classInput} ${classValidate}`}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            aria-label={label}
            autoComplete={autocomplete}
            autoCapitalize={autocapitalize}
            autoCorrect={autocorrect}
            maxLength={maxlength}
            spellCheck={spellcheck}
            onBlur={onBlur}
            onChange={onChange}
          ></input>
        </div>
      </div>
    </div>
  );
}

export function SeperatorForm(props) {
  const classTo = props.classTo ? props.classTo : "",
    classChildren = props.classChildren ? props.classChildren : "",
    children = props.children ? props.children : "",
    classSeparator = props.classSeparator ? props.classSeparator : "";
  return (
    <div className={`flex flex-row justify-center ${classTo}`}>
      <span className={`absolute px-4 ${classChildren}`}>{children}</span>
      <div className={`w-full mt-3 h-px ${classSeparator}`} />
    </div>
  );
}

export function CheckboxDescForm(props) {
  const divClass = props.divClass ? props.divClass : "",
    divChildrenClass = props.divChildrenClass ? props.divChildrenClass : "",
    id = props.id ? props.id : "",
    name = props.name ? props.name : "",
    onBlur = props.onBlurCheck ? props.onBlurCheck : "",
    checkClass = props.checkClass ? props.checkClass : "",
    labelClass = props.labelClass ? props.labelClass : "",
    labelTitle = props.labelTitle ? props.labelTitle : "",
    spanTitle = props.spanTitle ? props.spanTitle : "",
    classLabelTitle = props.classLabelTitle ? props.classLabelTitle : "",
    classSpanTitle = props.classSpanTitle ? props.classSpanTitle : "";
  return (
    <div className={`relative flex items-start ${divClass}`}>
      <div className={`flex items-center h-5 mt-1 ${divChildrenClass}`}>
        <input
          id={id}
          name={name}
          type="checkbox"
          className={`rounded focus:outline-none ring-0 focus:ring-0 ${checkClass}`}
          aria-describedby="hs-checkbox-delete-description"
          defaultChecked=""
          onBlur={onBlur}
        />
      </div>
      <label htmlFor="hs-checkbox-delete" className={`ml-3 ${labelClass}`}>
        <span className={`block text-sm ${classLabelTitle}`}>{labelTitle}</span>
        <span
          id="hs-checkbox-delete-description"
          className={`block text-sm ${classSpanTitle}`}
        >
          {spanTitle}
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
