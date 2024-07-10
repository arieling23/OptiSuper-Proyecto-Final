import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services">
      <h2>Descubre cómo nuestra solución puede ayudarte a maximizar tus ingresos</h2>
      <div className="services-content">
        <img src={require('../images/Image3.jpg')} alt="Service" />
        <div className="services-details">
          <div className="service-item">
            <h3>Ventajas de Servicios</h3>
            <p>- Ahorro de costos<br />- Aumento de ventas</p>
          </div>
          <div className="service-item">
            <h3>Testimonios de usuarios</h3>
            <p>Desde que comenzamos a utilizar la aplicación de optimización de precios basada en IA, hemos visto un incremento significativo en nuestras ventas y una reducción en los costos operativos.</p>
            <p>– Joseph Bennett, Jul 27, 2022</p>
          </div>
          <div className="service-item">
            <h3>Casos de Éxito</h3>
            <p>Implementamos nuestro software en un negocio y en solo tres meses logramos aumentar nuestras ventas en un 20% y reducir los costos de inventario en un 15%.</p>
            <p>La inteligencia artificial nos permitió ajustar precios de manera dinámica, respondiendo rápidamente a las tendencias del mercado y mejorando la satisfacción del cliente.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
