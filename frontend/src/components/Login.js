import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import { loginUser } from '../api'; // Asegúrate de que la ruta sea correcta
import './Login.css';
import logo from '../images/logo1.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Utiliza useNavigate para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      // Puedes redirigir al usuario a otra página o mostrar un mensaje de éxito aquí
    } catch (error) {
      // Maneja el error (por ejemplo, mostrar un mensaje de error)
    }
  };

  const handleBackToHome = () => {
    navigate('/'); // Navega a la página de inicio
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="OptiSuper Logo" className="login-logo" />
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="example.email@gmail.com"
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
              placeholder="Enter at least 8+ characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            <input type="checkbox" name="remember" />
            Remember me
          </label>
          <button type="submit">Sign in</button>
        </form>
        <a href="/forgot-password">Forgot password?</a>
        <p>Or sign in with</p>
        <div className="social-login">
          <button className="google">G</button>
          <button className="facebook">f</button>
          <button className="apple"></button>
        </div>
        <button onClick={handleBackToHome} className="back-to-home">Back to Home</button>
      </div>
      <div className="login-image">
        <img src={require('../images/machinelearning.jpg')} alt="Happy customer" />
      </div>
    </div>
  );
};

export default Login;
