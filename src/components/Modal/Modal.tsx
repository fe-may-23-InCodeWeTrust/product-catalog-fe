import React from 'react';
import './Modal.scss';

type Props = {
  price: number;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ price, onClose }) => {
  return (
    <div className="modal-buy">
      <p className="text-uppercase modal-buy-text">
        One nice person have got a nice gadget.
      </p>

      <p className="text-uppercase modal-buy-text">
        The total amount of your shopping is {price}$.
      </p>

      <p className="text-uppercase modal-buy-text">Have a nice day!</p>

      <button className="btn-block" onClick={onClose}>
        Close
      </button>
    </div>
  );
};
