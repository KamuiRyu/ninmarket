import { useState } from "react";

const useActionButton = () => {
  const [isPlaceOrderOpen, setIsPlaceOrderOpen] = useState(false);

  const openPlaceOrder = () => {
    setIsPlaceOrderOpen(true);
  };

  const closePlaceOrder = () => {
    setIsPlaceOrderOpen(false);
  };

  return {
    isPlaceOrderOpen,
    openPlaceOrder,
    closePlaceOrder,
  };
};

export default useActionButton;