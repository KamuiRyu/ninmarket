import React, { useRef } from "react";
import "../../../../assets/styles/pages/Profile/MyProfileOrders/MyProfileOrdersContent/MyProfileOrdersContent.css";
import { motion, AnimatePresence } from "framer-motion";
import ItemAction from "./ItemAction";
import OrderEdit from "./OrderEdit";

export default function MyProfileOrdersContent({
  t,
  sortedOrders,
  orderByType,
  orderByMinPrice,
  orderByMaxPrice,
  sortTable,
  sortOrder,
  sortedColumn,
  getSortIcon,
  showTBody,
  languageUser,
  handleOnClick,
  itemSearch,
  userData,
  selectedTdIds,
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
}) {
  const inputWhisper = useRef(null);
  const selectUpdateOrder = async (order, type, index, where, value = "") => {
    switch (where) {
      case "order-delete":
        await updateDelete(order, type, index, value);
        break;
      case "order-done":
        const sold = await updateSold(order, type, index, value);
        if (sold) {
          clearSelectedTd(order.id);
        }
        break;
      case "order-quantity":
        const quantity = await updateQuantity(order, type, index, value);
        if (quantity) {
          clearSelectedTd(order.id);
        }
        break;
      case "order-edit":
        handleSelectOrder(order, type, index);
        break;
      default:
        break;
    }
  };
  return (
    <>
      {userData.autoProfile === true && (
        <>
          {orderEditClose && (
            <OrderEdit
              selectedOrder={selectedOrder}
              onClose={closeOrderEdit}
              updateOrder={updateOrder}
            ></OrderEdit>
          )}
        </>
      )}
      <div className="order-content-body">
        <div className="flex-left"></div>
        <div className="order-content-body-container">
          <div className="overflow-auto lg:overflow-visible ">
            <table className="table text-sm w-full">
              <thead className="bg-dark-850 text-dark-high">
                <tr>
                  <th className="px-4"></th>
                  <th className="px-3 py-5 text-left ">
                    <span
                      className="cursor-pointer"
                      onClick={() => sortTable(1, orderByType)}
                    >
                      {t("profile.ordersPage.thItemName")}
                      {getSortIcon(1, orderByType, sortOrder, sortedColumn)}
                    </span>
                  </th>
                  <th className="px-3 py-5 text-left">
                    <span
                      className="cursor-pointer"
                      onClick={() => sortTable(2, orderByType)}
                    >
                      {t("profile.ordersPage.thUnit")}
                      {getSortIcon(2, orderByType, sortOrder, sortedColumn)}
                    </span>
                  </th>
                  <th className="px-3 py-5 text-left ">
                    <span
                      className="cursor-pointer"
                      onClick={() => sortTable(3, orderByType)}
                    >
                      {t("profile.ordersPage.thQuantity")}
                      {getSortIcon(3, orderByType, sortOrder, sortedColumn)}
                    </span>
                  </th>
                  {userData.autoProfile === true && (
                    <th className="px-3 py-5 text-left"></th>
                  )}
                </tr>
              </thead>
              {showTBody && (
                <motion.tbody
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {sortedOrders &&
                  sortedOrders[orderByType.toLowerCase()] &&
                  sortedOrders[orderByType.toLowerCase()].length > 0 ? (
                    sortedOrders[orderByType.toLowerCase()].map(
                      (order, index) =>
                        (orderByMaxPrice === "" ||
                          Number(order.price) <= Number(orderByMaxPrice)) &&
                        (orderByMinPrice === "" ||
                          Number(order.price) >= Number(orderByMinPrice)) &&
                        (itemSearch === "" ||
                          order.Item.name[languageUser]
                            .toLowerCase()
                            .includes(itemSearch.toLowerCase())) ? (
                          <AnimatePresence
                            mode="wait"
                            key={`animate-${order.id}`}
                          >
                            {!selectedTdIds.has(order.id) ? (
                              <motion.tr
                                key={order.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`order-${
                                  order.visible === false
                                    ? "invisible"
                                    : "visible"
                                }`}
                              >
                                <motion.td>
                                  <div className="flex items-center justify-center">
                                    <div
                                      className={`order-type-marker ${orderByType}`}
                                    >
                                      {orderByType}
                                    </div>
                                  </div>
                                </motion.td>
                                <motion.td className="p-3">
                                  <div className="flex items-center">
                                    <div
                                      className={`item-image-block ${order.Item.type[
                                        "en"
                                      ].toLowerCase()}`}
                                    >
                                      <img
                                        src={order.Item.image_url}
                                        className="rounded-full h-11 w-11 object-cover"
                                        alt={order.Item.name[languageUser]}
                                        onClick={() =>
                                          handleOnClick(order.Item.slug)
                                        }
                                      />
                                    </div>
                                    <div className="ml-3">
                                      <div
                                        className="item-name"
                                        onClick={() =>
                                          handleOnClick(order.Item.slug)
                                        }
                                      >
                                        {order.Item.name[languageUser]}
                                      </div>
                                    </div>
                                  </div>
                                </motion.td>
                                <motion.td className="p-3">
                                  {order.price}
                                </motion.td>
                                <motion.td className="p-3">
                                  {order.quantity}
                                </motion.td>
                                <motion.td>
                                  {userData.autoProfile === true && (
                                    <div className="flex items-center justify-center item-actions">
                                      <ItemAction
                                        icon="bx bx-check"
                                        text="Sold"
                                        handleActionClick={() => {
                                          selectItemKey(order.id);
                                          selectItemKeyAction(
                                            order.id,
                                            "order-done"
                                          );
                                        }}
                                      ></ItemAction>
                                      <ItemAction
                                        icon="bx bx-edit"
                                        text="Edit"
                                        handleActionClick={() =>
                                          selectUpdateOrder(
                                            order,
                                            orderByType,
                                            index,
                                            "order-edit"
                                          )
                                        }
                                      ></ItemAction>
                                      <ItemAction
                                        icon="bx bxs-layer-plus"
                                        text="Add"
                                        handleActionClick={() => {
                                          selectItemKey(order.id);
                                          selectItemKeyAction(
                                            order.id,
                                            "order-quantity"
                                          );
                                        }}
                                      ></ItemAction>
                                      {order.visible === true ? (
                                        <ItemAction
                                          icon="bx bx-hide"
                                          text="Visible"
                                          handleActionClick={() =>
                                            updateVisible(
                                              order,
                                              false,
                                              orderByType,
                                              index
                                            )
                                          }
                                        />
                                      ) : (
                                        <ItemAction
                                          icon="bx bx-show"
                                          text="Invisble"
                                          handleActionClick={() =>
                                            updateVisible(
                                              order,
                                              true,
                                              orderByType,
                                              index
                                            )
                                          }
                                        />
                                      )}

                                      <ItemAction
                                        icon="bx bx-trash"
                                        text="Delete"
                                        handleActionClick={() => {
                                          selectItemKey(order.id);
                                          selectItemKeyAction(
                                            order.id,
                                            "order-delete"
                                          );
                                        }}
                                      ></ItemAction>
                                    </div>
                                  )}
                                </motion.td>
                              </motion.tr>
                            ) : (
                              <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="key-selected"
                              >
                                <motion.td colSpan="7">
                                  <div className="inputWhisper">
                                    <input
                                      ref={inputWhisper}
                                      type={
                                        selectedActions[order.id] &&
                                        (selectedActions[
                                          order.id
                                        ].action.includes("order-quantity") ||
                                          selectedActions[
                                            order.id
                                          ].action.includes("order-done"))
                                          ? "number"
                                          : "text"
                                      }
                                      maxLength={
                                        selectedActions[order.id] &&
                                        selectedActions[order.id].action ===
                                          "order-delete"
                                          ? "6"
                                          : selectedActions[order.id] &&
                                            selectedActions[order.id].action ===
                                              "order-quantity"
                                          ? "4"
                                          : "1000"
                                      }
                                      max={
                                        selectedActions[order.id] &&
                                        selectedActions[order.id].action ===
                                          "order-quantity"
                                          ? "9999"
                                          : "1"
                                      }
                                      placeholder={
                                        selectedActions[order.id] &&
                                        selectedActions[
                                          order.id
                                        ].action.includes("order-quantity")
                                          ? t(
                                              "profile.ordersPage.quantityPlaceholder"
                                            )
                                          : selectedActions[order.id] &&
                                            selectedActions[
                                              order.id
                                            ].action.includes("order-done")
                                          ? t(
                                              "profile.ordersPage.soldPlaceholder"
                                            )
                                          : selectedActions[order.id] &&
                                            selectedActions[
                                              order.id
                                            ].action.includes("order-delete")
                                          ? t(
                                              "profile.ordersPage.deletePlaceholder"
                                            )
                                          : null
                                      }
                                      onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                          selectUpdateOrder(
                                            order,
                                            orderByType,
                                            index,
                                            selectedActions[order.id].action,
                                            inputWhisper.current.value
                                          );
                                        }
                                      }}
                                    />
                                    <i
                                      className="bx bx-check enter"
                                      onClick={() => {
                                        selectUpdateOrder(
                                          order,
                                          orderByType,
                                          index,
                                          selectedActions[order.id].action,
                                          inputWhisper.current.value
                                        );
                                      }}
                                    ></i>
                                    <i
                                      className="bx bx-x exit"
                                      onClick={() => clearSelectedTd(order.id)}
                                    ></i>
                                  </div>
                                </motion.td>
                              </motion.tr>
                            )}
                          </AnimatePresence>
                        ) : null
                    )
                  ) : (
                    <tr className="py-3">
                      <td colSpan="7" className="text-center py-4">
                        {t("itemDetails.itemOrders.notFound")}
                      </td>
                    </tr>
                  )}
                </motion.tbody>
              )}
            </table>
          </div>
        </div>
        <div className="flex-right"></div>
      </div>
    </>
  );
}
