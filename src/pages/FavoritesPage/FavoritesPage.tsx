import { Card } from '../../components/PhoneCard';
import styles from './FavoritesPage.module.scss';
import React from 'react';

export const FavoritesPage = () => {
  return (
    <main className={styles["main"]}>
      <div className={styles["container"]}>
        <div className={styles["icons"]}>
          <a href="#home" className={`${styles['icon']} ${styles['icon--home']}`}></a>

          <a href="#" className={`${styles['icon']} ${styles['icon--arrow']}`}>
            <p className={`${styles['icon__text']} text-small`}>Favorites</p>
          </a>
        </div>

        <div className={styles["arcticle"]}>
          <h1 className={styles["article--title"]}>Favorites</h1>

          <p className={`${styles['article--count-of-models']} text-small`}>95 models</p>
        </div>

        <div className={styles["phone_cards"]}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <div className={styles["pagination"]}>Pagination</div>
      </div>
    </main>
  );
};
