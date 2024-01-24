import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import AppRoutes from './routes/AppRoutes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
)

