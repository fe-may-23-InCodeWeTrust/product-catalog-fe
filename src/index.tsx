import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './Root';
import { CatalogProvider } from './context/CatalogContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <CatalogProvider>
      <Root />
    </CatalogProvider>
  </React.StrictMode>,
);
