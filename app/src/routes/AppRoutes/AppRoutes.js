import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MarketPage from "../pages/market/Market";
import BuildsPage from "../pages/builds/Explore";
import ItemDetails from "../pages/items/ItemDetails";
import Loading from "../../components/common/Loading";
import useAppRoutes from "./useAppRoutes";
import ItemOrders from "../pages/items/ItemOrders";

const AppRoutes = () => {
  const { isLoading, location } = useAppRoutes();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loading.LoadingIndicator />
      ) : (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<MarketPage />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="/items/:itemSlug" element={<ItemDetails />}>
              <Route index element={<ItemOrders />} />
            </Route>
            <Route path="/items/:itemSlug" element={<ItemDetails />} />
          </Routes>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppRoutes;
