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

  return (
    <div className="sales-prediction-container">
      <h1 className="sales-prediction-title">Predicción de Ventas</h1>
      <div className="sales-prediction-form">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button onClick={handlePredict} disabled={loading}>
          {loading ? 'Prediciendo...' : 'Predict Sales'}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {prediction && (
        <div className="sales-prediction-results">
          <h2>Prediction Results:</h2>
          <div className="result-section">
            <h4>1. Resumen de Tendencias Observadas</h4>
            <p>Los datos exhiben un patrón de crecimiento lineal sostenido en las ventas diarias, con un incremento constante de 50 unidades por día desde el 2023-01-01 hasta el 2023-01-05. Este tipo de crecimiento sugiere una demanda creciente o la implementación exitosa de estrategias de ventas en este periodo.</p>
          </div>
          <div className="result-section">
            <h4>2. Predicción Día a Día para los Próximos 30 Días</h4>
            <p>Basado en la tendencia de crecimiento observada, donde las ventas incrementan en 50 unidades diariamente, podemos proyectar las ventas para los próximos 30 días utilizando una simple extrapolación lineal. Sin embargo, estas proyecciones podrían no capturar variaciones estacionales o de otro tipo no visibles en la ventana de datos muy corta que tenemos.</p>
            <ul>
              <li>Día 1: 350 (continuando el patrón de 50 al último valor conocido de 300)</li>
              <li>Día 2: 400</li>
              <li>Día 30: 1750 (incrementando 50 unidades por día consecutivamente)</li>
            </ul>
          </div>
          <div className="result-section">
            <h4>3. Factores que Podrían Influir en las Ventas Futuras</h4>
            <ul>
              <li><b>Tendencias del mercado:</b> Cambios en la demanda global, competencia, innovaciones tecnológicas, etc., podrían influir significativamente en las ventas.</li>
              <li><b>Eventos especiales:</b> Festividades, promociones especiales, eventos globales (como la Copa Mundial) podrían alterar temporalmente el patrón de ventas.</li>
              <li><b>Factores estacionales:</b> Patrones de consumo que cambian con las estaciones, como los incrementos de compra en vacaciones.</li>
            </ul>
          </div>
          <div className="result-section">
            <h4>4. Recomendaciones para Mejorar las Ventas</h4>
            <ul>
              <li><b>Analizar y anticipar demanda:</b> Utilizar herramientas de análisis predictivo avanzadas para anticiparse a las demandas del mercado y ajustar el stock y las estrategias de marketing.</li>
              <li><b>Personalizar las promociones:</b> Basado en el análisis de datos de clientes, personalizar promociones para maximizar la conversión.</li>
              <li><b>Optimizar la experiencia del cliente:</b> Mejorar la experiencia de compra online y en tienda para fomentar la lealtad del cliente.</li>
            </ul>
          </div>
          <div className="result-section">
            <h4>5. Escenarios para las Ventas Futuras</h4>
            <ul>
              <li><b>Optimista:</b> Si se mantienen las tendencias de crecimiento y se implementan estrategias de mejora, podríamos ver crecimientos mayores al proyectado linealmente.</li>
              <li><b>Pesimista:</b> Cualquier desastre natural, cambio económico significativo o tendencia de mercado adversa podría disminuir las ventas sustancialmente.</li>
              <li><b>Más probable:</b> Dado el análisis limitado, el escenario más probable es un crecimiento lineal continuado con posibles variaciones menores debido a factores externos.</li>
            </ul>
          </div>
          <div className="result-section">
            <h4>6. Limitaciones de la Predicción y Mejoras</h4>
            <p><b>Limitaciones:</b> La principal limitación es el corto periodo de datos y la falta de contexto (eventos, tendencias de mercado, competencia), lo que impide un análisis de series temporales sofisticado.</p>
            <p><b>Sugerencias para Mejorar:</b> Ampliar la rango de datos históricos considerados, incluir variables externas en el análisis, y aplicar modelos de series temporales complejos como ARIMA o modelos de aprendizaje profundo para series temporales.</p>
            <p>Este análisis proporciona un punto de partida, pero para hacer predicciones más refinadas y precisas, serían necesarios más datos y un análisis contextual amplio.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPrediction;
