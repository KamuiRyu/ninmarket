import { useState } from "react";

const useActionButton = () => {
  const [isListContainerActive, setListContainerActive] = useState(false);

  const handleButtonClick = () => {
    setListContainerActive(!isListContainerActive);
  };

  return {
    isListContainerActive,
    handleButtonClick,
  };
};

export default useActionButton;