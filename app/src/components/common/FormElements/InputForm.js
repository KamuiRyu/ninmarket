import { React, useState } from "react";
import "../../../assets/styles/components/FormElements/InputForm.css";

export default function InputForm(props) {
  const {
    classTo = "",
    classLabel = "",
    classInput = "",
    classContainer = "",
    isValid = true,
    errorMessage = "",
    label = "",
    id = "",
    name = "",
    type = "text",
    placeholder = "",
    autoComplete = "",
    autoCapitalize = "",
    autoCorrect = "",
    maxLength = "",
    spellCheck = true,
    onBlurInput,
    onChangeInput,
    onFocusInput,
    clearIcon = false,
    onClickClearIcon,
    value,
    readOnly = false,
  } = props;
  const validateClassInput = isValid ? "" : "inputInvalid";
  const validateClassLabel = isValid ? "" : "labelInvalid";



  return (
    <div className={`inputBlock ${classTo}`}>
      {label && (
        <label className={`inputLabel ${classLabel} ${validateClassLabel}`}>
          {label}
          <span> - {errorMessage}</span>
        </label>
      )}
      <div className={`inputContainer ${classContainer}`}>
        <div className="inputWrapper">
          <input
            className={`inputDefault ${classInput} ${validateClassInput}`}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            aria-label={label}
            autoComplete={autoComplete}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            maxLength={maxLength}
            spellCheck={spellCheck}
            onBlur={onBlurInput}
            onChange={onChangeInput}
            onFocus={onFocusInput}
            value={value}
            readOnly={readOnly}
          />
          {clearIcon && (
            <i className='bx bx-x' onClick={onClickClearIcon}></i>
          )}
        </div>
      </div>
    </div>
  );
}
