import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contacta con Nosotros</h1>
      <p>Nos encantaría saber de ti. Completa el formulario a continuación o utiliza la información de contacto para llegar a nosotros.</p>
      
      <div className="contact-info">
        <h2>Información de Contacto</h2>
        <p><strong>Dirección:</strong> Calle Falsa 123, Ciudad, País</p>
        <p><strong>Teléfono:</strong> +1 234 567 890</p>
        <p><strong>Email:</strong> contacto@nuestraempresa.com</p>
      </div>

      <form className="contact-form">
        <label>
          Nombre:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Mensaje:
          <textarea name="message" required></textarea>
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;
