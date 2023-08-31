import React, { useContext } from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.svg';
import { NavLink } from 'react-router-dom';
import { CatalogContext } from '../../context/CatalogContext';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.nav__link} ${isActive ? styles['is-active'] : ''} `;

export const Header = () => {
  const { setCatalogTitle, setIconTitle } = useContext(CatalogContext);
  return (
    <div className={styles['header']}>
      <div className={`${styles['header__left']} ${styles['left']}`}>
        <div className={styles['left__logo']}>
          <img src={logo} alt="Nice Gadgets logo" className="logo" />
        </div>
  
        <nav className={`${styles['left__nav']} ${styles['nav']}`}>
          <ul className={styles['nav__list']}>
            <li className={styles['nav__item']}>
              <NavLink 
                  to="/" 
                  className={getLinkClass}
              >
                home
              </NavLink>
            </li>
            <li className={styles['nav__item']}>
              <NavLink 
                to="phones" 
                className={getLinkClass}
                onClick={() => {
                  setCatalogTitle('Mobile phones')
                  setIconTitle('Phones')
                }}
              >
                phones
              </NavLink>
            </li>
            <li className={styles['nav__item']}>
              <NavLink 
                to="tablets" 
                className={getLinkClass}
                onClick={() => {
                  setCatalogTitle('Tablets')
                  setIconTitle('Tablets')
                }}
              >
                tablets
              </NavLink>
            </li>
            <li className={styles['nav__item']}>
              <NavLink 
                to="accessories" 
                className={getLinkClass}
                onClick={() => {
                  setCatalogTitle('Accessories')
                  setIconTitle('Accessories')
                }}
              >
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
        </div>
        <div
          className={`${styles['icons__icon']} ${styles['header-icon']} ${styles['shopping_bag-icon']}`}
        >
          <NavLink
            to="cart"
            className={styles['header-icon__shopping_bag-icon']}
          ></NavLink>
        </div>
        <div
          className={`${styles['icons__icon']} ${styles['header-icon']} ${styles['menu-icon']}`}
        >
          <a href="#" className={styles['header-icon__menu-icon']}></a>
        </div>
      </div>
    </div>
  )
};
