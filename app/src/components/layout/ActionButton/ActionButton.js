import React from "react";
import "../../../assets/styles/components/ActionButton/ActionButton.css";


export default function ActionButton(props) {

  return (
    <div className="actionBtn" id="actionBtn">
      <div className={`list-container`}>
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