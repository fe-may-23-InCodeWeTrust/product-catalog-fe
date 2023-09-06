import React from 'react';
import styles from './BackDrop.module.scss';

type Props = {
  onClick: () => void;
};

export const BackDrop: React.FC<Props> = ({ onClick }) => {
  return <div className={styles['back_drop']} onClick={onClick}></div>;
};
