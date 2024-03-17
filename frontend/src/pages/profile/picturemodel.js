// Modal.js
import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <button onClick={onClose} className="absolute top-0 right-0 m-2">X</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
