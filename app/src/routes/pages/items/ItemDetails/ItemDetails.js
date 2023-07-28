import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../../../../assets/styles/pages/ItemDetails/ItemDetails/itemDetails.css";
import BG from "../../../../assets/images/BG.png";
import useItemDetails from "./useItemDetails";
import ItemOrders from "../ItemOrders"

export default function ItemDetails() {
  const { itemSlug } = useParams();
  const {
    isLoading,
    tabsCurrent,
    ordersByType,
    handleTabsChange,
    getProcessedItemValues,
    t,
  } = useItemDetails(itemSlug);

  const { name, description, type, image_url, slug } = getProcessedItemValues();

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
