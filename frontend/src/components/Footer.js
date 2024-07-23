import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section logo-section">
          <img src={require('../images/logo4.png')} alt="Logo" />
          <p>OptiPredict</p>
        </div>
        <div className="footer-section">
          <h4>Producto</h4>
          <p>Términos y Condiciones</p>
          <p>Política de Privacidad</p>
        </div>
        <div className="footer-section">
          <h4>Recursos</h4>
          <p>Blog</p>
          <p>Guías de Usuario</p>
          <p>Webinars</p>
        </div>
        <div className="footer-section">
          <h4>Compañía</h4>
          <p>Acerca de</p>
          <p>Únete a nosotros</p>
        </div>
        <div className="footer-section">
          <h4>Suscríbete a nuestro boletín</h4>
          <input type="email" placeholder="Introduce tu correo" />
          <button>Suscribirse</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 OPTIPREDICT, Inc. • Privacidad • Términos • Mapa del Sitio</p>
      </div>
    </footer>
  );
}

export default Footer;
