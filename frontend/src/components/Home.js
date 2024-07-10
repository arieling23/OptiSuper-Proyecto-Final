import React from 'react';
import Banner from './Banner';
import Services from './Services';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <Services />
      {/* Elimina el Footer de aquí */}
    </div>
  );
}

export default Home;
