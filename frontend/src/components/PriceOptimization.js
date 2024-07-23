import React, { useState } from 'react';
import axios from 'axios';
import './PriceOptimization.css';

const PriceOptimization = () => {
  const [formData, setFormData] = useState({
    marca: '',
    procesador: '',
    memoria_ram: '',
    almacenamiento: '',
    tamano_pantalla: '',
    grafica: '',
    sistema_operativo: '',
    condicion: ''
  });

  const [optimizedPrice, setOptimizedPrice] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOptimize = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.post('http://127.0.0.1:8000/myapp/predict-price/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setOptimizedPrice(response.data.predicted_price);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error optimizing price:', error);
      setError(`Error optimizing price: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="price-optimization-container">
      <h1>Precio Estimado</h1>
      <p className="description">
        Complete el formulario a continuación con las especificaciones de su producto para obtener un precio estimado basado en nuestras capacidades avanzadas de inteligencia artificial.
      </p>
      <div className="optimization-form-container">
        <form onSubmit={handleOptimize} className="optimization-form">
          <div className="form-row">
            <div className="form-column">
              <label>
                Marca
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Procesador
                <input
                  type="text"
                  name="procesador"
                  value={formData.procesador}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Memoria RAM (GB)
                <input
                  type="text"
                  name="memoria_ram"
                  value={formData.memoria_ram}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Almacenamiento (GB)
                <input
                  type="text"
                  name="almacenamiento"
                  value={formData.almacenamiento}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-column">
              <label>
                Tamaño de Pantalla (pulgadas)
                <input
                  type="text"
                  name="tamano_pantalla"
                  value={formData.tamano_pantalla}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Gráfica
                <input
                  type="text"
                  name="grafica"
                  value={formData.grafica}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Sistema Operativo
                <input
                  type="text"
                  name="sistema_operativo"
                  value={formData.sistema_operativo}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Condición
                <input
                  type="text"
                  name="condicion"
                  value={formData.condicion}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={`submit-button ${isLoading ? 'loading' : ''} ${isSuccess ? 'success' : ''} ${error ? 'error' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Optimizing...' : isSuccess ? 'Success!' : error ? 'Try Again' : 'Optimizar Precio'}
          </button>
        </form>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {optimizedPrice && (
          <div className="optimized-price" dangerouslySetInnerHTML={{ __html: optimizedPrice }}></div>
        )}
      </div>
    </div>
  );
};

export default PriceOptimization;