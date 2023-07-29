import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ValidationUtils from "../../../../utils/ValidationUtils";
import AuthServices from "../../../../services/AuthServices";
import languageSupport from "../../../../utils/languageSupport";

const usePlaceOrder = () => {
  const { t } = useTranslation();

  // States
  const [itemSearch, setItemSearch] = useState(false);
  const [languageUser, setLanguageUser] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );
  const [searchItemsFound, setSearchItemsFound] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [formData, setFormData] = useState({
    placeorderType: "1",
    placeorderVisibility: "1",
    placeorderItemId: "",
    placeorderPrice: "",
    placeorderQuantity: "",
  });
  const [itemIdValidation, setItemIdValidation] = useState(null);
  const [priceValidation, setPriceValidation] = useState(null);
  const [quantityValidation, setQuantityValidation] = useState(null);
  const [response, setResponse] = useState("");

  // Debounce function
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

  // Handlers
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
    }else{
      setItemSearch(false);
    }
  }, 500);

  const handleItemSearch = (event) => {
    delayedHandleItemSearch(event);
  };

  const handleClearInput = () => {
    setItemSearch(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

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
          setShowErrorAlert(true);
          return false;
        }
      }
    }
  };

  const handleItemClick = (item) => {
    if (item && item.name && item.name[languageUser]) {
      setSelectedItem(item);
      document.getElementById("placeOrderItemSearch").value = item.name[languageUser];
      setFormData({ ...formData, placeorderItemId: item.id });
    }
  };

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false);
  };

  return {
    itemSearch,
    languageUser,
    searchItemsFound,
    selectedItem,
    formData,
    itemIdValidation,
    priceValidation,
    quantityValidation,
    response,
    showErrorAlert,
    handleItemSearch,
    handleClearInput,
    handleChange,
    handleFocus,
    handleSubmit,
    handleItemClick,
    handleCloseErrorAlert,
    t,
  };
};

export default usePlaceOrder;
