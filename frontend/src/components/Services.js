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
            <h3>Predicción de Precios</h3>
            <p>OptiPredict ofrece una herramienta avanzada de Predicción de Precios que utiliza inteligencia artificial para determinar el precio óptimo de tus productos en el mercado. Aprovechando características específicas de cada producto, nuestra solución te ayuda a maximizar tus ingresos y asegurar que tus precios sean competitivos y atractivos para los clientes. Con Predicción de Precios de OptiPredict, puedes tomar decisiones informadas que incrementarán tus ventas y mejorarán tu rentabilidad, todo mientras ahorras tiempo y esfuerzo en análisis manuales.</p>
          </div>
          <div className="service-item">
            <h3>Predicción de Precio</h3>
            <p>Es una herramienta esencial para cualquier vendedor que desee anticipar la demanda y optimizar su inventario. Utilizando avanzadas técnicas de machine learning, nuestra herramienta analiza patrones históricos de ventas y factores externos para proporcionar predicciones precisas y confiables. Esto te permite planificar con anticipación, minimizar el riesgo de exceso de inventario o desabastecimiento y alinear tus estrategias de marketing y producción con las expectativas del mercado. Con Predicción de Ventas, estarás un paso adelante, asegurando que siempre estás preparado para satisfacer las demandas de tus clientes y maximizar tus oportunidades de ventas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
