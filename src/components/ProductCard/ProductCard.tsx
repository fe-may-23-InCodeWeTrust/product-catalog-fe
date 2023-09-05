import { Product } from '../../utils/Types/Product';
import styles from './ProductCard.module.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorites: (product: Product) => void;
};

export const ProductCard: React.FC<Props> = ({
  product,
  onAddToCart,
  onToggleFavorites,
}) => {
  const goodsFromCart = useSelector((state: RootState) => state.cart.goods);
  const isInCart = goodsFromCart.find((g) => g.id === product.id);

  return (
    <div className={styles['phone-card']}>
      <div className={styles['phone-card__image-container']}>
        <img
          src={`https://product-catalog-be-lf4l.onrender.com/${product.image}`}
          alt="phone"
          className={styles['phone-card__image']}
        />
      </div>

      <h3 className={`${styles['phone-card__title']} text-body`}>
        <Link to={`/${product.category}/${product.itemId}`}>{product.name}</Link>
      </h3>

      <div className={styles['phone-card__price-block']}>
        <p className={`${styles['phone-card__price']} h2`}>{product.price}$</p>
        <p className={`${styles['phone-card__price-discount']} h2`}>
          {product.fullPrice}$
        </p>
      </div>

      <div className={styles['phone-card__divider']}></div>

      <div className={styles['phone-card__info']}>
        <div className={styles['phone-card__details']}>
          <span className={styles['phone-card__attribute']}>Screen</span>
          <span>{product.screen}</span>
        </div>
        <div className={styles['phone-card__details']}>
          <span className={styles['phone-card__attribute']}>Capacity</span>
          <span>{product.capacity}</span>
        </div>
        <div className={styles['phone-card__details']}>
          <span className={styles['phone-card__attribute']}>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>

      <div className={styles['phone-card__actions']}>
        <button
          type="submit"
          className={`${styles['add-to-cart']} text-button`}
          onClick={() => onAddToCart(product)}
          disabled={!!isInCart}
        >
          Add to cart
        </button>

        <button
          className={styles['add-to-favorites']}
          type="submit"
          onClick={() => onToggleFavorites(product)}
        ></button>
      </div>
    </div>
  );
};
