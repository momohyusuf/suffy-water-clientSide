import React from 'react';
import { useSelector } from 'react-redux';

import ModalContent from './ModalContent';

const Modal = () => {
  const { modal } = useSelector((state) => state.order);
  return (
    <div className="modal--overlay">
      <div className="modal">
        <ModalContent orderInfo={modal} />
      </div>
    </div>
  );
};

export default Modal;
