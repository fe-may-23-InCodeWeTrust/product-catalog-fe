import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import menu from '../../assets/icons/menu.svg';
import favourites from '../../assets/icons/favourites.svg';
import bag from '../../assets/icons/shopping-bag.svg';
import close from '../../assets/icons/Close.svg';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.nav__link} text-uppercase ${isActive ? styles['is-active'] : ''} `;

const getBurgerMenuLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.menu__link} ${isActive ? styles['is-active-menu'] : ''} `;

export const Header = () => {
  const cartCount = useSelector((state: RootState) => state.cart.goods.length);
  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.favoriteGoods.length,
  );
  const [isActiveBurger, setIsActiveBurger] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isActiveBurger ? 'hidden' : 'auto';
  }, [isActiveBurger]);

  return (
    <>
      {!isActiveBurger && (
        <div className={styles['header']}>
          <div className={`${styles['header__left']} ${styles['left']}`}>
            <NavLink to="/" className={styles['left__logo']}>
              <img src={logo} alt="Nice Gadgets logo" className="logo" />
            </NavLink>

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
                className={({ isActive }: { isActive: boolean }) =>
                  `${styles['header-icon__favourites-icon']} ${
                    isActive ? styles['is-active-icon'] : ''
                  }`
                }
              >
                <img
                  src={favourites}
                  alt="Favourites icon"
                  className="favourites-icon__image"
                />
              </NavLink>
              {!!favoritesCount && (
                <Link to="favorites">
                  <div className={styles['mini-count']}>
                    {favoritesCount <= 9 ? favoritesCount : '9+'}
                  </div>
                </Link>
              )}
            </div>
            <div
              className={`${styles['icons__icon']} ${styles['header-icon']} ${styles['shopping_bag-icon']}`}
            >
              <NavLink
                to="cart"
                className={({ isActive }: { isActive: boolean }) =>
                  `${styles['header-icon__shopping_bag-icon']} ${
                    isActive ? styles['is-active-icon'] : ''
                  }`
                }
              >
                <img
                  src={bag}
                  alt="Shopping bag icon"
                  className="shopping_bag-icon__image"
                />
              </NavLink>
              {!!cartCount && (
                <Link to="cart">
                  <div className={styles['mini-count']}>
                    {cartCount <= 9 ? cartCount : '9+'}
                  </div>
                </Link>
              )}
            </div>
            <div
              className={`${styles['icons__icon']} ${styles['header-icon']} ${styles['menu-icon']}`}
            >
              <button
                className={styles['header-icon__menu-icon']}
                onClick={() => setIsActiveBurger(true)}
              >
                <img src={menu} alt="Menu icon" className="menu-icon__image" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isActiveBurger && (
        <aside className={`${styles['aside']}`}>
          <div className={`${styles['aside__top']}`}>
            <NavLink
              to="/"
              className={`${styles['aside__logo']} ${styles['logo']}`}
              onClick={() => setIsActiveBurger(false)}
            >
              <img
                src={logo}
                alt="Nice Gadgets logo"
                className={`${styles['logo__image']}`}
              />
            </NavLink>

            <div
              className={`${styles['aside__close-icon']} ${styles['close-icon']}`}
            >
              <NavLink
                to="/"
                className={`${styles['close-icon__link']}`}
                onClick={() => setIsActiveBurger(false)}
              >
                <img
                  src={close}
                  alt="Close icon"
                  className={`${styles['close-icon__image']}`}
                />
              </NavLink>
            </div>
          </div>

          <div
            className={`${styles['aside__burger-menu']} ${styles['burger-menu']}`}
          >
            <nav className={`${styles['burger-menu__nav']}`}>
              <ul className={`${styles['burger-menu__list']}`}>
                <li className={`${styles['burger-menu__item']}`}>
                  <NavLink
                    to="/"
                    className={getBurgerMenuLinkClass}
                    onClick={() => setIsActiveBurger(false)}
                  >
                    home
                  </NavLink>
                </li>

                <li className={`${styles['burger-menu__item']}`}>
                  <NavLink
                    to="phones"
                    className={getBurgerMenuLinkClass}
                    onClick={() => setIsActiveBurger(false)}
                  >
                    phones
                  </NavLink>
                </li>

                <li className={`${styles['burger-menu__item']}`}>
                  <NavLink
                    to="tablets"
                    className={getBurgerMenuLinkClass}
                    onClick={() => setIsActiveBurger(false)}
                  >
                    tablets
                  </NavLink>
                </li>

                <li className={`${styles['burger-menu__item']}`}>
                  <NavLink
                    to="accessories"
                    className={getBurgerMenuLinkClass}
                    onClick={() => setIsActiveBurger(false)}
                  >
                    accessories
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className={`${styles['aside__bottom']}`}>
            <div
              className={`${styles['aside__favourites-icon']} ${styles['favourites-icon']}`}
            >
              <NavLink
                to="favorites"
                className={({ isActive }: { isActive: boolean }) =>
                  `${styles['favourites-icon__link']} ${
                    isActive ? styles['is-active-icon'] : ''
                  }`
                }
                onClick={() => setIsActiveBurger(false)}
              >
                <img
                  src={favourites}
                  alt="Favourites icon"
                  className={`${styles['favourites-icon__image']}`}
                />
              </NavLink>
              {!!favoritesCount && (
                <Link to="favorites">
                  <div className={styles['mini-count']}>
                    {favoritesCount <= 9 ? favoritesCount : '9+'}
                  </div>
                </Link>
              )}
            </div>
            <div
              className={`${styles['aside__shopping_bag-icon']} ${styles['shopping_bag-icon']}`}
            >
              <NavLink
                to="cart"
                className={({ isActive }: { isActive: boolean }) =>
                  `${styles['shopping_bag-icon__link']} ${
                    isActive ? styles['is-active-icon'] : ''
                  }`
                }
                onClick={() => setIsActiveBurger(false)}
              >
                <img
                  src={bag}
                  alt="Shopping bag icon"
                  className={`${styles['shopping_bag-icon__image']}`}
                />
              </NavLink>
              {!!cartCount && (
                <Link to="cart">
                  <div className={styles['mini-count']}>
                    {cartCount <= 9 ? cartCount : '9+'}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
