import { React } from "react";
import AuthModal from "./AuthModal";

const AuthModalWrapper = ( {isOpen, openModal, onClose} ) => {
  return (
    <>
      {isOpen && (
        <AuthModal isOpen={openModal} onClose={onClose}></AuthModal>
      )}
    </>
  );
};

export default AuthModalWrapper;
