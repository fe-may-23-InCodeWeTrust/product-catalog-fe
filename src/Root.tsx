import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { CartPage } from './pages/CartPage/CartPage';
import { DetailsPage } from './pages/DetailsPage/DetailsPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { HomePage } from './pages/HomePage/HomePage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { NotFoundPage } from './components/NotFoundPage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />

        <Route path="phones">
          <Route index element={<CatalogPage />} />
          <Route path=":phoneId" element={<DetailsPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<CatalogPage />} />
          <Route path=":tabletId" element={<DetailsPage />} />
        </Route>

        <Route path="accessories">
          <Route index element={<CatalogPage />} />
          <Route path=":accessoryId" element={<DetailsPage />} />
        </Route>

        <Route path="cart" element={<CartPage />} />

        <Route path="favorites" element={<FavoritesPage />} />

        <Route path="contacts" element={<ContactsPage />} />

      </Route>
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);
