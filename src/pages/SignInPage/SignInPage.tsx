import React, { useState } from 'react';
import styles from './SignInPage.module.scss';
import * as ProductService from '../../api/fetch_functions';
import { Link, useNavigate } from 'react-router-dom';

export const SignInPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const credentials = `${email}:${password}`;
    const result = await ProductService.getAuthenticatedUser(credentials);

    if (result) {
      window.localStorage.setItem('userId', result.id);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      alert('Something went wrong!');
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      const credentials = `${email}:${password}`;
      const result = await ProductService.getAuthenticatedUser(credentials);
  
      if (result) {
        window.localStorage.setItem('userId', result.id);
  
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        alert('Something went wrong!');
      }
    }
  };

  return (
    <form className={styles['login_form']} onKeyDown={handleKeyPress} onSubmit={handleSubmit}>
      <h3>Sign In</h3>

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

      <div className={styles['login_form-question']}>
        <p className={styles['login_form-text']}>{`Don't have an account?`}</p>
        <Link to={'../signup'} className={styles['login_form-link']}>
          Register
        </Link>
      </div>

      <div className="d-grid">
        <button type="submit" className={styles['login_form-btn']}>
          Submit
        </button>
      </div>
    </form>
  );
};
