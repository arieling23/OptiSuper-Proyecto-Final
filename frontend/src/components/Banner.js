import React from 'react';
import './Banner.css'; // Asegúrate de crear y ajustar este archivo CSS según sea necesario

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-text">
        <h1>OPTIMIZA TUS PRECIOS CON INTELIGENCIA ARTIFICIAL</h1>
      </div>
      <div className="banner-image">
        <img src={require('../images/Image2.jpg')} alt="Inteligencia Artificial" />
      </div>
    </div>
  );
}

export default Banner;
