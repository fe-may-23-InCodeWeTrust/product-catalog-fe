import React from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import './App.scss';
import './styles/index.scss';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
