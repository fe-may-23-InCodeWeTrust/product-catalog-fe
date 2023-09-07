import React from 'react';
import logoImage from '../../images/logo.svg';
import { Arrow } from '../../assets/icons/Arrow';
import { ArrowDarkTheme } from '../../assets/icons/ArrowDarkTheme';
import styles from './Footer.module.scss';
import { useSelector } from 'react-redux';
import whiteLogo from '../../assets/icons/white-logo.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles['footer']}>
      <img
        className={styles['footer__logo']}
        src={darkMode ? whiteLogo : logoImage}
        alt="logo"
      />

      <div className={styles['footer__nav']}>
        <a
          className={`${styles['footer__nav__item']} text-uppercase`}
          href="https://github.com/fe-may-23-InCodeWeTrust"
        >
          Github
        </a>
        <Link
          className={`${styles['footer__nav__item']} text-uppercase`}
          to="contacts"
        >
          {t('contacts')}
        </Link>
        <a className={`${styles['footer__nav__item']} text-uppercase`} href="https://www.freeprivacypolicy.com/live/19a89ed9-6946-42f4-b34c-8f488bcdcf5d">
          {t('rights')}
        </a>
      </div>

      <div className={styles['footer__go-back']} onClick={scrollToTop}>
        <p className={`${styles['footer__go-back__label']} text-uppercase`}>
          {t('backToTop')}
        </p>
        <button className={styles['footer__go-back__button']}>
          {darkMode ? <ArrowDarkTheme /> : <Arrow />}
        </button>
      </div>
    </div>
  );
};
