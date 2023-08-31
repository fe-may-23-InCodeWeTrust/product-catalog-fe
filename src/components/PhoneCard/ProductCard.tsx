import { Product } from '../../utils/Types/Product';
import styles from './ProductCard.module.scss';
import React from 'react';

type Props = {
  product: Product;
}

export const Card: React.FC<Props> = ({ product }) => {
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
        {product.name}
      </h3>

      <div className={styles['phone-card__price-block']}>
        <p className={`${styles['phone-card__price']} h2`}>{product.price}$</p>
        <p className={`${styles['phone-card__price-discount']} h2`}>{product.fullPrice}$</p>
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
        >
          Add to cart
        </button>

        <button className={styles['add-to-favorites']} type="submit"></button>
      </div>
    </div>
  );
};
