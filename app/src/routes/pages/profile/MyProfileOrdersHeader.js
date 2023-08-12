import React from "react";
import "../../../../assets/styles/pages/Profile/MyProfileOrders/MyProfileOrdersHeader/MyProfileOrdersHeader.css";
import FormElements from "../../../../components/common/FormElements";

export default function MyProfileOrdersHeader({t}) {

  return (
    <div className="user-profile-orders-header-tab">
      <div className="flex-left"></div>
      <div className="user-profile-orders-header-tab-container">
        <div className="user-profile-orders-filter">
          <FormElements.InputForm
            label={t("profile.ordersPage.inputSearch")}
            id="searchOrderByName"
            name="searchOrder"
            type="text"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            maxLength="999"
            spellCheck="false"
            classTo="text-search"
          ></FormElements.InputForm>
          <div className="price-filter">
            <div>
              <input
                type="number"
                min="1"
                max="10000000"
                placeholder={t("itemDetails.itemOrders.maxprice")}
                size="5"
                className="focus:outline-none focus:ring-0"
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
