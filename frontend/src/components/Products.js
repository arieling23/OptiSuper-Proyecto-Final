import React from 'react';
import './Products.css';

const Products = () => {
  return (
    <div className="products">
      <h1>Nuestros Productos</h1>
      <div className="product-grid">
        <div className="product-card">
          <h2>Optimización de Precios con IA</h2>
          <p>Maximiza tus ingresos ajustando dinámicamente los precios de tus productos con nuestro avanzado sistema de inteligencia artificial. Nuestra tecnología analiza múltiples factores para recomendar los precios óptimos en tiempo real.</p>
        </div>
        <div className="product-card">
          <h2>Chatbot para Recomendaciones</h2>
          <p>Ofrece a tus clientes una experiencia personalizada con nuestro chatbot inteligente. Nuestro chatbot recomienda productos basados en las preferencias y comportamientos de tus clientes, mejorando la satisfacción y las ventas.</p>
        </div>
        <div className="product-card">
          <h2>Análisis Predictivo de Ventas</h2>
          <p>Nuestro servicio de Análisis Predictivo de Ventas utiliza avanzados algoritmos de inteligencia artificial y machine learning para proporcionar a tu negocio predicciones precisas sobre las tendencias futuras de ventas.</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
