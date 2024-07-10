import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import { registerUser } from '../api'; // Asegúrate de que la ruta sea correcta
import './SignUp.css';
import logo from '../images/logo1.jpg';

const SignUp = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Utiliza useNavigate para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    try {
      await registerUser(first_name, last_name, email, password);
      // Puedes redirigir al usuario a otra página o mostrar un mensaje de éxito aquí
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleBackToHome = () => {
    navigate('/'); // Navega a la página de inicio
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
              placeholder="First name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              value={last_name}
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
          <div className="checkbox-container">
            <input type="checkbox" />
            <span>
              By signing up, I agree with the <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a>
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
