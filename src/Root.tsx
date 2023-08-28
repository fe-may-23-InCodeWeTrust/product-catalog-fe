import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { DetailsPage } from './pages/DetailsPage/DetailsPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":phoneId" element={<DetailsPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":tabletId" element={<DetailsPage />} />
        </Route>

        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":accessoryId" element={<DetailsPage />} />
        </Route>

        <Route path="cart" element={<CartPage />} />

        <Route path="favorites" element={<FavoritesPage />} />

        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Route>
    </Routes>
  </HashRouter>
);
