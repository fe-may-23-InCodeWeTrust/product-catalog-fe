import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Root } from './Root';
import { CatalogProvider } from './context/CatalogContext';
import './localization/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CatalogProvider>
        <Root />
      </CatalogProvider>
    </Provider>
  </React.StrictMode>,
);
