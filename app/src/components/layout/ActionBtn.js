import React, { useState } from "react";
import "../../assets/styles/components/actionBtn.css";

export default function ActionBtn(props) {
  const [isListContainerActive, setListContainerActive] = useState(false);

  const handleButtonClick = () => {
    setListContainerActive(!isListContainerActive);
  };
  return (
    <div className="actionBtn">
      <div
        className={`list-container ${isListContainerActive ? "active" : ""}`}
      >
        <button
          className="more-button"
          aria-label="Menu Button"
          onClick={props.onClick}
        >
          <div className="menu-icon-wrapper">
          <i className='bx bx-list-plus menu-icon-line' ></i>
          </div>
        </button>
      </div>
    </div>
  );
}
