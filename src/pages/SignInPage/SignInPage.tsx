import React, { useState } from 'react';
import styles from './SignInPage.module.scss';
import * as ProductService from '../../api/fetch_functions';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SignInPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const credentials = `${email}:${password}`;
    const result = await ProductService.getAuthenticatedUser(credentials);

    if (result.id) {
      window.localStorage.setItem('userId', result.id);

      setTimeout(() => {
        navigate('/user');
      }, 2000);
    } else {
      alert(t('wentWrong'));
    }
  };

  return (
    <form className={styles['login_form']} onSubmit={handleSubmit}>
      <h3>{t('signIn')}</h3>

      <div className={styles['login_form-box']}>
        <label className={styles['login_form-label']}>
          {t('emailAddress')}
        </label>
        <input
          type="email"
          className={styles['login_form-input']}
          placeholder={t('enterEmail')}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles['login_form-box']}>
        <label className={styles['login_form-label']}>{t('password')}</label>
        <input
          type="password"
          className={styles['login_form-input']}
          placeholder={t('enterPassword')}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className={styles['login_form-question']}>
        <p className={styles['login_form-text']}>{t('noAccount')}</p>
        <Link to={'../signup'} className={styles['login_form-link']}>
          {t('register')}
        </Link>
      </div>

      <div className="d-grid">
        <button type="submit" className={styles['login_form-btn']}>
          {t('submit')}
        </button>
      </div>
    </form>
  );
};
