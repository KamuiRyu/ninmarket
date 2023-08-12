import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserProfile from "../../../../components/common/UserProfile/";
import useItemOrders from "./useItemOrders";
import "../../../../assets/styles/pages/ItemDetails/ItemOrders/ItemOrders.css";
import { useOutletContext } from "react-router-dom";

export default function ItemOrders() {
  const itemData = useOutletContext();
  const {
    orderByType,
    orderByStatus,
    orderByMinPrice,
    orderByMaxPrice,
    showTBody,
    sortedColumn,
    sortOrder,
    sortedOrders,
    handleOrderType,
    handleMinPrice,
    handleMaxPrice,
    handleOrderStatus,
    sortTable,
    getSortIcon,
    t,
    authCheck,
    selectedTdIds,
    selectItemKey,
    clearSelectedTd,
    languageUser,
    redirectToProfile,
  } = useItemOrders(itemData);

  return (
    <motion.div
      key="orders"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="order-content">
        <div className="order-content-header">
          <div className="flex-left"></div>
          <div className="order-content-header-container">
            <div className="order-content-header-filters">
              <div className="order-filter orderTypeFilter">
                <span className="order-text">
                  {t("itemDetails.itemOrders.orderType")}
                </span>
                <div className="order-type-filter-block">
                  <label className="custom-radio-button__container">
                    <input
                      type="radio"
                      name="orderType"
                      defaultChecked
                      className="focus:outline-none focus:ring-0"
                      onClick={() => handleOrderType("wtb")}
                    />
                    <span className="custom-radio-button buyers">
                      {t("itemDetails.itemOrders.buyers")}
                    </span>
                  </label>
                  <label className="custom-radio-button__container">
                    <input
                      type="radio"
                      name="orderType"
                      className="focus:outline-none focus:ring-0"
                      onClick={() => handleOrderType("wts")}
                    />
                    <span className="custom-radio-button sellers">
                      {t("itemDetails.itemOrders.sellers")}
                    </span>
                  </label>
                </div>
              </div>
              <div className="order-filter statusFilter">
                <span className="order-text">
                  {t("itemDetails.itemOrders.onlineStatus")}
                </span>
                <div className="order-type-filter-block2">
                  <label className="custom-radio-button__container">
                    <input
                      type="radio"
                      name="onlineStatus"
                      defaultChecked
                      className="focus:outline-none focus:ring-0"
                      onClick={() => handleOrderStatus("all")}
                    />
                    <span className="custom-radio-button allstatus">
                      {t("itemDetails.itemOrders.allStatus")}
                    </span>
                  </label>
                  <label className="custom-radio-button__container">
                    <input
                      type="radio"
                      name="onlineStatus"
                      className="focus:outline-none focus:ring-0"
                      onClick={() => handleOrderStatus("ingame")}
                    />
                    <span className="custom-radio-button ingame">
                      {t("itemDetails.itemOrders.ingame")}
                    </span>
                  </label>
                  <label className="custom-radio-button__container">
                    <input
                      type="radio"
                      name="onlineStatus"
                      className="focus:outline-none focus:ring-0"
                      onClick={() => handleOrderStatus("online")}
                    />
                    <span className="custom-radio-button online">
                      {t("itemDetails.itemOrders.online")}
                    </span>
                  </label>
                </div>
              </div>
              <div className="order-filter priceFilter">
                <div>
                  <input
                    type="number"
                    min="1"
                    max="10000000"
                    placeholder={t("itemDetails.itemOrders.maxprice")}
                    size="5"
                    className="focus:outline-none focus:ring-0"
                    onBlur={(e) => handleMaxPrice(e.target)}
                  />
                  <h5>{t("itemDetails.itemOrders.ryo")}</h5>
                </div>
                <div>
                  <input
                    type="number"
                    min="1"
                    max="10000000"
                    placeholder={t("itemDetails.itemOrders.minprice")}
                    size="5"
                    className="focus:outline-none focus:ring-0"
                    onBlur={(e) => handleMinPrice(e.target)}
                  />
                  <h5>{t("itemDetails.itemOrders.ryo")}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-right"></div>
        </div>
        <div className="order-content-body">
          <div className="flex-left"></div>
          <div className="order-content-body-container">
            <>
              <div className="overflow-auto lg:overflow-visible ">
                <table className="table text-sm w-full">
                  <thead className="bg-dark-850 text-dark-high">
                    <tr>
                      <th className="px-4"></th>
                      <th className="px-3 py-5 text-left">
                        <span
                          onClick={() => sortTable(1, orderByType)}
                          className="cursor-pointer"
                        >
                          {t("itemDetails.itemOrders.thPlayer")}
                          {getSortIcon(1, orderByType, sortOrder, sortedColumn)}
                        </span>
                      </th>
                      <th className="px-3 py-5 text-left">
                        <span
                          onClick={() => sortTable(2, orderByType)}
                          className="cursor-pointer"
                        >
                          {t("itemDetails.itemOrders.thStatus")}
                          {getSortIcon(2, orderByType, sortOrder, sortedColumn)}
                        </span>
                      </th>
                      <th className="px-3 py-5 text-left">
                        <span
                          onClick={() => sortTable(3, orderByType)}
                          className="cursor-pointer"
                        >
                          {t("itemDetails.itemOrders.thReputation")}
                          {getSortIcon(3, orderByType, sortOrder, sortedColumn)}
                        </span>
                      </th>
                      <th className="px-3 py-5 text-left">
                        <span
                          onClick={() => sortTable(4, orderByType)}
                          className="cursor-pointer"
                        >
                          {t("itemDetails.itemOrders.thUnit")}
                          {getSortIcon(4, orderByType, sortOrder, sortedColumn)}
                        </span>
                      </th>
                      <th className="px-3 py-5 text-left">
                        <span
                          className="cursor-pointer"
                          onClick={() => sortTable(5, orderByType)}
                        >
                          {t("itemDetails.itemOrders.thQuantity")}
                          {getSortIcon(5, orderByType, sortOrder, sortedColumn)}
                        </span>
                      </th>
                      <th className="px-3 py-5 text-left"></th>
                    </tr>
                  </thead>
                  {showTBody && (
                    <motion.tbody
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {sortedOrders[orderByType.toLowerCase()] &&
                      sortedOrders[orderByType.toLowerCase()].length > 0 ? (
                        sortedOrders[orderByType.toLowerCase()].map((order) =>
                          (order.User.status === orderByStatus ||
                            orderByStatus === "all") &&
                          (orderByMaxPrice === "" ||
                            Number(order.price) <= Number(orderByMaxPrice)) &&
                          (orderByMinPrice === "" ||
                            Number(order.price) >= Number(orderByMinPrice)) ? (
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
                                >
                                  <motion.td>
                                    <div
                                      className={`order-type-marker ${orderByType}`}
                                    >
                                      {orderByType}
                                    </div>
                                  </motion.td>
                                  <motion.td className="p-3">
                                    <div className="flex items-center">
                                      <div
                                        onClick={() =>
                                          redirectToProfile(order.User.name)
                                        }
                                        className="cursor-pointer"
                                      >
                                        {order.User.photo_url !== null ? (
                                          <UserProfile
                                            photo={order.User.photo_url}
                                            imgAlt={`Photo ${order.User.name}`}
                                            imgClass="rounded-full h-12 w-12 object-cover"
                                          />
                                        ) : (
                                          <UserProfile
                                            name={order.User.name}
                                            imgClass="rounded-full h-12 w-12 object-cover bg-color-main"
                                            spanClass="flex items-center justify-center w-full h-full text-xl text-black font-bold"
                                          />
                                        )}
                                      </div>
                                      <div
                                        className="ml-3"
                                        onClick={() =>
                                          redirectToProfile(order.User.name)
                                        }
                                      >
                                        <div className="user-name cursor-pointer">{order.User.name}</div>
                                      </div>
                                    </div>
                                  </motion.td>
                                  <motion.td className="p-3">
                                    <span
                                      className={`rounded-md px-3 status-${order.User.status}`}
                                    >
                                      {order.User.status === "online"
                                        ? t("itemDetails.itemOrders.online")
                                        : order.User.status === "ingame"
                                        ? t("itemDetails.itemOrders.ingame")
                                        : order.User.status === "invisible"
                                        ? t("itemDetails.itemOrders.invisible")
                                        : ""}
                                    </span>
                                  </motion.td>
                                  <motion.td className="p-3">
                                    <span
                                      className={`align-middle ${
                                        order.User.reputation < 0
                                          ? "badRep"
                                          : order.User.reputation >= 0 &&
                                            order.User.reputation < 20
                                          ? "goodRep"
                                          : "niceRep"
                                      }`}
                                    >
                                      {order.User.reputation}
                                    </span>
                                    {order.User.reputation < 0 && (
                                      <i className="bx bx-meh-alt align-middle ml-2 badRep"></i>
                                    )}
                                    {order.User.reputation >= 0 &&
                                      order.User.reputation < 20 && (
                                        <i className="bx bx-smile align-middle ml-2 goodRep"></i>
                                      )}
                                    {order.User.reputation >= 20 && (
                                      <i className="bx bx-cool align-middle ml-2 niceRep"></i>
                                    )}
                                  </motion.td>
                                  <motion.td className="p-3">
                                    {order.price}
                                  </motion.td>
                                  <motion.td className="p-3">
                                    {order.quantity}
                                  </motion.td>
                                  <motion.td>
                                    {authCheck && (
                                      <button
                                        className="text-dark-high hover:text-dark mr-2 link-button"
                                      >
                                        <i className="bx bxs-chat text-base"></i>
                                      </button>
                                    )}
                                    <button
                                      className="text-dark-high hover:text-dark ml-2"
                                      onClick={() => selectItemKey(order.id)}
                                    >
                                      <i className="bx bx-money-withdraw text-base"></i>
                                    </button>
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
                                  <td colSpan="7">
                                    <div className="inputWhisper">
                                      <input
                                        readOnly
                                        value={`/w ${t(
                                          "itemDetails.itemOrders.hi"
                                        )} ${order.User.name}. ${
                                          orderByType === "wtb"
                                            ? t(
                                                "itemDetails.itemOrders.wtbMessage"
                                              )
                                            : t(
                                                "itemDetails.itemOrders.wtsMessage"
                                              )
                                        } "${itemData.name[languageUser]}" ${t(
                                          "itemDetails.itemOrders.for"
                                        )} ${order.price}. (Nin Market)`}
                                        className="focus:outline-none hover:bg-transparent"
                                      />
                                      <i
                                        className="bx bx-x"
                                        onClick={() =>
                                          clearSelectedTd(order.id)
                                        }
                                      ></i>
                                    </div>
                                  </td>
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
            </>
          </div>
          <div className="flex-right"></div>
        </div>
      </div>
    </motion.div>
  );
}
