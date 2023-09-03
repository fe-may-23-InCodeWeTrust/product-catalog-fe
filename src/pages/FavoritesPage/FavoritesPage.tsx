import styles from './FavoritesPage.module.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favoriteReducer';
import { addToCart } from '../../redux/cartReducer';
import { Product } from '../../utils/Types/Product';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage = () => {
  const faviritesGoods = useSelector(
    (state: RootState) => state.favorites.favoriteGoods,
  );
  const dispatch = useDispatch<AppDispatch>();

  const toggleFavorites = (product: Product) => {
    const foundedGood = faviritesGoods.find((good) => good.id === product.id);

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
            <p className={`${styles['icon__text']} text-small`}>Favorites</p>
          </a>
        </div>

        <div className={styles['article']}>
          <h1 className={styles['article--title']}>Favorites</h1>

          <p className={`${styles['article--count-of-models']} text-small`}>
            95 models
          </p>
        </div>

        <div className={styles['phone_cards']}>
          {faviritesGoods.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addProductToCart}
              onToggleFavorites={toggleFavorites}
            />
          ))}
        </div>

        <div className={styles['pagination']}>Pagination</div>
      </div>
    </main>
  );
};
