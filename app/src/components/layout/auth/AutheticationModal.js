import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./RegisterContainer";
import ForgotPasswordContainer from "./ForgotPasswordContainer";

function AutheticationModal({ onClose }) {
  const [currentAuthPage, setCurrentAuthPage] = useState("login");
  const [onCloseLoginModal, setOnCloseLoginModal] = useState(false);

  const handlePageChange = (page) => {
    setCurrentAuthPage(page);
  };

  const handleCallback = (value) => {
    setOnCloseLoginModal(value);
  };
  return (
    <>
      {onCloseLoginModal === false && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto h-full"
        >
          <div
            className="absolute inset-0 bg-black opacity-75"
            onClick={onClose}
          ></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md max-h-full"
          >
            <div className="relative w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white z-10"
                  data-modal-hide="authentication-modal"
                  onClick={onClose}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <AnimatePresence mode="wait">
                  {currentAuthPage === "login" && (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <LoginContainer
                        handlePageChange={handlePageChange}
                        onCallback={handleCallback}
                      ></LoginContainer>
                    </motion.div>
                  )}
                  {currentAuthPage === "register" && (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <RegisterContainer
                        handlePageChange={handlePageChange}
                      ></RegisterContainer>
                    </motion.div>
                  )}
                  {currentAuthPage === "forgot-password" && (
                    <motion.div
                      key="forgot-password"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ForgotPasswordContainer
                        handlePageChange={handlePageChange}
                      ></ForgotPasswordContainer>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default AutheticationModal;
