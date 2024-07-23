import React, { useState } from 'react';
import { predictSales } from '../api';
import './SalesPrediction.css';

const SalesPrediction = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePredict = async () => {
    if (!file) {
      setError("Por favor, sube un archivo Excel.");
      return;
    }
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('periodo_prediccion', 30);
    try {
      const response = await predictSales(formData);
      setPrediction(response.interpretacion);
    } catch (error) {
      console.error('Error predicting sales:', error);
      setError(error.response?.data?.error || 'Hubo un error al realizar la predicción. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const renderPredictionResults = () => {
    if (!prediction) return null;

    // Asumiendo que la respuesta viene en formato de texto, la dividimos en secciones
    const sections = prediction.split('###').filter(section => section.trim());

    return (
      <div className="sales-prediction-results">
        <h2>Resultados de la Predicción:</h2>
        {sections.map((section, index) => {
          const [title, ...content] = section.split(':');
          return (
            <section key={index} className="result-section">
              <h3>{title.trim()}</h3>
              <div>{content.join(':').trim()}</div>
            </section>
          );
        })}
      </div>
    );
  };

  return (
    <div className="sales-prediction-container">
      <h1 className="sales-prediction-title">Predicción de Ventas</h1>
      <p className="description">
        Sube un archivo Excel con los datos históricos de ventas para recibir una predicción detallada para los próximos 30 días.
        El archivo debe contener las columnas "fecha" y "ventas". Nuestra herramienta de predicción utiliza técnicas avanzadas de
        análisis de series temporales para proporcionar un pronóstico preciso y recomendaciones útiles.
      </p>
      <div className="sales-prediction-form">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button onClick={handlePredict} disabled={loading}>
          {loading ? 'Prediciendo...' : 'Predecir Ventas'}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {renderPredictionResults()}
    </div>
  );
};

export default SalesPrediction;
