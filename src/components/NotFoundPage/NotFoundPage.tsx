import React from 'react';
import styles from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackHomeBtn = () => {
    navigate('/');
  };

  return (
    <div className={styles['body']}>
      <div className={styles['text']}>
        <div>{t('opps')}</div>
        <hr></hr>
        <div>{t('nothingExists')}</div>
      </div>

      <div className={styles['back-home']}>
        <button onClick={handleBackHomeBtn} className={styles['back-home-btn']}>
          {t('backHome')}
        </button>
      </div>

      <div className={styles['astronaut']}>
        <img
          src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
          alt=""
          className={styles['src']}
        ></img>
      </div>
    </div>
  );
};
