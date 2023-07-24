import { React, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../../../assets/styles/components/placeOrder.css";
import FormElements from "../../common/FormElements";
import languageSupport from "../../../utils/languageSupport";
import axios from "axios";
import ValidationUtils from "../../../utils/ValidationUtils";
import AuthServices from "../../../services/AuthServices";
import { ErrorAlert, SuccessAlert } from "../../common/Alerts";

export default function PlaceOrder({ openPlaceOrder, onClose }) {
  const [itemSearch, setItemSearch] = useState(false);
  const [languageUser, setLanguageUser] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );
  const [searchItemsFound, setSearchItemsFound] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const delayedHandleItemSearch = debounce(async (event) => {
    const language = languageSupport(languageUser);
    if (!language) {
      setLanguageUser("en");
    }
    const value = event.target.value;
    if (value !== "") {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/item/${value}/${languageUser}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: true,
            mode: "cors",
          }
        );
        if (response.status === 200) {
          if (Array.isArray(response.data) && response.data.length === 0) {
            setItemSearch(false);
          } else {
            setSearchItemsFound(response.data);
            setItemSearch(true);
          }
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }
  }, 500);
  const handleItemSearch = (event) => {
    delayedHandleItemSearch(event);
  };

  const handleClearInput = () => {
    setItemSearch(false);
  };
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    placeorderType: "1",
    placeorderVisibility: "1",
    placeorderItemId: "",
    placeorderPrice: "",
    placeorderQuantity: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const [itemIdValidation, setItemIdValidation] = useState(null);
  const [priceValidation, setPriceValidation] = useState(null);
  const [quantityValidation, setQuantityValidation] = useState(null);
  const validateAll = async (data) => {
    const itemIdCheck = ValidationUtils.validateNull(
      data.placeorderItemId,
      t("placeOrderModal.fieldItem")
    );
    const priceCheck = ValidationUtils.validateNull(
      data.placeorderPrice ? data.placeorderPrice : "",
      t("placeOrderModal.fieldPrice")
    );
    const quantityCheck = ValidationUtils.validateNull(
      data.placeorderQuantity ? data.placeorderQuantity : "",
      t("placeOrderModal.fieldQuantity")
    );
    let error = 0;
    if (itemIdCheck && !itemIdCheck.isValid) {
      setItemIdValidation(itemIdCheck);
      error++;
    }
    if (priceCheck && !priceCheck.isValid) {
      setPriceValidation(priceCheck);
      error++;
    }
    if (quantityCheck && !quantityCheck.isValid) {
      setQuantityValidation(quantityCheck);
      error++;
    }

    if (error > 0) {
      return false;
    }

    return true;
  };
  const handleFocus = (field) => {
    if (field === "item") {
      setItemIdValidation("");
    }
    if (field === "price") {
      setPriceValidation("");
    }
    if (field === "quantity") {
      setQuantityValidation("");
    }
  };
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validator = await validateAll(formData);
    if (validator) {
      const authToken = new AuthServices();
      const csrfData = await authToken.fetchCSRFToken();
      const token = await authToken.getAuthToken();
      if (csrfData.csrfToken) {
        const data = {
          orderType: formData.placeorderType || 1,
          visibility: formData.placeorderVisibility || 1,
          itemId: formData.placeorderItemId,
          price: formData.placeorderPrice,
          quantity: formData.placeorderQuantity,
          userId: localStorage.getItem("auth_id"),
        };
        axios.defaults.withCredentials = true;
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfData.csrfToken,
            Authorization: "Bearer " + token,
          },
          credentials: "include",
          mode: "cors",
        };

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/order/post`,
          data,
          config
        );
        if (response.data.success) {
          setResponse(response.data);
          setTimeout(() => {
            document.getElementById("placeOrderClose").click();
          }, 2000);
        } else {
          setResponse(response.data);
          return false;
        }
      }
    }
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
    document.getElementById("placeOrderItemSearch").value =
      item.name[languageUser];
    setFormData({ ...formData, placeorderItemId: item.id });
  };
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
                            {selectedItem !== undefined
                              ? selectedItem.name[languageUser] ??
                                selectedItem.name["en"]
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
                              value={
                                selectedItem !== undefined
                                  ? selectedItem.id
                                  : ""
                              }
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
                              className={`resultBlock${
                                itemSearch ? " active" : ""
                              }`}
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
                                        <span
                                          className={`resultType ${translatedType}`}
                                        >
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
                                <SuccessAlert
                                  divClass="mb-4 shadow rounded-md py-5 pl-6 pr-8 sm:pr-6 bg-dark-1000"
                                  childrenClass="text-dark-high"
                                  onClose={true}
                                  onCloseBtn={false}
                                >
                                  {t("placeOrderModal.postSuccess")}
                                </SuccessAlert>
                              )}
                              {response && response.success === false && (
                                <ErrorAlert
                                  divClass="mb-4 shadow rounded-md py-5 pl-6 pr-8 sm:pr-6 bg-dark-1000"
                                  childrenClass="text-dark-high"
                                  onClose={true}
                                  onCloseBtn={false}
                                >
                                  {response.orderExisting
                                    ? t("placeOrderModal.orderExisting")
                                    : t("error")}
                                </ErrorAlert>
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
