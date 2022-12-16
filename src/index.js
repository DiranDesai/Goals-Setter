import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { GlobalProvider, globalContext } from './context/GlobalState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);

