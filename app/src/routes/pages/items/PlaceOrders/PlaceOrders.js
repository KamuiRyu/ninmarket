import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../../../assets/styles/pages/ItemDetails/PlaceOrders/PlaceOrders.css";
import FormElements from "../../../../components/common/FormElements";
import Alerts from "../../../../components/common/Alerts";
import usePlaceOrder from "./usePlaceOrder";

export default function PlaceOrder({ onClose }) {
  const {
    itemSearch,
    languageUser,
    handleItemSearch,
    handleClearInput,
    handleChange,
    itemIdValidation,
    priceValidation,
    quantityValidation,
    handleFocus,
    response,
    handleSubmit,
    handleItemClick,
    showErrorAlert,
    handleCloseErrorAlert,
    selectedItem,
    t,
    searchItemsFound
  } = usePlaceOrder();

  return (
    <AnimatePresence>
      <div
        id="placeorder-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto h-full placeorder-modal"
      >
        <div
          className="absolute inset-0 bg-black opacity-75"
          onClick={onClose}
        ></div>
        <motion.div
          key="placeorder-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-3xl max-h-full"
        >
          <div className="relative w-full max-w-3xl max-h-full ">
            <div className="relative bg-dark-900 shadow">
              <div className="flex min-h-full flex-col justify-center">
                <div className="grid grid-cols-12 gap-0">
                  <div className="col-span-4 bg-dark-1000 px-4 py-7">
                    <div className="place-order-info">
                      <div className="place-order-image mx-auto">
                        {selectedItem && (
                          <img
                            src={selectedItem.image_url}
                            alt={selectedItem.name}
                          />
                        )}
                      </div>
                      {selectedItem && (
                        <div className="place-order-name mx-auto">
                          <h1>
                            {selectedItem.name && selectedItem.name[languageUser]
                              ? selectedItem.name[languageUser]
                              : ""}
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-8 bg-dark-900">
                    <div className="col-span-full bg-dark-850 py-4 px-4 place-order-header">
                      <h2>{t("placeOrderModal.title")}</h2>
                      <button
                        type="button"
                        className="absolute top-3 right-2.5 text-dark-high bg-transparent hover:text-dark rounded-lg text-sm p-1.5 ml-auto inline-flex items-center z-10 transition-colors duration-300 ease-in-out"
                        data-modal-hide="authentication-modal"
                        id="placeOrderClose"
                        onClick={onClose}
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className="px-4 py-3 place-order-content">
                      <form
                        className="mb-4 w-full"
                        onSubmit={handleSubmit}
                        noValidate
                      >
                        <div className="grid grid-cols-12 gap-x-3">
                          <div className="col-span-6">
                            <div className="place-order-field">
                              <span className="field-text">
                                {t("placeOrderModal.fieldType")}
                              </span>
                              <div className="placeorder-type-filter-block">
                                <label className="custom-radio-button__container">
                                  <input
                                    type="radio"
                                    name="placeorderType"
                                    defaultChecked
                                    className="focus:outline-none focus:ring-0"
                                    value={1}
                                    onChange={handleChange}
                                  />
                                  <span className="custom-radio-button">
                                    {t("itemDetails.itemOrders.buyers")}
                                  </span>
                                </label>
                                <label className="custom-radio-button__container">
                                  <input
                                    type="radio"
                                    name="placeorderType"
                                    className="focus:outline-none focus:ring-0"
                                    value={2}
                                    onChange={handleChange}
                                  />
                                  <span className="custom-radio-button">
                                    {t("itemDetails.itemOrders.sellers")}
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-6">
                            <div className="place-order-field">
                              <span className="field-text">
                                {t("placeOrderModal.fieldVisible")}
                              </span>
                              <div className="placeorder-type-filter-block">
                                <label className="custom-radio-button__container">
                                  <input
                                    type="radio"
                                    name="placeorderVisibility"
                                    defaultChecked
                                    className="focus:outline-none focus:ring-0"
                                    value={1}
                                    onChange={handleChange}
                                  />
                                  <span className="custom-radio-button">
                                    <i className="bx bx-show mr-1"></i>

                                    {t("placeOrderModal.fieldVisibleOn")}
                                  </span>
                                </label>
                                <label className="custom-radio-button__container">
                                  <input
                                    type="radio"
                                    name="placeorderVisibility"
                                    className="focus:outline-none focus:ring-0"
                                    value={0}
                                    onChange={handleChange}
                                  />
                                  <span className="custom-radio-button">
                                    <i className="bx bx-hide mr-1"></i>
                                    {t("placeOrderModal.fieldVisibleOff")}
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 mt-3">
                            <FormElements.InputForm
                              id="placeorderItemId"
                              name="placeorderItemId"
                              type="hidden"
                              classTo="hidden"
                              value={selectedItem !== null ? selectedItem.id : ""}
                            ></FormElements.InputForm>
                            <FormElements.InputForm
                              label={t("placeOrderModal.fieldItem")}
                              id="placeOrderItemSearch"
                              name="placeOrderItemSearch"
                              type="text"
                              classLabel="text-dark-high-important"
                              classContainer={`${itemSearch ? "searched" : ""}`}
                              classInput="focus:outline-none focus:ring-0"
                              onChangeInput={handleItemSearch}
                              onBlurInput={handleClearInput}
                              onFocusInput={() => handleFocus("item")}
                              {...(itemIdValidation && {
                                isValid: itemIdValidation.isValid,
                                errorMessage: itemIdValidation.errorMessage,
                              })}
                            ></FormElements.InputForm>
                            <div
                              className={`resultBlock${itemSearch ? " active" : ""}`}
                            >
                              <ul className={`resultSearch`}>
                                {searchItemsFound.map((item, index) => {
                                  const translatedType =
                                    item.type[languageUser] || item.type["en"];
                                  const translatedName =
                                    item.name[languageUser] || item.name["en"];

                                  return (
                                    <li
                                      key={index}
                                      onClick={() => handleItemClick(item)}
                                    >
                                      <div className="resultImg">
                                        <img src={item.image_url} alt="item" />
                                      </div>
                                      <div className="resultInfo ml-2">
                                        <span className={`resultType ${translatedType}`}>
                                          {translatedType}
                                        </span>
                                        <span className="resultName">
                                          {translatedName}
                                        </span>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                          <div className="col-span-6 mt-3">
                            <FormElements.InputForm
                              label={t("placeOrderModal.fieldPrice")}
                              id="placeorderPrice"
                              name="placeorderPrice"
                              type="number"
                              classLabel="text-dark-high-important"
                              onChangeInput={handleChange}
                              onFocusInput={() => handleFocus("price")}
                              {...(priceValidation && {
                                isValid: priceValidation.isValid,
                                errorMessage: priceValidation.errorMessage,
                              })}
                            ></FormElements.InputForm>
                          </div>
                          <div className="col-span-6 mt-3">
                            <FormElements.InputForm
                              label={t("placeOrderModal.fieldQuantity")}
                              id="placeorderQuantity"
                              name="placeorderQuantity"
                              type="number"
                              classLabel="text-dark-high-important"
                              onChangeInput={handleChange}
                              onFocusInput={() => handleFocus("quantity")}
                              {...(quantityValidation && {
                                isValid: quantityValidation.isValid,
                                errorMessage: quantityValidation.errorMessage,
                              })}
                            ></FormElements.InputForm>
                          </div>
                          <div className="col-span-12">
                            <FormElements.SeperatorForm
                              classTo="w-full mx-auto"
                              classChildren="text-dark-medium bg-dark-900"
                              classSeparator="bg-dark-800"
                            ></FormElements.SeperatorForm>
                          </div>
                          <div className="col-span-12 mt-3">
                            <div className="mx-6">
                              {response && response.success === true && (
                                <Alerts.Alert
                                  childrenClass="text-dark-high"
                                  onType="success"
                                >
                                  {t("placeOrderModal.postSuccess")}
                                </Alerts.Alert>
                              )}
                              {response && response.success === false && showErrorAlert === true && (
                                <Alerts.Alert
                                  childrenClass="text-dark-high"
                                  onClose={handleCloseErrorAlert}
                                  onType="error"
                                >
                                  {response.orderExisting
                                    ? t("placeOrderModal.orderExisting")
                                    : t("error")}
                                </Alerts.Alert>
                              )}
                            </div>
                          </div>
                          <div className="col-span-12">
                            <FormElements.ButtonForm
                              classButton="formBtn w-2/3 h-[40px]"
                              classButtonHover="hover:bg-indigo-600"
                              classButtonFocus="focus:outline-none"
                              classButtonAnimation="duration-100 ease-in-out"
                              type="submit"
                            >
                              {t("placeOrderModal.btnPost")}
                            </FormElements.ButtonForm>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
