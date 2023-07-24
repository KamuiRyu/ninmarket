import { React, useState, useEffect } from "react";
import FormElements from "../../components/common/FormElements";
import "../../assets/styles/pages/market.css";
import { useTranslation } from "react-i18next";
import "../../assets/styles/pages/itemDetails.css";
import BG from "../../assets/images/BG.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ItemOrders from "./items/ItemOrders";
import { motion, AnimatePresence } from "framer-motion";

function ItemDetails() {
  const { t } = useTranslation();
  const { itemSlug } = useParams();
  const [languageUser, setLanguageUser] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [tabsCurrent, setTabsCurrent] = useState("orders");
  const [ordersByType, setOrdersByType] = useState({});

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
  }, []);

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

  const handleTabsChange = (tab) => {
    if (tabsCurrent !== tab) {
      setTabsCurrent(tab);
    }
  };
  return (
    <>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <section className="item-details-header">
            <div className="item-details-parallax">
              <div className="item-parallax-bg">
                <img src={BG} alt="background" />
              </div>
            </div>
          </section>
          <main className="item-content">
            <header className="item-content-header">
              <div className="flex-left"></div>
              <div className="item-content-header-container">
                <section className="item-content-img">
                  <Link to={`/items/${slug}`} className="item-image">
                    <img src={image_url} alt="item" />
                  </Link>
                </section>
                <section className="item-content-info">
                  <div className="item-name">
                    <h1>{name}</h1>
                  </div>
                  <div className="item-description">
                    <span>{description}</span>
                  </div>
                </section>
                <section className="item-content-info2">
                  <div className="item-info-block ">
                    <h4 className={`item-info-type ${type}`}>{type}</h4>
                  </div>
                </section>
              </div>
              <div className="flex-right"></div>
            </header>
            <div className="item-content-tabs">
              <div className="flex-left"></div>
              <div className="item-content-tabs-container">
                <div className="item-content-tabs-row">
                  <ul className="item-tabs">
                    <li>
                      <button
                        className={
                          tabsCurrent === "orders"
                            ? "link-button active"
                            : "link-button"
                        }
                        onClick={() => handleTabsChange("orders")}
                      >
                        <i className="bx bx-transfer-alt"></i>
                        {t("itemDetails.tabOrders")}
                      </button>
                    </li>
                    <li>
                      <button
                        className={
                          tabsCurrent === "statistics"
                            ? "link-button active"
                            : "link-button"
                        }
                        onClick={() => handleTabsChange("statistics")}
                      >
                        <i className="bx bx-line-chart"></i>
                        {t("itemDetails.tabStatistics")}
                      </button>
                    </li>
                    <li>
                      <button
                        className={
                          tabsCurrent === "drop"
                            ? "link-button active"
                            : "link-button"
                        }
                        onClick={() => handleTabsChange("drop")}
                      >
                        <i className="bx bx-diamond"></i>
                        {t("itemDetails.tabDrop")}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-right"></div>
            </div>
            <AnimatePresence mode="wait">
              {tabsCurrent === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ItemOrders orders={ordersByType} />
                </motion.div>
              )}

              {tabsCurrent === "statistics" && (
                <motion.div
                  key="statistics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>Statistics</p>
                </motion.div>
              )}

              {tabsCurrent === "drop" && (
                <motion.div
                  key="drop"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>Drop</p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </>
      )}
    </>
  );
}

export default ItemDetails;
