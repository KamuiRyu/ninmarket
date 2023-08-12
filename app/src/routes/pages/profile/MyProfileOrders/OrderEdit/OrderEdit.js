import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../../../../assets/styles/pages/Profile/MyProfileOrders/OrderEdit/OrderEdit.css";
import FormElements from "../../../../../components/common/FormElements";
import Alerts from "../../../../../components/common/Alerts";
import useOrderEdit from "./useOrderEdit";

export default function OrderEdit({ onClose, selectedOrder, updateOrder }) {
  const {
    t,
    languageUser,
    handleSubmit,
    handleChange,
    priceValidation,
    quantityValidation,
    response,
    showErrorAlert,
    handleCloseErrorAlert,
    handleFocus,
  } = useOrderEdit(selectedOrder, updateOrder);
  useEffect(() => {
    document.getElementById('orderQuantity').value = selectedOrder.order.quantity;
    document.getElementById('orderPrice').value = selectedOrder.order.price;
    
  }, [])
  
  return (
    <>
      {onClose && (
        <AnimatePresence>
          <div
            id="orderedit-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto h-full orderedit-modal"
          >
            <div
              className="absolute inset-0 bg-black opacity-75"
              onClick={onClose}
            ></div>
            <motion.div
              key="orderedit-modal"
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
                          <div
                            className={`place-order-image mx-auto ${
                              selectedOrder.order.Item && selectedOrder.order.Item.type["en"].toLowerCase()
                            }`}
                          >
                            {selectedOrder.order.Item && (
                              <img
                                src={selectedOrder.order.Item.image_url}
                                alt={selectedOrder.order.Item.name}
                              />
                            )}
                          </div>
                          {selectedOrder.order.Item && (
                            <div className="place-order-name mx-auto">
                              <h1>
                                {selectedOrder.order.Item.name &&
                                selectedOrder.order.Item.name[languageUser]
                                  ? selectedOrder.order.Item.name[languageUser]
                                  : ""}
                              </h1>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-span-8 bg-dark-900">
                        <div className="col-span-full bg-dark-850 py-4 px-4 place-order-header">
                          <h2>{t("profile.ordersPage.orderEdit.title")}</h2>
                          
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
                                    {t("profile.ordersPage.orderEdit.fieldVisible")}
                                  </span>
                                  <div className="placeorder-type-filter-block">
                                    <label className="custom-radio-button__container">
                                      <input
                                        type="radio"
                                        name="orderVisibility"
                                        defaultChecked={selectedOrder.order.visible === true}
                                        className="focus:outline-none focus:ring-0"
                                        value={true}
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
                                        name="orderVisibility"
                                        defaultChecked={selectedOrder.order.visible === false}
                                        className="focus:outline-none focus:ring-0"
                                        value={false}
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
                              <div className="col-span-12 mt-3 grid grid-cols-12 gap-x-3">
                                <div className="col-span-6">
                                  <FormElements.InputForm
                                    label={t("profile.ordersPage.orderEdit.fieldPrice")}
                                    id="orderPrice"
                                    name="orderPrice"
                                    type="number"
                                    classLabel="text-dark-high-important"
                                    onChangeInput={handleChange}
                                    onFocusInput={() => handleFocus("price")}
                                    {...(priceValidation && {
                                      isValid: priceValidation.isValid,
                                      errorMessage:
                                        priceValidation.errorMessage,
                                    })}
                                  ></FormElements.InputForm>
                                </div>
                                <div className="col-span-6">
                                  <FormElements.InputForm
                                    label={t("profile.ordersPage.orderEdit.fieldQuantity")}
                                    id="orderQuantity"
                                    name="orderQuantity"
                                    type="number"
                                    classLabel="text-dark-high-important"
                                    onChangeInput={handleChange}
                                    onFocusInput={() => handleFocus("quantity")}
                                    {...(quantityValidation && {
                                      isValid: quantityValidation.isValid,
                                      errorMessage:
                                        quantityValidation.errorMessage,
                                    })}
                                  ></FormElements.InputForm>
                                </div>
                              </div>

                              <div className="col-span-12">
                                <FormElements.SeperatorForm
                                  classTo="w-full mx-auto"
                                  classChildren="text-dark-medium bg-dark-900"
                                  classSeparator="bg-dark-800"
                                ></FormElements.SeperatorForm>
                              </div>
                              {response !== "" && (
                              <div className="col-span-12 mt-3">
                                <div className="mx-6">
                                  {response !== "" && response === true && (
                                    <Alerts.Alert
                                      childrenClass="text-dark-high"
                                      onType="success"
                                    >
                                      {t("profile.ordersPage.orderEdit.updateSuccess")}
                                    </Alerts.Alert>
                                  )}
                                  {response !== "" &&
                                    response === false &&
                                    showErrorAlert === true && (
                                      <Alerts.Alert
                                        childrenClass="text-dark-high"
                                        onClose={handleCloseErrorAlert}
                                        onType="error"
                                      >
                                        {response === false && (
                                          t("error")
                                        )}
                                      </Alerts.Alert>
                                    )}
                                </div>
                              </div>
                              )}
                              <div className="col-span-12">
                                <FormElements.ButtonForm
                                  classButton="formBtn w-2/3 h-[40px]"
                                  classButtonHover="hover:bg-indigo-600"
                                  classButtonFocus="focus:outline-none"
                                  classButtonAnimation="duration-100 ease-in-out"
                                  type="submit"
                                >
                                  {t("profile.ordersPage.orderEdit.btnUpdate")}
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
      )}
    </>
  );
}
