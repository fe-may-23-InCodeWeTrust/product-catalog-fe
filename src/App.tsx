import React from 'react';
import { Outlet } from 'react-router-dom';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';

export const App = () => {
  return (
    <div>
      <PhonesPage />

      <Outlet></Outlet>
    </div>
  );
};
