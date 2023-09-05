import React from 'react';
import styles from './Modal.module.scss';

type Props = {
  price: number;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ price, onClose }) => {
  return (
    <div className={styles['modal-buy']}>
      <p className={styles['modal-buy__text']}>
        You bought products totalling <span className={styles['bold']}>${price}</span>.
      </p>

      <p className={styles['modal-buy__text']}>Thanks for choosing our store.</p>

      <button className={styles['btn-block']} onClick={onClose}>
        Close
      </button>
    </div>
  );
};
