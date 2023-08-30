import React from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Card } from './components/PhoneCard';
import './App.scss';
import './styles/index.scss';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Card />
      <Footer />
    </div>
  );
};
