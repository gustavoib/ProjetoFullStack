import React from 'react';
import { useModal } from './Modal';

const Modal = ({ isOpen, onRequestClose, children }: any) => {
  const { closeModal } = useModal();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          Fechar
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
