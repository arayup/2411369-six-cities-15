import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import './polyfills';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from './services/token';
import { userActions } from './store/slice/user';

store.dispatch(getToken() ? userActions.checkAuthorization() : userActions.setUnAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-center" />
      <App />
    </Provider>
  </React.StrictMode>
);
