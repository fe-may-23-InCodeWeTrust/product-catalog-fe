import React, { useContext, useEffect, useRef } from 'react';
import styles from './CategoryShop.module.scss';
import phonesImg from '../../assets/icons/phones.png';
import tabletsImg from '../../assets/icons/tablets.png';
import accessoriesImg from '../../assets/icons/accessories.png';
import { useNavigate } from 'react-router-dom';
import * as ProductService from '../../api/fetch_functions';
import { LeapFrog } from '@uiball/loaders';
import { CatalogContext } from '../../context/CatalogContext';
import { useTranslation } from 'react-i18next';

const defaultSize = 90;

export const CategoryShop = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useContext(CatalogContext);

  const categories = useRef([
    {
      id: 1,
      title: `${t('mobilePhones')}`,
      count: 0,
      img: phonesImg,
      background: '#6D6474',
      path: 'phones',
    },
    {
      id: 2,
      title: `${t('tablets')}`,
      count: 0,
      img: tabletsImg,
      background: '#8D8D92',
      path: 'tablets',
    },
    {
      id: 3,
      title: `${t('accessories')}`,
      count: 0,
      img: accessoriesImg,
      background: '#973D5F',
      path: 'accessories',
    },
  ]);

  useEffect(() => {
    setIsLoading(true);
    categories.current.map((category) => {
      ProductService.getProductsCount(category.path).then((data) => {
        category.count = data;
      });
    });
    setIsLoading(false);
  }, []);

  return (
    <>
      <h1 className={styles['category-title']}>{t('shopByCategory')}</h1>
      {isLoading ? (
        <div className={styles['loader']}>
          <LeapFrog size={40} speed={2.5} color="black" />
        </div>
      ) : (
        <div className={styles['container']}>
          {categories.current.map((category, index) => (
            <div
              key={category.id}
              onClick={() => navigate(category.path)}
              className={styles['category-card']}
            >
              <div
                className={styles['category-card__background']}
                style={{ background: category.background }}
              >
                <img
                  style={{
                    width: `${defaultSize + index * 4}%`,
                    height: `${defaultSize + index * 4}%`,
                  }}
                  className={styles['category-card__img']}
                  src={category.img}
                  alt={category.title}
                />
              </div>
              <h2 className={styles['category-card__title']}>
                {category.title}
              </h2>
              <h2 className={styles['category-card__subtitle']}>
                {category.count} {t('models')}
              </h2>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
