import React from "react";
import "../../../../assets/styles/pages/Profile/MyProfileOrders/MyProfileOrdersHeader/MyProfileOrdersHeader.css";
import FormElements from "../../../../components/common/FormElements";

export default function MyProfileOrdersHeader({ t, handleOrderType, handleMaxPrice, handleMinPrice, handleItemSearch, clearInputIcon, onClickClearIcon }) {
  return (
    <div className="order-content-header">
      <div className="flex-left"></div>
      <div className="order-content-header-container">
        <div className="order-content-header-filters">
          <div className="order-filter textSearch w-full">
            <span className="order-text">
              {t("profile.ordersPage.inputSearch")}
            </span>
            <div className="order-type-filter-block2 w-full">
              <FormElements.InputForm
                id="searchOrderByName"
                name="searchOrder"
                type="text"
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                maxLength="999"
                spellCheck="false"
                classTo="w-full"
                clearIcon={clearInputIcon}
                onClickClearIcon={onClickClearIcon}
                onChangeInput={(e) => handleItemSearch(e.target.value)}
              ></FormElements.InputForm>
            </div>
          </div>
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

          <div className="order-filter priceFilter">
            <div>
              <input
                type="number"
                min="1"
                max="10000000"
                placeholder={t("itemDetails.itemOrders.maxprice")}
                size="5"
                className="focus:outline-none focus:ring-0 w-full"
                onChange={(e) => handleMaxPrice(e.target)}
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
                className="focus:outline-none focus:ring-0 w-full"
                onChange={(e) => handleMinPrice(e.target)}
              />
              <h5>{t("itemDetails.itemOrders.ryo")}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-right"></div>
    </div>
  );
}
