import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../../assets/styles/components/Alerts/Alerts.css";

export default function Alert(props) {
  const [isClosed, setIsClosed] = useState(false);

  const children = props.children ? props.children : "",
    divClass = props.divClass ? props.divClass : "",
    iconClass = props.iconClass ? props.iconClass : "",
    onType = props.onType ? props.onType : "success";

    const handleCloseAlert = () => {
      setIsClosed(true);
      if (props.onClose) {
        props.onClose();
      }
    };
  switch (onType) {
    case "success":
      return (
        <AnimatePresence>
          {!isClosed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show ${divClass}`}
            >
              {props.onClose  && (
                <div className="close font__size-18" onClick={handleCloseAlert}>
                  <button
                    type="button"
                    className="link-button"
                    data-dismiss="alert"
                  >
                    <i className="bx bx-x greencross"></i>
                  </button>
                  <span className="sr-only">Close</span>
                </div>
              )}
              <i
                className={`start-icon bx bx-check-circle faa-tada animated ${iconClass}`}
              ></i>
              <span className="alert-text">{children}</span>
            </motion.div>
          )}
        </AnimatePresence>
      );
    case "error":
      return (
        <AnimatePresence>
          {!isClosed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show ${divClass}`}
              role="alert"
              data-brk-library="component__alert"
            >
              {props.onClose  && (
                <div className="close font__size-18" onClick={handleCloseAlert}>
                  <span aria-hidden="true">
                    <button className="link-button">
                      <i className="bx bx-x danger"></i>
                    </button>
                  </span>
                  <span className="sr-only">Close</span>
                </div>
              )}
              <i
                className={`start-icon bx bx-x-circle faa-pulse animated ${iconClass}`}
              ></i>
              <span className="alert-text">{children}</span>
            </motion.div>
          )}
        </AnimatePresence>
      );
    case "warning":
      return (
        <AnimatePresence>
          {!isClosed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`alert fade alert-simple alert-warning alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show ${divClass}`}
              role="alert"
              data-brk-library="component__alert"
            >
              {props.onClose  && (
                <div className="close font__size-18" onClick={handleCloseAlert}>
                  <span aria-hidden="true">
                    <button className="link-button">
                      <i className="bx bx-x warning"></i>
                    </button>
                  </span>
                  <span className="sr-only">Close</span>
                </div>
              )}
              <i
                className={`start-icon bx bx-error faa-flash animated ${iconClass}`}
              ></i>
              <span className="alert-text">{children}</span>
            </motion.div>
          )}
        </AnimatePresence>
      );
    default:
      break;
  }
}