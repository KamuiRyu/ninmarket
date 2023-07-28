import { React } from "react";
import "../../../assets/styles/components/Modals/ModalConfirm.css";
import { AnimatePresence, motion } from "framer-motion";

export default function ModalConfirm(props) {
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