import React from "react";
import "../../../../../assets/styles/pages/Profile/MyProfileOrders/MyProfileOrdersContent/ItemAction/ItemAction.css";
import useItemAction from "./useItemAction";

function ItemAction({ icon, text, handleActionClick }) {
  const { isHovered, handleMouseEnter, handleMouseLeave } =
    useItemAction();
  return (
    <button
      className={`text-dark-high hover:text-dark mr-2 link-button ${
        isHovered ? "hovered" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleActionClick}
    >
      <i className={`icon ${icon}`} alt={text}></i>
    </button>
  );
}

export default ItemAction;
