import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage';
import { TabletsPage } from './components/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='home' element={<HomePage />} />
        <Route path='phones' element={<PhonesPage />}/>
        <Route path='tablets' element={<TabletsPage />}/>
        <Route path='accessories' element={<AccessoriesPage />}/>
      </Routes>
      <Footer />
    </div>
  );
};
