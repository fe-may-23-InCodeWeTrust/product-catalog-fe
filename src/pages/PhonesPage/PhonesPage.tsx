import React from 'react';
import './PhonesPage.scss';
import Select from "react-select";
import { Card } from '../../components/PhoneCard';

const categories = [
  { value: 'newest', label: 'Newest'},
  { value: "popular", label: "Popular" },
  { value: "cheapest", label: "Cheapest" },
];

const numbers = [
  { value: 16, label: 16 },
  { value: 24, label: 24 },
  { value: 32, label: 32 },
];

export const PhonesPage = () => {
  const CustomStyle = {
    option: (defaultStyles: object, { data, isDisabled, isFocused, isSelected }: any) => ({
      ...defaultStyles,
      backgroundColor: isFocused ? '#FAFBFC' : '#fff',
      color: "#0f0f11",
    }),

    control: (defaultStyles: object) => ({
      ...defaultStyles,
      backgroundColor: "#fff",
      borderRaduis: "8px",
      border: "0.5px solid #89939A",
      cursor: "pointer",
      fontSize: "10px",
    }),
    singleValue: (defaultStyles: object) => ({ 
      ...defaultStyles, 
      color: "#0f0f11",
    }),
  }

  return (
    <main className="main">
      <div className="pages_container">
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
          <Select
            className="select__sortByCategory"
            options={categories} 
            styles={CustomStyle}
            defaultValue={categories[0]}
          />
          <Select
            className="select__sortByNumber"
            options={numbers}
            styles={CustomStyle}
            defaultValue={numbers[0]}
          />
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
