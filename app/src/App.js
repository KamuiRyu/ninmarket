import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthServices from "./services/AuthServices";
import ActionBtn from "./components/layout/ActionBtn";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";

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

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Router>
          <AppRoutes />
        </Router>
        {isLoggedIn && (
          <ActionBtn>
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
