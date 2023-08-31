import React from 'react';
import logoImage from '../../images/logo.svg';
import { Arrow } from '../../assets/icons/Arrow';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles['footer']}>
      <img className={styles['footer__logo']} src={logoImage} alt="logo" />

      <div className={styles['footer__nav']}>
        <a
          className={`${styles['footer__nav__item']} text-uppercase`}
          href="https://github.com/fe-may-23-InCodeWeTrust"
        >
          Github
        </a>
        <a className={`${styles['footer__nav__item']} text-uppercase`} href="#">
          Contacts
        </a>
        <a className={`${styles['footer__nav__item']} text-uppercase`} href="#">
          Rights
        </a>
      </div>

      <div className={styles['footer__go-back']}
      onClick={scrollToTop}
      >
        <p className={`${styles['footer__go-back__label']} text-uppercase`}>Back to top</p>
        <button
          className={styles['footer__go-back__button']}
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
};
