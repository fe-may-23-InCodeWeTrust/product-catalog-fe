import './HomePage.scss';
import React from 'react';
import { Banner } from '../../components/Banner';
import { NewModels } from '../../components/NewModels';
import { CategoryShop } from '../../components/CategoryShop';
import { HotPrices } from '../../components/HotPrices';

export const HomePage = () => {
  return (
    <div>
      <h1 className="title">Welcome to Nice Gadgets store!</h1>
      <Banner />
      <NewModels />
      <CategoryShop />
      <HotPrices />
    </div>
  );
};
