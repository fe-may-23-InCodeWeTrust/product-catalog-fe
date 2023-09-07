import React, { useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import './App.scss';
import './styles/index.scss';
import { Switcher } from './components/Switcher/Switcher';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

export const App = () => {
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', darkMode);
  }, [darkMode]);

  return (
    <div className={classNames('app', darkMode ? 'dark' : 'light')}>
      <Header />
      <div className="content_container">
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
