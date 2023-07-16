import React, { useState } from "react";
import "../../assets/styles/actionBtn.css";

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
          onClick={handleButtonClick}
        >
          <div className="menu-icon-wrapper">
            <div className="menu-icon-line half first" />
            <div className="menu-icon-line" />
            <div className="menu-icon-line half last" />
          </div>
        </button>
        <ul className="more-button-list">
          {props.children}
        </ul>
      </div>
    </div>
  );
}
