import React from 'react';
import styles from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackHomeBtn = () => {
    navigate('/');
  };

  return (
    <div className={styles['body']}>
      <div className={styles['text']}>
        <div>Opps..</div>
        <hr></hr>
        <div>It is a space where nothing exists</div>
      </div>

      <div className={styles['back-home']}>
        <button onClick={handleBackHomeBtn} className={styles['back-home-btn']}>
          Back Home
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
