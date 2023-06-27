import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthServices from "./services/AuthServices";
import Modals from "./components/common/Modal";

function App() {
  const [tokenExpired, setTokenExpired] = useState(false);

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
      {tokenExpired && tokenExpired.auth_token === false && (
        <Modals.ModalSessionExpire />
      )}
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
