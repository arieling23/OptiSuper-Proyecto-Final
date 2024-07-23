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
        <h1>¡Registro Exitoso!</h1>
        <p>Tu cuenta ha sido creada exitosamente.</p>
        <p><a href="/login">Haz clic aquí para iniciar sesión.</a></p>
        <button onClick={handleBackToHome} className="back-to-home">Volver a la Página Principal</button>
      </div>
    </div>
  );
};

export default Success;