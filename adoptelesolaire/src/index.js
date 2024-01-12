import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/results/Results';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/results" element={<Results />} />
    {/* La route suivante capture toutes les autres URL et redirige vers la page d'accueil */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
</BrowserRouter>
  );