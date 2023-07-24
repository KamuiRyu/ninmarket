import { React, useState } from "react";
import "../../assets/styles/components/modal.css";
import { AnimatePresence, motion } from "framer-motion";

function ModalConfirm(props) {
  const title = props.title ? props.title : "",
    yesText = props.yesText ? props.yesText : "",
    noText = props.noText ? props.noText : "",
    yesOnClick = props.yesOnClick ? props.yesOnClick : undefined,
    noOnClick = props.noOnClick ? props.noOnClick : undefined,
    onClose = props.onClose ? props.onClose : undefined;
  const handleModalClose = () => {
    onClose();
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      handleModalClose();
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="cd-popup"
          role="alert"
          onClick={handleOutsideClick}
        >
          <div className="cd-popup-container">
            <p>{title}</p>
            <ul className="cd-buttons">
              <li>
                <button type="button" onClick={yesOnClick}>
                  {yesText}
                </button>
              </li>
              <li>
                <button type="button" onClick={noOnClick}>
                  {noText}
                </button>
              </li>
            </ul>
            <a
              href="#0"
              className="cd-popup-close img-replace"
              onClick={handleModalClose}
            >
              Close
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function Modal(props) {
  const title = props.title ? props.title : "",
    children = props.children ? props.children : "",
    modalIcon = props.modalIcon ? props.modalIcon : "",
    buttonOn = props.buttonOn ? true : false,
    id = props.id ? props.id : "",
    onClose = props.onClose ? props.onClose : undefined,
    onClickAccept = props.onClickAccept ? props.onClickAccept : undefined,
    onClickDecline = props.onClickDecline ? props.onClickDecline : undefined;

  const handleModalClose = () => {
    onClose();
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      handleModalClose();
    }
  };

  return (
    <>
      <div className={`modal`} onClick={handleOutsideClick} id={id}>
        <article className="modal-container">
          <header className="modal-container-header">
            <h1 className="modal-container-title">
              <i className={`${modalIcon}`}></i>
              {title}
            </h1>
            <button className="icon-button" onClick={handleModalClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                />
              </svg>
            </button>
          </header>
          <section className="modal-container-body rtf">{children}</section>
          {buttonOn && (
            <footer className="modal-container-footer">
              <button className="button is-ghost" onClick={onClickDecline}>
                Decline
              </button>
              <button className="button is-primary" onClick={onClickAccept}>
                Accept
              </button>
            </footer>
          )}
        </article>
      </div>
    </>
  );
}

const Modals = {
  Modal,
  ModalConfirm,
};

export default Modals;
