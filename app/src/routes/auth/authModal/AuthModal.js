import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginContainer from "../login";
import RegisterContainer from "../register";
import ForgotPasswordContainer from "../forgot-password/ForgotPasswordContainer";
import Modals from "../../../components/common/Modals";
import { useAuthModal } from "./useAuthModal";

function AuthModal({ isOpen, onClose, props }) {
  const {
    currentAuthPage,
    handlePageChange,
    isModalTerms,
    handleModalTerms,
    handleModalTermsClose,
    isModalPolicy,
    handleModalPolicy,
    handleModalPolicyClose,
    t
  } = useAuthModal();

  return (
    <>
      <>
        {currentAuthPage === "register" && (
          <>
            <AnimatePresence>
              {isModalTerms && (
                <motion.div
                  className="modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Modals.Modal
                    title={t("termsServices.title")}
                    modalIcon="bx bx-shield-quarter"
                    onClose={handleModalTermsClose}
                    id="modal-terms"
                  >
                    <h2>{t("termsServices.section1Title")}</h2>

                    <p>{t("termsServices.section1Content1")}</p>
                    <p>{t("termsServices.section1Content2")}</p>

                    <h2>{t("termsServices.section2Title")}</h2>
                    <p>{t("termsServices.section2Content1")}</p>
                    <p>{t("termsServices.section2Content2")}</p>
                    <p>{t("termsServices.section2Content3")}</p>
                    <p>{t("termsServices.section2Content4")}</p>

                    <h2>{t("termsServices.section3Title")}</h2>
                    <p>{t("termsServices.section3Content1")}</p>
                    <p>{t("termsServices.section3Content2")}</p>
                    <p>{t("termsServices.section3Content3")}</p>

                    <h2>{t("termsServices.section4Title")}</h2>
                    <p>{t("termsServices.section4Content1")}</p>
                    <p>{t("termsServices.section4Content2")}</p>

                    <h2>{t("termsServices.section5Title")}</h2>
                    <p>{t("termsServices.section5Content1")}</p>

                    <h2>{t("termsServices.section6Title")}</h2>
                    <p>{t("termsServices.section6Content1")}</p>

                    <h2>{t("termsServices.section7Title")}</h2>
                    <p>{t("termsServices.section7Content1")}</p>

                    <h2>{t("termsServices.section8Title")}</h2>
                    <p>{t("termsServices.section8Content1")}</p>

                    <h2>{t("termsServices.section9Title")}</h2>
                    <p>{t("termsServices.section9Content1")}</p>

                    <h2>{t("termsServices.section10Title")}</h2>
                    <p>{t("termsServices.section10Content1")}</p>
                  </Modals.Modal>
                </motion.div>
              )}
              {isModalPolicy && (
                <motion.div
                  className="modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Modals.Modal
                    title={t("privacyPolicy.title")}
                    modalIcon="bx bx-file"
                    onClose={handleModalPolicyClose}
                    id="modal-policy"
                  >
                    <h2>{t("privacyPolicy.informationWeCollectTitle")}</h2>
                    <p>{t("privacyPolicy.informationWeCollectContent")}</p>

                    <h2>{t("privacyPolicy.cookiesTitle")}</h2>
                    <p>{t("privacyPolicy.cookiesContent")}</p>

                    <h2>{t("privacyPolicy.thirdPartyLinksTitle")}</h2>
                    <p>{t("privacyPolicy.thirdPartyLinksContent")}</p>

                    <h2>{t("privacyPolicy.dataSecurityTitle")}</h2>
                    <p>{t("privacyPolicy.dataSecurityContent")}</p>

                    <h2>{t("privacyPolicy.changesTitle")}</h2>
                    <p>{t("privacyPolicy.changesContent")}</p>

                    <h2>{t("privacyPolicy.contactTitle")}</h2>
                    <p>{t("privacyPolicy.contactContent")}</p>
                  </Modals.Modal>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        <AnimatePresence>
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
              key="authentication-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-xl max-h-full"
            >
              <div className="relative w-full max-w-xl max-h-full ">
                {/* Modal content */}
                <div className="relative bg-dark-900 shadow">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-dark-high hover:text-dark bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center z-10"
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
                          onOpenTerms={handleModalTerms}
                          onOpenPolicy={handleModalPolicy}
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
        </AnimatePresence>
      </>
    </>
  );
}

export default AuthModal;
