import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Card } from './components/PhoneCard';
import './App.scss';
import './styles/index.scss';

export const App = () => {
  return (
    <div className="app">
      <h1>Header</h1>
      <Card />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
