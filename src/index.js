import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import AOS
import AOS from 'aos';
import { HelmetProvider } from 'react-helmet-async';
import 'aos/dist/aos.css';
import { Analytics } from '@vercel/analytics/react';

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: false,
  mirror: true,
  anchorPlacement: 'top-bottom',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Analytics />
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
