import React from 'react';
import '@styles-containers/About.scss';

import exchange from '@img/exchange.png';
import buy from '@img/buy.png';
import news from '@img/news.png';

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-img"><img src={exchange} alt="intercambios"/></div>
        <div className="about-text">
          <h3>¡Intercambia!</h3>
          <p>Puedes intercambiar mercancía de K-Pop, encontrar esa photocard que has buscado hace tiempo</p>
          <a href=""><p>Entrar!</p></a>
        </div>
      </div>

      <div className="about-container">
        <div className="about-text">
          <h3>¡Vende!</h3>
          <p>Puedes poner en venta esa mercancía de k-pop y comprar eso que has estado buscando</p>
          <a href=""><p>Entrar!</p></a>
        </div>
        <div className="about-img"><img src={buy} alt="intercambios"/></div>
      </div>

      <div className="about-container">
        <div className="about-img"><img src={news} alt="intercambios"/></div>
        <div className="about-text">
          <h3>¡Entérate!</h3>
          <p>Habrá noticias relacionadas al mundo del K-pop y más!</p>
          <a href=""><p>Entrar!</p></a>
        </div>
      </div>
    </section>
  );
}

export default About;