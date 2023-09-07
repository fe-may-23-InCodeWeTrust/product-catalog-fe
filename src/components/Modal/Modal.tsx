import React from 'react';
import './Modal.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  price: number;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ price, onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="modal-buy">
      <p className="text-uppercase modal-buy-text">
        {t('oneNice')}
      </p>

      <p className="text-uppercase modal-buy-text">
        {t('totalAmount')} {price}$.
      </p>

      <p className="text-uppercase modal-buy-text">{t('niceDay')}</p>

      <button className="btn-block" onClick={onClose}>
        {t('close')}
      </button>
    </div>
  );
};
