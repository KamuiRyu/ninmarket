import React from "react";
import { motion } from "framer-motion";

export default function ItemStatistics() {
  return (
    <motion.div
      key="statistics"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>ItemStatistics</div>
    </motion.div>
  );
}
