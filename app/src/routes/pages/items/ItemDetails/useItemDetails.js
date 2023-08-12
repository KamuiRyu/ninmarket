import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const useItemDetails = (itemSlug) => {
  const [languageUser, setLanguageUser] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  const { t } = useTranslation();
  const location = useLocation();
  const getCurrentTab = () => {
    const match = location.pathname.match(/\/items\/[^/]+\/([^/]+)/);
    return match ? match[1] : "orders";
  };


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
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar o item ou os pedidos:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [itemSlug]);



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

  const getProcessedItemValues = () => {
    let name = "";
    let description = "";
    let type = "";
    let image_url = "";
    let slug = "";
    let typeClass = "";

    if (item) {
      name = getLocalizedValue(item.name, languageUser);
      description = getLocalizedValue(item.description, languageUser);
      type = getLocalizedValue(item.type, languageUser);
      image_url = item.image_url;
      slug = item.slug;
      typeClass = item.type['en'] ? item.type['en'].toLowerCase() : "";
    }

    return { name, description, type, image_url, slug , typeClass};
  };

  return {
    languageUser,
    isLoading,
    item,
    getCurrentTab,
    getLocalizedValue,
    t,
    getProcessedItemValues,
  };
};

export default useItemDetails;
