import styles from './FavoritesPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favoriteReducer';
import { addToCart } from '../../redux/cartReducer';
import { Product } from '../../utils/Types/Product';
import { Notification } from '../../components/Notification/Notification';
import { useTranslation } from 'react-i18next';
import { Pagination } from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

export const FavoritesPage = () => {
  const favoritesGoods = useSelector(
    (state: RootState) => state.favorites.favoriteGoods,
  );
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [totalPages, setTotalPages] = useState(0);
  // const pageParams = searchParams.get('page');
  // const currentPage = pageParams ? +pageParams : 1;

  const numberOfItems = favoritesGoods.length;
  // useEffect(() => {
  //   setTotalPages(Math.ceil(numberOfItems / 16));
  // }, [numberOfItems]);

  const toggleFavorites = (product: Product) => {
    const foundedGood = favoritesGoods.find((good) => good.id === product.id);

    if (foundedGood) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const addProductToCart = (product: Product) => {
    dispatch(
      addToCart({
        ...product,
        count: 1,
      }),
    );
  };

  return (
    <main className={styles['main']}>
      <div className={styles['container']}>
        <div className={styles['icons']}>
          <a
            href="#home"
            className={`${styles['icon']} ${styles['icon--home']}`}
          ></a>

          <a href="#" className={`${styles['icon']} ${styles['icon--arrow']}`}>
            <p className={`${styles['icon__text']} text-small`}>
              {t('favorites')}
            </p>
          </a>
        </div>

        <div className={styles['article']}>
          <h1 className={styles['article--title']}>{t('favorites')}</h1>

          <p className={`${styles['article--count-of-models']} text-small`}>
            {numberOfItems} {t('models')}
          </p>
        </div>

        <div className={styles['phone_cards']}>
          {favoritesGoods.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addProductToCart}
              onToggleFavorites={toggleFavorites}
            />
          ))}
        </div>
        {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleOffset={setOffset}
            limit={16}
            sortBy={'newest'}
            sortByNumber={'16'}
          /> */}
      </div>
    </main>
  );
};
