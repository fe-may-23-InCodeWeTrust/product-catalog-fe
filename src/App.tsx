import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card } from './components/PhoneCard';
import './styles/index.scss'

export const App = () => {
  return (
    <div>
      <h1>App</h1>
      <Card />
      <Outlet></Outlet>
    </div>
  );
};

