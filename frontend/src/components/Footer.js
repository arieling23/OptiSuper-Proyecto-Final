import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <img src={require('../images/logo1.jpg')} alt="Logo" />
          <p>OPTISUPER</p>
        </div>
        <div className="footer-section">
          <h4>Product</h4>
          <p>Términos y Condiciones</p>
          <p>Política de Privacidad</p>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <p>Blog</p>
          <p>User guides</p>
          <p>Webinars</p>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <p>About</p>
          <p>Join us</p>
        </div>
        <div className="footer-section">
          <h4>Subscribe to our newsletter</h4>
          <input type="email" placeholder="Input your email" />
          <button>Subscribe</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Brand, Inc. • Privacy • Terms • Sitemap</p>
      </div>
    </footer>
  );
}

export default Footer;
