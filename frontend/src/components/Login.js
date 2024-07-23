import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { AuthContext } from '../context/AuthContext';
import './Login.css';
import logo from '../images/logo4.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    try {
      const userData = await loginUser(username, password);
      login(userData);
      navigate('/optimize');
    } catch (error) {
      if (error.response && error.response.data) {
        setError('Error en el inicio de sesión. Por favor, inténtalo de nuevo.');
      } else {
        setError('Error en el inicio de sesión. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo de OptiSuper" className="login-logo" />
        <h1>Iniciar sesión</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Nombre de usuario
            <input
              type="text"
              name="username"
              placeholder="Ingresa tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Iniciar sesión</button>
        </form>
        <a href="/reset_password" className="forgot-password-link">¿Olvidaste tu contraseña?</a>
        <p>¿No tienes una cuenta? <a href="/signup">Regístrate</a></p>
        
        <button onClick={handleBackToHome} className="back-to-home">Volver a la página principal</button>
      </div>
    </div>
  );
};

export default Login;