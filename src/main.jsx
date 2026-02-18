import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Homepage from './Homepage.jsx'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        {/*<Route path="/" element={<Navigate to="/000000/ffffff" replace />} />*/}
        <Route path="/" element={<Homepage />} />
        <Route path="/:textColor/:backgroundColor" element={<App />} />
        <Route path="/contrast-checker" element={<Navigate to="/000000/ffffff" replace />} />
        <Route path="/contrast-checker/:textColor/:backgroundColor" element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
