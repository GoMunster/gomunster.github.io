import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/DigitalNomadDaily';
import { DailyContentProvider } from './context/DailyContentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DailyContentProvider>
      <App />
    </DailyContentProvider>
  </React.StrictMode>
);
