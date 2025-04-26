import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/scss/custom.scss';
import './assets/js/bootstrap.bundle.min.js';
import './assets/css/style.css'
import './assets/css/swiper-bundle.min.css'
import './assets/js/swiper-bundle.min.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);