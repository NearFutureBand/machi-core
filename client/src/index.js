import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.scss';
import App from './App';
import Navigator from "./navigation";
import { store } from "./redux-toolkit";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Navigator />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
