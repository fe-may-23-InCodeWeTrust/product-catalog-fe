import { Product } from '../../utils/Types/Product';
import styles from './ProductCard.module.scss';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import { Notification } from '../Notification/Notification';
import * as ProductProvider from '../../api/fetch_functions';
import { useTranslation } from 'react-i18next';
import { CatalogContext } from '../../context/CatalogContext';

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  const { favoritesCount, setFavoritesCount } = useContext(CatalogContext);
  const [isCartNotification, setIsNotification] = useState(false);
  const [isFavoritesNotification, setIsFavoritesNotification] = useState(false);

  const goods = useSelector((state: RootState) => state.cart.goods);
  const { t } = useTranslation();

  const addToCartButtonCondition = goods.find((good) => good.id === product.id);

  const addTofavoritesButtonCondition = favoritesCount.find(
    (good) => good === product.itemId,
  );

  console.log(favoritesCount);

  const goodsFromCart = useSelector((state: RootState) => state.cart.goods);
  const isInCart = goodsFromCart.find((g) => g.id === product.id);

  const notificateCart = () => {
    if (!addToCartButtonCondition) {
      setIsNotification(true);

      setTimeout(() => {
        setIsNotification(false);
      }, 2000);
    }
  };

  const notificateFaborites = () => {
    if (!addTofavoritesButtonCondition) {
      setIsFavoritesNotification(true);
    }

    setTimeout(() => {
      setIsFavoritesNotification(false);
    }, 2000);
  };

  const userId = window.localStorage.getItem('userId')?.toString();

  const handleFavorites = async (itemId: string) => {
    if (userId) {
      await ProductProvider.updateFavorites(itemId, userId as string).finally(() => setFavoritesCount((prev) => {
        if (!prev.includes(itemId)) {
        return  [...prev, itemId]
      } else {
        return prev.filter(good => good !== itemId);
      }
      }));
    }
  };

  return (
    <div className={styles['phone-card']}>
      <div className={styles['phone-card__image-container']}>
        <Link to={`/${product.category}/${product.itemId}`}>
          <img
            src={`https://product-catalog-be-lf4l.onrender.com/${product.image}`}
            alt="phone"
            className={styles['phone-card__image']}
          />
        </Link>
      </div>

      <h3 className={`${styles['phone-card__title']} text-body`}>
        <Link to={`/${product.category}/${product.itemId}`}>
          {product.name}
        </Link>
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
          className={classNames('text-button', `${styles['add-to-cart']}`, {
            'added-to-cart': addToCartButtonCondition,
          })}
          onClick={() => {
            onAddToCart(product);
            notificateCart();
          }}
          disabled={!!isInCart}
        >
          {addToCartButtonCondition ? t('addedToCart') : t('addToCart')}
        </button>
        {userId && (
          <button
            className={classNames(styles['add-to-favorites'], {
              'added-to-favorites': addTofavoritesButtonCondition,
            })}
            type="submit"
            onClick={() => {
              notificateFaborites();
              handleFavorites(product.itemId);
            }}
          ></button>
        )}
      </div>

      {isCartNotification && (
        <Notification text="The good was added to the cart" />
      )}

      {isFavoritesNotification && (
        <Notification text="The good was added to the favorites" />
      )}
    </div>
  );
};
