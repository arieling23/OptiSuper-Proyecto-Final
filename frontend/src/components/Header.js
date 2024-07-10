// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../images/logo1.jpg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <span className="logo-text">OPTISUPER</span>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/contact">Contactos</Link></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/signup" className="signup-button">Sign Up</Link>
        <Link to="/login" className="signin-button">Sign in</Link>
      </div>
    </header>
  );
};

export default Header;
