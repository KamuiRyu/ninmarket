import React from "react";
import "../../../assets/styles/components/ActionButton/ActionButton.css";
import useActionBtn from "./useActionButton";

export default function ActionButton(props) {
  const { isListContainerActive, handleButtonClick } = useActionBtn();

  return (
    <div className="actionBtn">
      <div className={`list-container ${isListContainerActive ? "active" : ""}`}>
        <button
          className="more-button"
          aria-label="Menu Button"
          onClick={props.onClick}
        >
          <div className="menu-icon-wrapper">
            <i className='bx bx-list-plus menu-icon-line'></i>
          </div>
        </button>
      </div>
    </div>
  );
}