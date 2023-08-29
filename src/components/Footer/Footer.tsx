import React from 'react';
import logoImage from '../../images/logo.svg';
import './Footer.scss';
import arrow from '../../assets/icons/arrow.svg';

export const Footer = () => {
  return (
    <div className="footer">
      <img className="footer__logo" src={logoImage} alt="logo" />

      <div className="footer__nav">
        <a className="footer__nav__item" href="src/components#">
          Github
        </a>
        <a className="footer__nav__item" href="#">
          Contacts
        </a>
        <a className="footer__nav__item" href="#">
          Rights
        </a>
      </div>

      <div className="footer__go-back">
        <p className="footer__go-back__label">Back to top</p>
        <button className="footer__go-back__button">
          <img src={arrow} alt="arrow" />
        </button>
      </div>
    </div>
  );
};
