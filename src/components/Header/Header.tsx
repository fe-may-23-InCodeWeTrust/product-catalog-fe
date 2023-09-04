import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.svg';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.nav__link} text-uppercase ${isActive ? styles['is-active'] : ''} `;

export const Header = () => {
  const cartCount = useSelector((state: RootState) => state.cart.goods.length);
  const favoritesCount = useSelector((state: RootState) => state.favorites.favoriteGoods.length);

  return (
    <div className={styles['header']}>
      <div className={`${styles['header__left']} ${styles['left']}`}>
        <div className={styles['left__logo']}>
          <img src={logo} alt="Nice Gadgets logo" className="logo" />
        </div>

        <nav className={`${styles['left__nav']} ${styles['nav']}`}>
          <ul className={styles['nav__list']}>
            <li className={styles['nav__item']}>
              <NavLink to="/" className={getLinkClass}>
                home
              </NavLink>
            </li>
            <li className={styles['nav__item']}>
              <NavLink to="phones" className={getLinkClass}>
                phones
              </NavLink>
            </li>
            <li className={styles['nav__item']}>
              <NavLink to="tablets" className={getLinkClass}>
                tablets
              </NavLink>
            </li>
            <li className={styles['nav__item']}>
              <NavLink to="accessories" className={getLinkClass}>
                accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`${styles['header__icons']} ${styles['icons']}`}>
        <div
          className={`${styles['icons__icon']} ${styles['header-icon']} ${styles['favourites-icon']}`}
        >
          <NavLink
            to="favorites"
            className={styles['header-icon__favourites-icon']}
          ></NavLink>
          {!!favoritesCount && (
            <div className={styles['mini-count']}>
              {favoritesCount <= 9 ? favoritesCount : '9+'}
            </div>
          )}
        </div>
        <div
          className={`${styles['icons__icon']} ${styles['header-icon']} ${styles['shopping_bag-icon']}`}
        >
          <NavLink
            to="cart"
            className={styles['header-icon__shopping_bag-icon']}
          ></NavLink>
          {!!cartCount && (
            <div className={styles['mini-count']}>
              {cartCount <= 9 ? cartCount : '9+'}
            </div>
          )}
        </div>
        <div
          className={`${styles['icons__icon']} ${styles['header-icon']} ${styles['menu-icon']}`}
        >
          <a href="#" className={styles['header-icon__menu-icon']}></a>
        </div>
      </div>
    </div>
  );
};
