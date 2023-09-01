import React from 'react';
import './Modal.scss';

type Props = {
  price: number;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ price, onClose }) => {
  return (
    <div className="modal-buy">
      <p className="modal-buy__text">
        You bought products totalling <span className="bold">${price}</span>.
      </p>

      <p className="modal-buy__text">Thanks for choosing our store.</p>

      <button className="btn-block" onClick={onClose}>
        Close
      </button>
    </div>
  );
};
