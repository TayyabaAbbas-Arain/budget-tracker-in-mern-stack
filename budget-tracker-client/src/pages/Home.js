import React from 'react';
import '../styles/Home.css';

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Budget Tracker 💸</h1>
        <p className="hero-subtitle">
          Track your income and expenses. Make smarter financial decisions.
        </p>
        <div className="hero-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/register" className="btn register-btn">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
