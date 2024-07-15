// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { AuthContext } from '../context/AuthContext';
import './Login.css';
import logo from '../images/logo1.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('All fields are required.');
      return;
    }
    try {
      const userData = await loginUser(username, password);
      login(userData);
      navigate('/optimize');
    } catch (error) {
      if (error.response && error.response.data) {
        setError('Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="OptiSuper Logo" className="login-logo" />
        <h1>Sign in</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Sign in</button>
        </form>
        <a href="/reset_password">Forgot password?</a>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
        <div className="social-login">
          <button className="google">G</button>
          <button className="facebook">f</button>
          <button className="apple"></button>
        </div>
        <button onClick={handleBackToHome} className="back-to-home">Back to Home</button>
      </div>
      <div className="login-image">
        <img src="path_to_your_image.jpg" alt="Happy customer" />
      </div>
    </div>
  );
};

export default Login;
