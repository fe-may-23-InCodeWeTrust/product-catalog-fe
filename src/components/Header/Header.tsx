import React from 'react';
import './Header.scss';
import logo from '../../assets/icons/logo.svg';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('nav__link', { 'is-active': isActive });

export const Header = () => (
  <div className="header">
    <div className="header__left left">
      <div className="left__logo">
        <img src={logo} alt="Nice Gadgets logo" className="logo" />
      </div>

      <nav className="left__nav nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink to="/" className={getLinkClass}>
              home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="phones" className={getLinkClass}>
              phones
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="tablets" className={getLinkClass}>
              tablets
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="accessories" className={getLinkClass}>
              accessories
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>

    <div className="header__icons icons">
      <div className="icons__icon header-icon favourites-icon">
        <a href="#" className="header-icon__favourites-icon"></a>
      </div>
      <div className="icons__icon header-icon shopping_bag-icon">
        <a href="#" className="header-icon__shopping_bag-icon"></a>
      </div>
      <div className="icons__icon header-icon menu-icon">
        <a href="#" className="header-icon__menu-icon"></a>
      </div>
    </div>
  </div>
);
