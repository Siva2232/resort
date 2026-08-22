import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const loader = document.getElementById('app-loader');
if (loader) {
  loader.classList.add('is-hidden');
  loader.addEventListener('transitionend', () => loader.remove(), { once: true });
}
