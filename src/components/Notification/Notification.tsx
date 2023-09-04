import React from 'react';
import styles from './Notification.module.scss';

type Props = {
  text: string;
}

export const Notification: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles['notification']}>
      {text}
    </div>
  );
}
