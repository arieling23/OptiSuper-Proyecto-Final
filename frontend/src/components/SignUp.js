import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import './SignUp.css';
import logo from '../images/logo4.png';

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
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
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
        setError('El registro falló. Por favor, inténtalo de nuevo.');
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
        <h2>Regístrate</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="checkbox-container">
            <input type="checkbox" />
            <span>
              Al registrarme, estoy de acuerdo con los <button type="button" className="link-button">Términos de uso</button> y la <button type="button" className="link-button">Política de privacidad</button>
            </span>
          </div>
          <button type="submit" className="signup-button">Regístrate</button>
        </form>
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
        <button onClick={handleBackToHome} className="back-to-home">Volver a la página principal</button>
      </div>
    </div>
  );
};

export default SignUp;
