import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Success.css';

const Success = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="success-container">
      <div className="success-message">
        <h1>Registration Successful!</h1>
        <p>Your account has been created successfully.</p>
        <p><a href="/login">Click here to login.</a></p>
        <button onClick={handleBackToHome} className="back-to-home">Back to Home</button>
      </div>
    </div>
  );
};

export default Success;
