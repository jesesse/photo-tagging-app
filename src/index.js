import React from 'react';
import ReactDOM from 'react-dom/client';
import { firebaseConfig } from './firebase.config';
import { initializeApp } from "firebase/app";
import RouteSwitch from './RouteSwitch';
import './styles/main.css'

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouteSwitch app={app} />
  </React.StrictMode>
);

