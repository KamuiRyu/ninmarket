import { React } from "react";
import "../../../assets/styles/components/FormElements/InputForm.css";

export default function InputForm(props) {
  const classTo = props.classTo ? props.classTo : "",
    classLabel = props.classLabel ? props.classLabel : "",
    classInput = props.classInput ? props.classInput : "",
    classContainer = props.classContainer ? props.classContainer : "",
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
    onBlur = props.onBlurInput ? props.onBlurInput : undefined,
    onChange = props.onChangeInput ? props.onChangeInput : undefined,
    onFocus = props.onFocusInput ? props.onFocusInput : undefined;
  return (
    <div className={`inputBlock ${classTo}`}>
      <label className={`inputLabel ${classLabel} ${classValidateLabel} `}>
        {label}
        <span> - {errorMessage}</span>
      </label>
      <div className={`inputContainer ${classContainer}`}>
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
            onFocus={onFocus}
          ></input>
        </div>
      </div>
    </div>
  );
}
