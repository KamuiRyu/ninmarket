import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, m } from "framer-motion";

export function SuccessAlert(props) {
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
    if (props.onClose) {
      props.onClose(props.onClose);
    }
  };
  

  const label = props.label ? props.label : "",
  children = props.children ? props.children : "",
  divClass = props.divClass ? props.divClass : "",
  labelClass = props.labelClass ? props.labelClass : "",
  childrenClass = props.childrenClass ? props.childrenClass : "";


  return (
    <AnimatePresence>
      {!isClosed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`relative flex flex-col sm:flex-row sm:items-center ${divClass}`}
        >
          <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
            <div className="text-green-500">
              <svg
                className="w-6 sm:w-5 h-6 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className={`text-sm font-medium ml-3 ${labelClass}`}>{label}</div>
          </div>
          <div className={`text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4 ${childrenClass}`}>
            {children}
          </div>
          {props.onCloseBtn && (
            <div
              onClick={handleClose}
              className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ErrorAlert(props) {
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
    if (props.onClose) {
      props.onClose(props.onClose);
    }
  };
  

  const label = props.label ? props.label : "",
  children = props.children ? props.children : "",
  divClass = props.divClass ? props.divClass : "",
  labelClass = props.labelClass ? props.labelClass : "",
  childrenClass = props.childrenClass ? props.childrenClass : "";

  return (
    <AnimatePresence>
      {!isClosed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`relative flex flex-col sm:flex-row sm:items-center ${divClass}`}
        >
          <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
            <div className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className={`text-sm font-medium ml-3 ${labelClass}`}>{label}</div>
          </div>
          <div className={`text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4 ${childrenClass}`}>
            {children}
          </div>
          {props.onCloseBtn && (
            <div
              onClick={handleClose}
              className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
