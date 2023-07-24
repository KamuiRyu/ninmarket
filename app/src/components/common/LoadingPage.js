import React from "react";
import { motion } from "framer-motion";

const LoadingIndicator = ({ isLoading }) => {
  return (
    <motion.div
      className="loading-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
    >
      Loading...
    </motion.div>
  );
};

export default LoadingIndicator;