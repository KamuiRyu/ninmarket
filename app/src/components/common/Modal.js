import React from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50 z-40"></div>
      <div className="bg-white dark:bg-slate-800 rounded-lg p-8 z-50 w-1/3">
        <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
        {children}
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
