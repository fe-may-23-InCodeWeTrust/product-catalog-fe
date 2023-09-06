import React, { FormEvent, useState } from 'react';
import styles from './SignUpPage.module.scss';
import * as ProductService from '../../api/fetch_functions';
import { Link, useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result;
    if (confirmPassword === password) {
      result = await ProductService.createUser(email, password, fullName);
    } else {
      alert('Passwords do not match. Please, try one more time.');
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
        setMessage(result.err)
      }
    }
  };


  return (
    <form className={styles['login_form']} onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <div className={styles['login_form-box']}>
        <label className={styles['login_form-label']}>Your name</label>
        <input
          type="text"
          className={styles['login_form-input']}
          placeholder="Enter your name"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className={styles['login_form-box']}>
        <label className={styles['login_form-label']}>Email address</label>
        <input
          type="email"
          className={styles['login_form-input']}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles['login_form-box']}>
        <label className={styles['login_form-label']}>Password</label>
        <input
          type="password"
          className={styles['login_form-input']}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className={styles['login_form-box']}>
        <label className={styles['login_form-label']}>Confirm password</label>
        <input
          type="password"
          className={styles['login_form-input']}
          placeholder="Please repeat password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className={styles['login_form-question']}>
        <p className={styles['login_form-text']}>{`Already registered?`}</p>
        <Link to={'../signin'} className={styles['login_form-link']}>
          Log In
        </Link>
      </div>

      <div>
        <button type="submit" className={styles['login_form-btn']}>
          Submit
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
