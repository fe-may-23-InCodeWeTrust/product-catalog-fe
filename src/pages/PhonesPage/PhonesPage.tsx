import React from 'react';
import styles from './PhonesPage.module.scss';
import '../../styles/_typography.scss';
import { Card } from '../../components/PhoneCard';

export const PhonesPage = () => {
  return (
    <>
      <header>Header</header>

      <main className={styles["main"]}>
        <div className={styles["container"]}>
          <div className={styles["icons"]}>
            <a href="#home" className={`${styles['icon']} ${styles['icon--home']}`}></a>

            <a href="#" className={`${styles['icon']} ${styles['icon--arrow']}`}>
              <p className={`${styles['icon__text']} text-small`}>Phones</p>
            </a>
          </div>

          <div className={styles["arcticle"]}>
            <h1 className={styles["article--title"]}>Mobile phones</h1>

            <p className={`${styles['article--count-of-models']} text-small`}>95 models</p>
          </div>

          <div className="select">
            <p className="text-small select__sortByCategoryText">Sort by</p>

            <p className="text-small select__sortByNumberText">Items on page</p>

            <select
              id="select__sortByCategory"
              name="sortByCategory"
              className="select__sortByCategory"
            >
              <option value="Please choose" disabled selected>
                Default
              </option>

              <option value="Newest">Newest</option>

              <option value="Most Popular">Most Popular</option>

              <option value="Cheapest">Cheapest</option>
            </select>

            <select
              id="select__sortByNumber"
              name="sortByNumber"
              className="select__sortByNumber"
            >
              <option value="Please choose" disabled selected>
                Default
              </option>

              <option value="16">16</option>

              <option value="24">24</option>

              <option value="32">32</option>
            </select>
          </div>

          <div className="phone_cards">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <div className="pagination">Pagination</div>
        </div>
      </main>

      <footer>Footer</footer>
    </>
  );
};
