import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/results/Results';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/AdopteLeSolaire" element={<Home />} />
        <Route path="/AdopteLeSolaire/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
