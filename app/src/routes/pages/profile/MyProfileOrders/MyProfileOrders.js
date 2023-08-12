import React from "react";
import MyProfileOrdersHeader from "./MyProfileOrdersHeader";
import MyProfileOrdersContent from "./MyProfileOrdersContent";
import { useOutletContext } from "react-router-dom";
import useMyProfileOrders from "./useMyProfileOrders";

export default function MyProfileOrders() {
  const userData = useOutletContext();
  const {
    t,
    languageUser,
    sortedOrders,
    handleOrderType,
    orderByType,
    handleMinPrice,
    handleMaxPrice,
    orderByMinPrice,
    orderByMaxPrice,
    sortTable,
    sortOrder,
    sortedColumn,
    getSortIcon,
    showTBody,
    selectedTdIds,
    handleOnClick,
    handleItemSearch,
    itemSearch,
    clearInputIcon,
    onClickClearIcon,
    selectItemKey,
    clearSelectedTd,
    selectItemKeyAction,
    selectedActions,
    updateVisible,
    updateDelete,
    updateSold,
    updateQuantity,
    selectedOrder,
    handleSelectOrder,
    orderEditClose,
    closeOrderEdit,
    updateOrder,
  } = useMyProfileOrders(userData);

  return (
    <div className="user-profile-orders">
      <MyProfileOrdersHeader
        t={t}
        handleOrderType={handleOrderType}
        handleMinPrice={handleMinPrice}
        handleMaxPrice={handleMaxPrice}
        handleItemSearch={handleItemSearch}
        clearInputIcon={clearInputIcon}
        onClickClearIcon={onClickClearIcon}
      ></MyProfileOrdersHeader>
      <MyProfileOrdersContent
        t={t}
        sortedOrders={sortedOrders}
        languageUser={languageUser}
        orderByType={orderByType}
        orderByMinPrice={orderByMinPrice}
        orderByMaxPrice={orderByMaxPrice}
        sortTable={sortTable}
        sortOrder={sortOrder}
        sortedColumn={sortedColumn}
        getSortIcon={getSortIcon}
        showTBody={showTBody}
        selectedTdIds={selectedTdIds}
        handleOnClick={handleOnClick}
        itemSearch={itemSearch}
        userData={userData}
        selectItemKey={selectItemKey}
        clearSelectedTd={clearSelectedTd}
        selectItemKeyAction={selectItemKeyAction}
        selectedActions={selectedActions}
        updateVisible={updateVisible}
        updateDelete={updateDelete}
        updateSold={updateSold}
        updateQuantity={updateQuantity}
        selectedOrder={selectedOrder}
        handleSelectOrder={handleSelectOrder}
        orderEditClose={orderEditClose}
        closeOrderEdit={closeOrderEdit}
        updateOrder={updateOrder}
      ></MyProfileOrdersContent>
    </div>
  );
}
