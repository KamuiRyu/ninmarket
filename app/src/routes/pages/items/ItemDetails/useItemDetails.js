import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const useItemDetails = (itemSlug) => {
  const [languageUser, setLanguageUser] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [tabsCurrent, setTabsCurrent] = useState("orders");
  const [ordersByType, setOrdersByType] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const itemResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/item/get/${itemSlug}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: true,
            mode: "cors",
          }
        );

        if (itemResponse.status === 200) {
          setItem(itemResponse.data);
          await fetchOrdersByType(itemResponse.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar o item ou os pedidos:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [itemSlug]);

  const fetchOrdersByType = async (itemData) => {
    try {
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
          setOrdersByType("");
        } else {
          setOrdersByType(response.data);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar os pedidos:", error);
    }
  };

  useEffect(() => {
    const languageFromLocalStorage = localStorage.getItem("language");
    setLanguageUser(languageFromLocalStorage);
  }, [localStorage.getItem("language")]);

  const getLocalizedValue = (localizedObject, language) => {
    if (localizedObject.hasOwnProperty(language)) {
      return localizedObject[language];
    }
    return localizedObject["en"];
  };

  const handleTabsChange = (tab) => {
    if (tabsCurrent !== tab) {
      setTabsCurrent(tab);
    }
  };

  const getProcessedItemValues = () => {
    let name = "";
    let description = "";
    let type = "";
    let image_url = "";
    let slug = "";

    if (item) {
      name = getLocalizedValue(item.name, languageUser);
      description = getLocalizedValue(item.description, languageUser);
      type = getLocalizedValue(item.type, languageUser);
      image_url = item.image_url;
      slug = item.slug;
    }

    return { name, description, type, image_url, slug };
  };

  return {
    languageUser,
    isLoading,
    item,
    tabsCurrent,
    ordersByType,
    handleTabsChange,
    getLocalizedValue,
    t,
    getProcessedItemValues,
  };
};

export default useItemDetails;
