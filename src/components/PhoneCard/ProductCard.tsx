import styles from './ProductCard.module.scss';
import React from 'react';

export const Card: React.FC = () => {
  console.log(styles);

  return (
    <div className={styles['phone-card']}>
      <div className={styles['phone-card__image-container']}>
        <img
          src="https://www.vodafone.co.uk/business/media/image/1508926516174/img-1300x1000-apple-iphone-14-pro-max-deep-purple-product.png"
          alt="phone"
          className={styles['phone-card__image']}
        />
      </div>

      <h3 className={`${styles['phone-card__title']} text-body`}>
        Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
      </h3>

      <div className={styles['phone-card__price-block']}>
        <p className={`${styles['phone-card__price']} h2`}>$799</p>
        <p className={`${styles['phone-card__price-discount']} h2`}>$999</p>
      </div>

      <div className={styles['phone-card__divider']}></div>

      <div className={styles['phone-card__info']}>
        <div className={styles['phone-card__details']}>
          <span className={styles['phone-card__attribute']}>Screen</span>
          <span>6.5” OLED</span>
        </div>
        <div className={styles['phone-card__details']}>
          <span className={styles['phone-card__attribute']}>Capacity</span>
          <span>64 GB</span>
        </div>
        <div className={styles['phone-card__details']}>
          <span className={styles['phone-card__attribute']}>RAM</span>
          <span>4 GB</span>
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
