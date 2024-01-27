import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import '@styles/main.scss';
import { Provider } from 'react-redux';
import store from '@store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
