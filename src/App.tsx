import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import './App.scss';

export const App = () => {
  return (
    <div className="app">
      <h1>App</h1>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
