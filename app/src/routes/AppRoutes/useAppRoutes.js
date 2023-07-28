import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useAppRoutes = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimeout);
  }, [location.pathname]);

  return {
    isLoading,
    location,
  };
};

export default useAppRoutes;