import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ValidationUtils from "../../../../../utils/ValidationUtils";
import AuthServices from "../../../../../services/AuthServices";
import { UserContext } from "../../../../../providers/userContext";

const useItemEdit = (selectedOrder, updateOrder) => {
  const { t } = useTranslation();
  const auth = new AuthServices();
  const { user } = useContext(UserContext);

  // States
  const [languageUser, setLanguageUser] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [formData, setFormData] = useState({
    orderVisibility: selectedOrder.order.visible,
    orderPrice: selectedOrder.order.price,
    orderQuantity: selectedOrder.order.quantity,
  });
  const [priceValidation, setPriceValidation] = useState(null);
  const [quantityValidation, setQuantityValidation] = useState(null);
  const [response, setResponse] = useState("");

  // Handlers

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const validateAll = async (data) => {
    const priceCheck = ValidationUtils.validateNull(
      data.orderPrice ? data.orderPrice : "",
      t("profile.ordersPage.orderEdit.fieldPrice")
    );
    const quantityCheck = ValidationUtils.validateNull(
      data.orderQuantity ? data.orderQuantity : "",
      t("profile.ordersPage.orderEdit.fieldQuantity")
    );
    let error = 0;
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
    if (field === "price") {
      setPriceValidation("");
    }
    if (field === "quantity") {
      setQuantityValidation("");
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validator = await validateAll(formData);
      if (validator) {
        const csrfData = await auth.fetchCSRFToken();
        const token = user.accessToken.token;
        if (csrfData.csrfToken) {
          axios.defaults.withCredentials = true;
          const responseEdit = await axios.patch(
            process.env.REACT_APP_API_URL +
              ":" +
              process.env.REACT_APP_API_PORT +
              "/api/order/update",
            {
              order_id: selectedOrder.order.id,
              user_id: user.id,
              where: "order-edit",
              order: {
                visible: formData.orderVisibility === true || formData.orderVisibility === 'true',
                quantity: formData.orderQuantity ?? "",
                price: formData.orderPrice ?? "",
              },
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "xsrf-token": csrfData.csrfToken,
                Authorization: "Bearer " + token,
              },
              credentials: "include",
              mode: "cors",
            }
          );
          if (responseEdit.data.success) {
            const { visible, quantity, price } = responseEdit.data.data;
            let updatedFields = ["visible", "quantity", "price"];
            let updatedValues = [visible, quantity, price];
            updateOrder(
              updatedFields,
              updatedValues,
              selectedOrder.type,
              selectedOrder.index
            );
            setResponse(true);
            setTimeout(() => {
              document.getElementById("placeOrderClose").click();
            }, 1000);
            return true;
          }else{
            setResponse(false);
            setShowErrorAlert(true);
            return false;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const languageFromLocalStorage = localStorage.getItem("language");
    setLanguageUser(languageFromLocalStorage);
  }, [localStorage.getItem("language")]);

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false);
  };

  return {
    languageUser,
    formData,
    priceValidation,
    quantityValidation,
    response,
    showErrorAlert,
    handleChange,
    handleFocus,
    handleSubmit,
    handleCloseErrorAlert,
    t,
  };
};

export default useItemEdit;
