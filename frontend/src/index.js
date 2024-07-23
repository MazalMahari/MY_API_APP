 
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx'; 
import './index.css';
import './App.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
