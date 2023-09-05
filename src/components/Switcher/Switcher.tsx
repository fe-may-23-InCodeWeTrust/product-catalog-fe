import React from 'react';
import styles from './Switcher.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/themeReducer';

export const Switcher = () => {
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  const dispatch = useDispatch();
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
    localStorage.setItem('darkMode', `${!darkMode}`);
  };

  console.log(darkMode);

  return <div className={styles['switcher']} onClick={handleToggleTheme}></div>;
};
