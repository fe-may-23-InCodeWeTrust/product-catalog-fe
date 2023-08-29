import React from 'react';
import './PhonesPage.scss';

export const PhonesPage = () => {
  return (
    <>
      <header>
        Header
      </header>

      <main className="main">
        <div className="container">
          <div className="icons">
            <a href="#home" className="icon icon--home"></a>

            <a href="#" className="icon icon--arrow">
              <p className="icon__text">Phones</p>
            </a>
          </div>

          <div className="arcticle">
            <p className="article--title">Mobile Phones</p>

            <p className="article--count-of-models">95 models</p>
          </div>

          <div className="select">
            <p className="select__sortByCategoryText">Sort by</p>

            <p className="select__sortByNumberText">Items on page</p>

            <select id="select__sortByCategory" name="sortByCategory" className="select__sortByCategory">
              <option value="Please choose" disabled selected>Please choose</option>

              <option value="Newest">Newest</option>

              <option value="Most Popular">Most Popular</option>

              <option value="Cheapest">Cheapest</option>
            </select>

            <select id="select__sortByNumber" name="sortByNumber" className="select__sortByNumber">
              <option value="Please choose" disabled selected>Please choose</option>

              <option value="16">16</option>

              <option value="24">24</option>

              <option value="32">32</option>
            </select>
          </div>

          <div className="phone_cards">
            PHONES
          </div>

          <div className="pagination">
            Pagination
          </div>
        </div>
      </main>

      <footer>
        Footer
      </footer>
    </>
  );
};
