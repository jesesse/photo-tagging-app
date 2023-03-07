import React from 'react';
import ReactDOM from 'react-dom/client';

import { firebaseConfig } from './firebase.config';
import { initializeApp } from "firebase/app";

import App from './App';

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App app={app} />
  </React.StrictMode>
);

