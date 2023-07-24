import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MarketPage from "./pages/MarketPage";
import BuildsPage from "./pages/BuildsPage";
import ItemDetails from "./pages/ItemDetails";
import LoadingIndicator from "../components/common/LoadingPage";

const AppRoutes = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimeout);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<MarketPage />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="/items/:itemSlug" element={<ItemDetails />} />
          </Routes>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppRoutes;