import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/results/Results';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/results" element={<Results />} />
        <Route exact path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );