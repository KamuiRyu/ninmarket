import { React } from "react";
import "../../../assets/styles/components/FormElements/SeparatorForm.css";

export default function SeperatorForm(props) {
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