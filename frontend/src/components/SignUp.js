import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import './SignUp.css';
import logo from '../images/logo1.jpg';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await registerUser(username, firstName, lastName, email, password, confirmPassword);
      navigate('/success');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data.errors;
        const errorMessage = Object.keys(errorData).map(key => {
          const messages = Array.isArray(errorData[key]) ? errorData[key].map(item => item.message) : [errorData[key].message];
          return `${key}: ${messages.join(' ')}`;
        }).join(', ');
        setError(errorMessage);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <img src={logo} alt="Logo" className="signup-logo" />
        <h2>Sign up</h2>
        {error && <div className="error">{error}</div>}
        <button className="social-button google">Sign up with Google</button>
        <button className="social-button facebook">Sign up with Facebook</button>
        <button className="social-button apple">Sign up with Apple</button>
        <div className="divider">OR</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="checkbox-container">
            <input type="checkbox" />
            <span>
              By signing up, I agree with the <button type="button" className="link-button">Terms of Use</button> & <button type="button" className="link-button">Privacy Policy</button>
            </span>
          </div>
          <button type="submit" className="signup-button">Sign up</button>
        </form>
        <p>Already have an account? <a href="/login">Sign in</a></p>
        <button onClick={handleBackToHome} className="back-to-home">Back to Home</button>
      </div>
      <div className="signup-image">
        <img src="path_to_your_image.jpg" alt="Happy customer" />
      </div>
    </div>
  );
};

export default SignUp;
