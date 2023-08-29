import React from 'react';
import logoImage from '../../images/logo.svg';
import { Arrow } from '../../assets/icons/Arrow';
import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <img className="footer__logo" src={logoImage} alt="logo" />

      <div className="footer__nav">
        <a
          className="footer__nav__item"
          href="https://github.com/fe-may-23-InCodeWeTrust"
        >
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
        <button className="footer__go-back__button" onClick={scrollToTop}>
          <Arrow />
        </button>
      </div>
    </div>
  );
};
