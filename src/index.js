import React from 'react';
import ReactDOM from 'react-dom/client';
import './config/i18next-config';
import App from './routes/App';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);