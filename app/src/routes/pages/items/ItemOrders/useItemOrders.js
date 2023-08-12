import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../../providers/userContext";
import { useNavigate } from "react-router-dom";

const useItemOrders = (itemData) => {
  const { user } = useContext(UserContext);
  const [orderByType, setOrderByType] = useState("wtb");
  const [orderByStatus, setOrderByStatus] = useState("all");
  const [orderByMinPrice, setOrderByMinPrice] = useState("");
  const [orderByMaxPrice, setOrderByMaxPrice] = useState("");
  const [showTBody, setShowTBody] = useState(false);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [orders, setOrders] = useState({});
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedOrders, setSortedOrders] = useState(orders);
  const [sortedCurrentType, setSortedCurrentType] = useState("wtb");
  const [clickCount, setClickCount] = useState(0);
  const [selectedTdIds, setSelectedTdIds] = useState(new Set());
  const [languageUser, setLanguageUser] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );
  const authCheck = user ? true : false;

  useEffect(() => {
    const languageFromLocalStorage = localStorage.getItem("language");
    setLanguageUser(languageFromLocalStorage);
  }, [localStorage.getItem("language")]);

  useEffect(() => {
    const fetchOrdersByType = async (itemData) => {
      try {
        if (itemData) {
          axios.defaults.withCredentials = true;
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/order/get`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              params: {
                itemId: itemData.id,
              },
              withCredentials: true,
              mode: "cors",
            }
          );

          if (response.status === 200) {
            if (response.data.message) {
              setOrders("");
              setSortedOrders("");
            } else {
              setOrders(response.data);
              setSortedOrders(response.data);
            }
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os pedidos:", error);
      }
    };
    fetchOrdersByType(itemData);
  }, [itemData]);

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

  const handleOrderStatus = (status) => {
    if (status !== orderByStatus) {
      switch (status) {
        case "ingame":
          setOrderByStatus("ingame");
          break;
        case "online":
          setOrderByStatus("online");
          break;
        default:
          setOrderByStatus("all");
          break;
      }
    }
  };

  useEffect(() => {
    setShowTBody(true);
  }, [orderByType, orderByStatus]);

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
      if (typeof orders === "object" && orders.wtb && orders.wts) {
        const dataToSort = [...orders[type]];
        dataToSort.sort((rowA, rowB) => {
          let cellA, cellB;
          switch (columnIndex) {
            case 1:
              cellA = rowA.User.name.toLowerCase();
              cellB = rowB.User.name.toLowerCase();
              break;
            case 2:
              cellA =
                rowA.User.status.toLowerCase() === "ingame"
                  ? "O" + rowA.User.status.toLowerCase()
                  : rowA.User.status.toLowerCase();
              cellB =
                rowB.User.status.toLowerCase() === "ingame"
                  ? "O" + rowB.User.status.toLowerCase()
                  : rowB.User.status.toLowerCase();
              break;
            case 3:
              cellA = rowA.User.reputation;
              cellB = rowB.User.reputation;
              break;
            case 4:
              cellA = parseFloat(rowA.price);
              cellB = parseFloat(rowB.price);
              break;
            case 5:
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

  const { t } = useTranslation();

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

  const clearSelectedTd = (id) => {
    setSelectedTdIds((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      updatedSelected.delete(id);
      return updatedSelected;
    });
  };

  const navigate = useNavigate();
  const redirectToProfile = (username) => {
    navigate(`/profile/${username}`);
  };


  return {
    orderByType,
    orderByStatus,
    orderByMinPrice,
    orderByMaxPrice,
    showTBody,
    sortedColumn,
    sortOrder,
    sortedOrders,
    sortedCurrentType,
    clickCount,
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
    redirectToProfile
  };
};

export default useItemOrders;
