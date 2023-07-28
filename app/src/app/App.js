import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes/";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import AuthModalWrapper from "../routes/auth/authModal/";
import Navbar from "../components/layout/Navbar";
import PlaceOrder from "../routes/pages/items/PlaceOrders/";
import useAuth from "./useAuth";
import useActionButton from "./useActionButton";
import ActionButton from "../components/layout/ActionButton";

function App() {
  const { isLoggedIn, userAuth, isModalOpen, closeModal, openModal } =
    useAuth();

  const { isPlaceOrderOpen, openPlaceOrder, closePlaceOrder } =
    useActionButton();

  return (
    <>
      <I18nextProvider i18n={i18n}>
        {isLoggedIn && (
          <>
            {isPlaceOrderOpen && (
              <PlaceOrder isOpen={isPlaceOrderOpen} onClose={closePlaceOrder} />
            )}
          </>
        )}
        {isModalOpen && (
          <AuthModalWrapper isOpen={isModalOpen} onClose={closeModal} />
        )}
        <Router>
          <Navbar openModal={openModal} userName={userAuth.name} />
          <div className="main-content bg-dark-1000">
            <AppRoutes />
          </div>
        </Router>
        {isLoggedIn && <ActionButton onClick={openPlaceOrder}></ActionButton>}
      </I18nextProvider>
    </>
  );
}

export default App;
