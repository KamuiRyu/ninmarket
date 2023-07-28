import { React } from "react";
import "../../../assets/styles/components/FormElements/ButtonForm.css";

export default function ButtonForm(props) {
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