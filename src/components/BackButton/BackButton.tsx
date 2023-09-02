import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const prevBtn = '<';

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className={styles['back-btn']} onClick={goBack}>
      {prevBtn}&nbsp; Back
    </button>
  );
};
