import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import initI18n from './lib/i18n/i18n';
import { setupStore } from './store';

const runApp = async () => {
  await initI18n();

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={setupStore()}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default runApp;
