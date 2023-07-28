import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserProfile from "../../../../components/common/UserProfile/";
import useItemOrders from "./useItemOrders";
import "../../../../assets/styles/pages/ItemDetails/ItemOrders/ItemOrders.css";

export default function ItemOrders ({ orders }) {
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
    authCheck
  } = useItemOrders(orders);

  return (
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
                    <th
                      className="px-3 py-5 text-left cursor-pointer"
                      onClick={() => sortTable(1, orderByType)}
                    >
                      <span>{t("itemDetails.itemOrders.thPlayer")}</span>
                      {getSortIcon(1, orderByType, sortOrder, sortedColumn)}
                    </th>
                    <th
                      className="px-3 py-5 text-left cursor-pointer"
                      onClick={() => sortTable(2, orderByType)}
                    >
                      {t("itemDetails.itemOrders.thStatus")}
                      {getSortIcon(2, orderByType, sortOrder, sortedColumn)}
                    </th>
                    <th
                      className="px-3 py-5 text-left cursor-pointer"
                      onClick={() => sortTable(3, orderByType)}
                    >
                      {t("itemDetails.itemOrders.thReputation")}
                      {getSortIcon(3, orderByType, sortOrder, sortedColumn)}
                    </th>
                    <th
                      className="px-3 py-5 text-left cursor-pointer"
                      onClick={() => sortTable(4, orderByType)}
                    >
                      {t("itemDetails.itemOrders.thUnit")}
                      {getSortIcon(4, orderByType, sortOrder, sortedColumn)}
                    </th>
                    <th
                      className="px-3 py-5 text-left cursor-pointer"
                      onClick={() => sortTable(5, orderByType)}
                    >
                      {t("itemDetails.itemOrders.thQuantity")}
                      {getSortIcon(5, orderByType, sortOrder, sortedColumn)}
                    </th>
                    <th className="px-3 py-5 text-left"></th>
                  </tr>
                </thead>
                <AnimatePresence mode="wait">
                  {showTBody && (
                    <motion.tbody
                      key="tbody"
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
                            <tr key={order.id}>
                              <td>
                                <div
                                  className={`order-type-marker ${orderByType}`}
                                >
                                  {orderByType}
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center">
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
                                    ></UserProfile>
                                  )}
                                  <div className="ml-3">
                                    <div className="">{order.User.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
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
                              </td>
                              <td className="p-3">
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
                              </td>
                              <td className="p-3">{order.price}</td>
                              <td className="p-3">{order.quantity}</td>
                              <td className="p-3 ">
                                {authCheck() === true && (
                                <a
                                  href="#"
                                  className="text-gray-400 hover:text-gray-100 mr-2"
                                >
                                  <i className="bx bxs-chat text-base"></i>
                                </a>
                                )}
                                <a
                                  href="#"
                                  className="text-gray-400 hover:text-gray-100 mx-2"
                                >
                                  <i className="bx bx-money-withdraw text-base"></i>
                                </a>
                              </td>
                            </tr>
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
                </AnimatePresence>
              </table>
            </div>
          </>
        </div>
        <div className="flex-right"></div>
      </div>
    </div>
  );
};
