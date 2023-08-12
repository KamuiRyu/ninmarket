import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../../../services/AuthServices";
import { UserContext } from "../../../../providers/userContext";

const useMyProfileOrders = (userData) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [languageUser, setLanguageUser] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );
  const [orderByType, setOrderByType] = useState("wtb");
  const [orderByMinPrice, setOrderByMinPrice] = useState("");
  const [orderByMaxPrice, setOrderByMaxPrice] = useState("");
  const [showTBody, setShowTBody] = useState(false);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [orders, setOrders] = useState();
  const [sortedOrders, setSortedOrders] = useState();
  const [sortedCurrentType, setSortedCurrentType] = useState("wtb");
  const [clickCount, setClickCount] = useState(0);
  const [selectedTdIds, setSelectedTdIds] = useState(new Set());
  const [selectedActions, setSelectedActions] = useState({});
  const [itemSearch, setItemSearch] = useState("");
  const [clearInputIcon, setClearInputIcon] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  const auth = new AuthServices();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [orderEditClose, setOrderEditClose] = useState(false);

  const closeOrderEdit = () => {
    document.getElementById('sidebar').classList.remove("passed");
    document.getElementById('actionBtn').classList.remove("passed");
    setOrderEditClose(false);
  };

  const handleSelectOrder = (order,type,index) => {
    document.getElementById('sidebar').classList.add("passed");
    document.getElementById('actionBtn').classList.add("passed");
    setSelectedOrder({
      order: order,
      type: type,
      index: index,
    });
    setOrderEditClose(true);
  };

  const handleOnClick = (slug) => {
    navigate(`/items/${slug}`);
  };

  const handleItemSearch = (search) => {
    setClearInputIcon(search !== "" ? true : false);
    setItemSearch(search);
  };

  const onClickClearIcon = () => {
    document.getElementById("searchOrderByName").value = "";
    setItemSearch("");
    setClearInputIcon(false);
  };

  useEffect(() => {
    const languageFromLocalStorage = localStorage.getItem("language");
    setLanguageUser(languageFromLocalStorage);
  }, [localStorage.getItem("language")]);

  const handleOrderType = (type) => {
    if (type !== orderByType) {
      switch (type) {
        case "wtb":
          setOrderByType("wtb");
          break;
        case "wts":
          setOrderByType("wts");
          break;
        default:
          setOrderByType("wtb");
          break;
      }
    }
  };
  useEffect(() => {
    setShowTBody(true);
  }, [orderByType]);

  const selectItemKey = (orderId) => {
    setSelectedTdIds((prevSelectedTdIds) => {
      const updatedSelectedTdIds = new Set(prevSelectedTdIds);
      if (updatedSelectedTdIds.has(orderId)) {
        updatedSelectedTdIds.delete(orderId);
      } else {
        updatedSelectedTdIds.add(orderId);
      }
      return updatedSelectedTdIds;
    });
  };
  const selectItemKeyAction = (orderId, action) => {
    setSelectedActions((prevSelectedActions) => {
      const updatedSelectedActions = { ...prevSelectedActions };
      if (!updatedSelectedActions[orderId]) {
        updatedSelectedActions[orderId] = { action };
      } else {
        updatedSelectedActions[orderId].actions.push(action);
      }
      return updatedSelectedActions;
    });
  };

  const clearSelectedTd = (id) => {
    setSelectedTdIds((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      updatedSelected.delete(id);
      return updatedSelected;
    });

    setSelectedActions((prevSelectedActions) => {
      const updatedSelectedActions = { ...prevSelectedActions };
      delete updatedSelectedActions[id];
      return updatedSelectedActions;
    });
  };
  const handleMinPrice = (input) => {
    if (input.value === "") {
      setOrderByMinPrice("");
    } else {
      setOrderByMinPrice(input.value);
    }
  };

  const handleMaxPrice = (input) => {
    if (input.value === "") {
      setOrderByMaxPrice("");
    } else {
      setOrderByMaxPrice(input.value);
    }
  };

  const updateQuantity = async (order, type, index, value) => {
    try {
      if ((value > 9999) | (value <= 0)) {
        return false;
      }
      const csrfData = await auth.fetchCSRFToken();
      const token = user.accessToken.token;

      if (csrfData.csrfToken) {
        axios.defaults.withCredentials = true;
        const response = await axios.patch(
          process.env.REACT_APP_API_URL +
            ":" +
            process.env.REACT_APP_API_PORT +
            "/api/order/update",
          {
            order_id: order.id,
            user_id: user.id,
            where: "order-quantity",
            order: {
              quantity: value,
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
        if (response.data.success) {
          if (response.data.data.quantity === 0) {
            removeOrder(index, type);
            return true;
          } else {
            let updatedFields = ["quantity"];
            let updatedValues = [response.data.data.quantity];
            updateOrder(updatedFields, updatedValues, type, index);
            return true;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateSold = async (order, type, index, value) => {
    try {
      if (value > order.quantity) {
        return false;
      }

      if (value <= 0) {
        return false;
      }

      const csrfData = await auth.fetchCSRFToken();
      const token = user.accessToken.token;

      if (csrfData.csrfToken) {
        axios.defaults.withCredentials = true;
        const response = await axios.patch(
          process.env.REACT_APP_API_URL +
            ":" +
            process.env.REACT_APP_API_PORT +
            "/api/order/update",
          {
            order_id: order.id,
            user_id: user.id,
            where: "order-done",
            order: {
              quantity: value,
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
        if (response.data.success) {
          if (response.data.data.quantity === 0) {
            removeOrder(index, type);
            return true;
          } else {
            let updatedFields = ["quantity"];
            let updatedValues = [response.data.data.quantity];
            updateOrder(updatedFields, updatedValues, type, index);
            return true;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateDelete = async (order, type, index, value) => {
    try {
      if (value.toLowerCase() !== "delete") {
        return false;
      }
      const csrfData = await auth.fetchCSRFToken();
      const token = user.accessToken.token;
      if (csrfData.csrfToken) {
        axios.defaults.withCredentials = true;
        const response = await axios.patch(
          process.env.REACT_APP_API_URL +
            ":" +
            process.env.REACT_APP_API_PORT +
            "/api/order/update",
          {
            order_id: order.id,
            user_id: user.id,
            where: "order-active",
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
        if (response.data.success) {
          removeOrder(index, type);
          return true;
        }
      }
    } catch (error) {}
  };

  const updateVisible = async (order, value, type, index) => {
    try {
      const csrfData = await auth.fetchCSRFToken();
      const token = user.accessToken.token;
      if (csrfData.csrfToken) {
        axios.defaults.withCredentials = true;
        const response = await axios.patch(
          process.env.REACT_APP_API_URL +
            ":" +
            process.env.REACT_APP_API_PORT +
            "/api/order/update",
          {
            order_id: order.id,
            user_id: user.id,
            where: "order-visible",
            order: {
              visible: value ?? false,
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
        if (response.data.success) {
          let updatedFields = ["visible"];
          let updatedValues = [response.data.data.visible];
          updateOrder(updatedFields, updatedValues, type, index);
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeOrder = (orderIndex, orderType) => {
    setOrders((prevOrders) => {
      const updatedOrders = { ...prevOrders };
      delete updatedOrders[orderType][orderIndex];
      return updatedOrders;
    });

    setSortedOrders((prevSortedOrders) => {
      const updatedSortedOrders = { ...prevSortedOrders };
      delete updatedSortedOrders[orderType][orderIndex];
      return updatedSortedOrders;
    });
  };
  const updateOrder = (keysOrUpdate, values, orderType, orderIndex) => {
    setOrders((prevOrders) => {
      const updatedOrders = { ...prevOrders };
      const isArrayFormat = Array.isArray(keysOrUpdate);
      const keys = isArrayFormat ? keysOrUpdate : [keysOrUpdate];
      const vals = isArrayFormat ? values : [values];
      const updatedOrder = { ...updatedOrders[orderType][orderIndex] };
      keys.forEach((key, index) => {
        updatedOrder[key] = vals[index];
      });

      updatedOrders[orderType][orderIndex] = updatedOrder;

      return updatedOrders;
    });

    setSortedOrders((prevSortedOrders) => {
      const updatedOrders = { ...prevSortedOrders };
      const isArrayFormat = Array.isArray(keysOrUpdate);
      const keys = isArrayFormat ? keysOrUpdate : [keysOrUpdate];
      const vals = isArrayFormat ? values : [values];
      const updatedOrder = { ...updatedOrders[orderType][orderIndex] };
      keys.forEach((key, index) => {
        updatedOrder[key] = vals[index];
      });
      updatedOrders[orderType][orderIndex] = updatedOrder;
      return updatedOrders;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const ordersResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/order/user/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            params: {
              name:
                userData.user && userData.user.name ? userData.user.name : "",
            },
            withCredentials: true,
            mode: "cors",
          }
        );

        if (ordersResponse.status === 200) {
          setSortedOrders(ordersResponse.data);
          setOrders(ordersResponse.data);
        }
        setIsLoading(true);
      } catch (error) {
        console.error("Erro ao buscar o item ou os pedidos:", error);
        setIsLoading(true);
      }
    };
    fetchData();
  }, [userData]);
  const sortTable = (columnIndex, type) => {
    let sOrder = "";
    let updatedClickCount = clickCount;

    if (sortedColumn !== columnIndex || sortedCurrentType !== type) {
      sOrder = "asc";
      updatedClickCount = 0;
      setSortOrder(sOrder);
      setSortedOrders({ ...orders });
      setSortedCurrentType(type);
      setSortedColumn(columnIndex);
    } else {
      switch (updatedClickCount) {
        case 0:
          sOrder = "asc";
          break;
        case 1:
          sOrder = "desc";
          break;
        default:
          break;
      }
    }
    if (updatedClickCount < 2) {
      if (typeof orders === "object" && (orders.wtb || orders.wts)) {
        if (orders[type]) {
          const dataToSort = [...orders[type]];
          dataToSort.sort((rowA, rowB) => {
            let cellA, cellB;
            switch (columnIndex) {
              case 1:
                cellA = rowA.Item.name[languageUser].toLowerCase();
                cellB = rowB.Item.name[languageUser].toLowerCase();
                break;
              case 2:
                cellA = parseFloat(rowA.price);
                cellB = parseFloat(rowB.price);
                break;
              case 3:
                cellA = parseInt(rowA.quantity);
                cellB = parseInt(rowB.quantity);
                break;
              default:
                return 0;
            }

            const compareResult =
              isNaN(cellA) || isNaN(cellB)
                ? cellA.localeCompare(cellB)
                : cellA - cellB;
            return compareResult;
          });
          let newDataToSort = {};

          if (sOrder === "asc") {
            newDataToSort = dataToSort;
          } else {
            newDataToSort = dataToSort.reverse();
          }
          setSortedOrders((prevOrders) => {
            return {
              ...prevOrders,
              [type]: newDataToSort,
            };
          });
          updatedClickCount++;
          setClickCount(updatedClickCount);
          setSortOrder(sOrder);
        }
      }
    } else {
      updatedClickCount = 0;
      sOrder = "asc";
      setClickCount(updatedClickCount);
      setSortOrder(sOrder);
      setSortedOrders({ ...orders });
    }
  };
  const getSortIcon = (columnIndex, type) => {
    if (
      sortedColumn !== columnIndex ||
      sortedCurrentType !== type ||
      clickCount === 0
    ) {
      return <i className={`bx bxs-up-arrow ml-2 opacity-0`}></i>;
    }

    const isAscending = sortOrder === "asc";
    const rotate180Class = !isAscending ? "rotate-180" : "";

    return (
      <i className={`bx bxs-up-arrow ml-2 opacity-1 ${rotate180Class}`}></i>
    );
  };
  return {
    t,
    languageUser,
    sortedOrders,
    handleOrderType,
    orderByType,
    handleMinPrice,
    handleMaxPrice,
    orderByMinPrice,
    orderByMaxPrice,
    sortTable,
    sortOrder,
    sortedColumn,
    getSortIcon,
    showTBody,
    selectItemKey,
    selectedTdIds,
    handleOnClick,
    handleItemSearch,
    itemSearch,
    clearInputIcon,
    onClickClearIcon,
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
    updateOrder
  };
};

export default useMyProfileOrders;
