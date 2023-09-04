import React, { useContext } from 'react';
import { Product } from '../../utils/Types/Product';
import styles from './ProductList.module.scss';
import { ProductCard } from '../ProductCard';
import { CatalogContext } from '../../context/CatalogContext';
import { JellyTriangle } from '@uiball/loaders';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favoriteReducer';
import { addToCart } from '../../redux/cartReducer';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({
  products
}) => {
  const { isLoading } = useContext(CatalogContext);

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
    <div className={styles['phone_cards']}>
      {isLoading ? (
        <div className={styles['loader_container']}>
          <JellyTriangle size={100} speed={1.75} color="black" />
        </div>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addProductToCart}
            onToggleFavorites={toggleFavorites}
          />
        ))
      )}
    </div>
  );
};
