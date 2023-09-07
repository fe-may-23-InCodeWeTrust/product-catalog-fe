import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.svg';
import whiteLogo from '../../assets/icons/white-logo.svg';
import whiteBag from '../../assets/icons/bag-white.svg';
import whiteMenu from '../../assets/icons/menu-white.svg';
import whiteClose from '../../assets/icons/close-white.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import menu from '../../assets/icons/menu.svg';
import languages from '../../assets/icons/languages.png';
import favourites from '../../assets/icons/favourites.svg';
import favoritesWhite from '../../assets/icons/favourites-white.svg';
import account from '../../assets/icons/account-2.svg';
import bag from '../../assets/icons/shopping-bag.svg';
import close from '../../assets/icons/Close.svg';
import { useTranslation } from 'react-i18next';
import ReactFlagsSelect from 'react-flags-select';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.nav__link} text-uppercase ${isActive ? styles['is-active'] : ''} `;

const getBurgerMenuLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.menu__link} ${isActive ? styles['is-active-menu'] : ''} `;

export const Header = () => {
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  const cartCount = useSelector((state: RootState) => state.cart.goods.length);
  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.favoriteGoods.length,
  );
  const [isActiveBurger, setIsActiveBurger] = useState(false);
  const [language, setLanguage] = useState('');
  const [isActiveLanguageSwitcher, setIsActiveLanguageSwitcher] =
    useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const onChangeLanguage = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language.toLowerCase());
    setIsActiveLanguageSwitcher(false);
  };

  useEffect(() => {
    document.body.style.overflow = isActiveBurger ? 'hidden' : 'auto';
  }, [isActiveBurger]);

  const id = window.localStorage.getItem('userId');
  return (
    <>
      {!isActiveBurger && (
        <div className={styles['header']}>
          <div className={`${styles['header__left']} ${styles['left']}`}>
            <NavLink to="/" className={styles['left__logo']}>
              {darkMode ? (
                <img src={whiteLogo} alt="Nice Gadgets logo" className="logo" />
              ) : (
                <img src={logo} alt="Nice Gadgets logo" className="logo" />
              )}
            </NavLink>

            <nav className={`${styles['left__nav']} ${styles['nav']}`}>
              <ul className={styles['nav__list']}>
                <li className={styles['nav__item']}>
                  <NavLink to="/" className={getLinkClass}>
                    {t('home')}
                  </NavLink>
                </li>

                <li className={styles['nav__item']}>
                  <NavLink to="phones" className={getLinkClass}>
                    {t('phones')}
                  </NavLink>
                </li>

                <li className={styles['nav__item']}>
                  <NavLink to="tablets" className={getLinkClass}>
                    {t('tablets')}
                  </NavLink>
                </li>

                <li className={styles['nav__item']}>
                  <NavLink to="accessories" className={getLinkClass}>
                    {t('accessories')}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className={`${styles['header__icons']} ${styles['icons']}`}>
            <div
              className={`${styles['icons__icon']} ${styles['header-icon']} ${styles['languages-icon']}`}
            >
              <button
                className={styles['header-icon__languages-icon']}
                onClick={() => setIsActiveLanguageSwitcher(true)}
              >
                <img
                  src={languages}
                  alt="Languages icon"
                  className={styles['languages-icon__image']}
                />
              </button>
              {isActiveLanguageSwitcher && (
                <ReactFlagsSelect
                  className={styles['languages__switcher']}
                  selected={language}
                  onSelect={onChangeLanguage}
                  countries={['GB', 'UA', 'PL', 'PT']}
                  customLabels={{ GB: 'EN', UA: 'UA', PL: 'PL', PT: 'PT' }}
                  placeholder="EN"
                />
              )}
            </div>
            <div
              className={`${styles['icons__icon']} ${styles['header-icon']} ${styles['favourites-icon']}`}
            >
              <NavLink
                to={id ? '/' : 'signin'}
                className={({ isActive }: { isActive: boolean }) =>
                  `${styles['header-icon__favourites-icon']} ${
                    isActive ? styles['is-active-icon'] : ''
                  }`
                }
              >
                <img
                  src={account}
                  alt="account icon"
                  className={styles['languages-icon__image']}
                />
              </NavLink>
            </div>
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
                {darkMode ? (
                  <img
                    src={favoritesWhite}
                    alt="Favourites icon"
                    className="favourites-icon__image"
                  />
                ) : (
                  <img
                    src={favourites}
                    alt="Favourites icon"
                    className="favourites-icon__image"
                  />
                )}
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
                {darkMode ? (
                  <img
                    src={whiteBag}
                    alt="Shopping bag icon"
                    className="shopping_bag-icon__image"
                  />
                ) : (
                  <img
                    src={bag}
                    alt="Shopping bag icon"
                    className="shopping_bag-icon__image"
                  />
                )}
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
                {darkMode ? (
                  <img
                    src={whiteMenu}
                    alt="Menu icon"
                    className="menu-icon__image"
                  />
                ) : (
                  <img
                    src={menu}
                    alt="Menu icon"
                    className="menu-icon__image"
                  />
                )}
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
              {darkMode ? (
                <img
                  src={whiteLogo}
                  alt="Nice Gadgets logo"
                  className={`${styles['logo__image']}`}
                />
              ) : (
                <img
                  src={logo}
                  alt="Nice Gadgets logo"
                  className={`${styles['logo__image']}`}
                />
              )}
            </NavLink>

            <div
              className={`${styles['aside__close-icon']} ${styles['close-icon']}`}
            >
              <NavLink
                to="/"
                className={`${styles['close-icon__link']}`}
                onClick={() => setIsActiveBurger(false)}
              >
                {darkMode ? (
                  <img
                    src={whiteClose}
                    alt="Close icon"
                    className={`${styles['close-icon__image']}`}
                  />
                ) : (
                  <img
                    src={close}
                    alt="Close icon"
                    className={`${styles['close-icon__image']}`}
                  />
                )}
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
                {darkMode ? (
                  <img
                    src={favoritesWhite}
                    alt="Favourites icon"
                    className={`${styles['favourites-icon__image']}`}
                  />
                ) : (
                  <img
                    src={favourites}
                    alt="Favourites icon"
                    className={`${styles['favourites-icon__image']}`}
                  />
                )}
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
                {darkMode ? (
                  <img
                    src={whiteBag}
                    alt="Shopping bag icon"
                    className={`${styles['shopping_bag-icon__image']}`}
                  />
                ) : (
                  <img
                    src={bag}
                    alt="Shopping bag icon"
                    className={`${styles['shopping_bag-icon__image']}`}
                  />
                )}
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
