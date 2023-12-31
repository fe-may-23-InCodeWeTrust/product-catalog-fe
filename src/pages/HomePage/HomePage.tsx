import './HomePage.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Banner } from '../../components/Banner';
import { CategoryShop } from '../../components/CategoryShop';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../utils/Types/Product';
import { CatalogContext } from '../../context/CatalogContext';
import * as ProductService from '../../api/fetch_functions';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);
  const { isLoading, setIsLoading } = useContext(CatalogContext);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    ProductService.getNewProducts().then((data) => setNewModels(data));
    ProductService.getHotProducts()
      .then((data) => setHotPrices(data))
      .catch(() => setError('Wrong URL - could not make a request'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="home-page-title">{t('title')}</h1>
      <Banner />
      <ProductsSlider
        sliderTitle={t('newModels')}
        products={newModels}
        isLoading={isLoading}
      />
      <CategoryShop />
      <ProductsSlider
        sliderTitle={t('hotPrices')}
        products={hotPrices}
        isLoading={isLoading}
      />
    </div>
  );
};
