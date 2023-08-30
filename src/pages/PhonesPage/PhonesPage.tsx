import React from 'react';
import './PhonesPage.scss';
import '../../styles/_typography.scss';
import { Card } from '../../components/PhoneCard';

export const PhonesPage = () => {
  return (
    <main className="main">
      <div className="container">
        <div className="icons">
          <a href="#home" className="icon icon--home"></a>

          <a href="#" className="icon icon--arrow">
            <p className="text-small icon__text">Phones</p>
          </a>
        </div>

        <div className="arcticle">
          <h1 className="article--title">Mobile phones</h1>

          <p className="text-button article--count-of-models">95 models</p>
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
        </div>

        <div className="pagination">Pagination</div>
      </div>
    </main>
  );
};
