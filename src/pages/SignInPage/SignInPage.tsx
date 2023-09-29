import React, { useState } from 'react';
import styles from './SignInPage.module.scss';
import * as ProductService from '../../api/fetch_functions';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LeapFrog } from '@uiball/loaders';

export const SignInPage = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const credentials = `${email}:${password}`;
    const result = await ProductService.getAuthenticatedUser(credentials);

    if (result.id) {
      window.localStorage.setItem('userId', result.id);
      setIsLoading(false);
      navigate('/user');
    }  
    if (result.err) {
      setIsLoading(false);
      setMessage(result.err);
      setModal(true);
      
      setTimeout(() => {
        setModal(false);
        setMessage('');
      }, 2000)
    }
  };

  return (
    <form className={styles['login_form']} onSubmit={handleSubmit}>
      {isLoading ? (
        <div className={styles['loader']}>
          <LeapFrog size={40} speed={2.5} color="black" />
        </div>
      ) : (
        <>
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
            <label className={styles['login_form-label']}>
              {t('password')}
            </label>
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
          {modal && (
            <div className={styles['login_form-notification']}>
              <p>{message}</p>
            </div>
          )}
        </>
      )}
    </form>
  );
};
