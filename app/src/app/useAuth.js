import { useEffect, useState, useContext } from "react";
import AuthServices from "../services/AuthServices";
import { UserContext } from "../providers/userContext";

const useAuth = () => {
  const [tokenExpired, setTokenExpired] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAuth, setUserAuth] = useState({
    name: "",
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoading } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      setIsModalOpen(false);
      setIsLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    const checkAuthTokenExpiration = async () => {
      const email = localStorage.getItem("auth_email");
      const currentDate = new Date();
      const dbDate = new Date(localStorage.getItem("auth_expirationToken"));
      const timeDifference = dbDate - currentDate;
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      if (
        hoursDifference <= process.env.REACT_APP_TOKEN_RENOVATION_TIME &&
        hoursDifference > 0
      ) {
        const auth = new AuthServices();
        const tokenCheck = await auth.checkAuthTokenExpiration();
        setTokenExpired(tokenCheck);
      }
    };

    checkAuthTokenExpiration();

    const isLoggedIn = localStorage.getItem("auth_login")
      ? localStorage.getItem("auth_login")
      : false;
    const name = localStorage.getItem("auth_name") || "";
    const email = localStorage.getItem("auth_email") || "";

    setIsLoggedIn(isLoggedIn);
    setUserAuth({ name, email });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    tokenExpired,
    isLoggedIn,
    userAuth,
    isModalOpen,
    openModal,
    closeModal,
    isLoading,
  };
};

export default useAuth;
