import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { useTranslation } from 'react-i18next';

export const BackButton = () => {
  const prevBtn = '<';

  const navigate = useNavigate();
  const { t } = useTranslation();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className={styles['back-btn']} onClick={goBack}>
      {prevBtn}&nbsp; {t('back')}
    </button>
  );
};
