import React, { FormEvent, useState } from 'react';
import styles from './SignUpPage.module.scss';
import * as ProductService from '../../api/fetch_functions';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result;
    if (confirmPassword === password) {
      result = await ProductService.createUser(email, password, fullName);
    } else {
      alert(t('notMatchPasswords'));
    }

    if (result?.message) {
      setMessage(result.message);
      setModal(true);
      setTimeout(() => {
        setModal(false);
        navigate('/signin');
      }, 3000);
    } else {
      if (result?.err) {
        setMessage(result.err);
      }
    }
  };

  return (
    <form className={styles['login_form']} onSubmit={handleSubmit}>
      <h3>{t('signUp')}</h3>

      <div className={styles['login_form-box']}>
        <label className={styles['login_form-label']}>{t('yourName')}</label>
        <input
          type="text"
          className={styles['login_form-input']}
          placeholder={t('enterYourName')}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

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

      <div className={styles['login_form-box']}>
        <label className={styles['login_form-label']}>
          {t('confirmPassword')}
        </label>
        <input
          type="password"
          className={styles['login_form-input']}
          placeholder={t('repeatPassword')}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className={styles['login_form-question']}>
        <p className={styles['login_form-text']}>{t('alreadyRegistered')}</p>
        <Link to={'../signin'} className={styles['login_form-link']}>
          {t('logIn')}
        </Link>
      </div>

      <div>
        <button type="submit" className={styles['login_form-btn']}>
          {t('submit')}
        </button>
      </div>
      {modal && (
        <div className={styles['login_form-notification']}>
          <p>{message}</p>
        </div>
      )}
    </form>
  );
};
