import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthServices from "./services/AuthServices";
import ActionBtn from "./components/layout/ActionBtn";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import AuthModalWrapper from "./routes/auth/AuthModalWrapper";
import Navbar from "./components/layout/header/Navbar";
import PlaceOrder from "./components/layout/actionBtn/PlaceOrder";

function App() {
  const [tokenExpired, setTokenExpired] = useState(false);
  const { t } = useTranslation();
  const isLoggedIn = localStorage.getItem("auth_login")
    ? localStorage.getItem("auth_login")
    : false;
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
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isPlaceOrderOpen, setIsPlaceOrderOpen] = useState(false);
  const openPlaceOrder = () => {
    setIsPlaceOrderOpen(true);
  };

  const closePlaceOrder = () => {
    setIsPlaceOrderOpen(false);
  };

  const userAuth = {
    name: localStorage.getItem("auth_name"),
    email: localStorage.getItem("auth_email"),
  };
  return (
    <>
      <I18nextProvider i18n={i18n}>
        {isModalOpen && (
          <AuthModalWrapper isOpen={isModalOpen} onClose={closeModal} />
        )}
        {isPlaceOrderOpen && (
          <PlaceOrder isOpen={isPlaceOrderOpen} onClose={closePlaceOrder} />
        )}
        <Router>
          <Navbar openModal={openModal} userName={userAuth.name} />
          <div className="main-content bg-dark-1000">
            <AppRoutes />
          </div>
        </Router>
        {isLoggedIn && (
          <ActionBtn onClick={openPlaceOrder}>
            <li className="more-button-list-item">
              <i className="bx bx-plus"></i>
              <span>{t("actionbtn.placeorder")}</span>
            </li>
            <li className="more-button-list-item">
              <i className="bx bx-list-plus"></i>
              <span>{t("actionbtn.createbuild")}</span>
            </li>
          </ActionBtn>
        )}
      </I18nextProvider>
    </>
  );
}

export default App;
