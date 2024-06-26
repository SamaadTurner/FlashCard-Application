import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './Auth0ProviderWithHistory';

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <Router>
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>
  </Router>
);
