import { React } from "react";
import "../../../assets/styles/components/FormElements/CheckboxDescForm.css";

export default function CheckboxDescForm(props) {
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
  