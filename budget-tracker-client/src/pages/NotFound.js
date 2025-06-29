// src/pages/NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css'; // if separate styling, optional

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default NotFound;

// PROFESSIONAL
/*
import React from 'react';
import '../styles/NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Oops! Page Not Found</h2>
        <p className="notfound-message">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link to="/" className="notfound-button">Go Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
*/