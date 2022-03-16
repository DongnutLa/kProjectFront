import React from 'react';
import '@styles-components/Footer.scss';

import fb from '@icons/fb.svg';
import tw from '@icons/tw.svg';
import ig from '@icons/ig.svg';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <div className="footer-links__main">
          <h4>Sitio</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/news">Noticias</a></li>
            <li><a href="/exchanges">Intercambios</a></li>
            <li><a href="/store">Ventas</a></li>
          </ul>
        </div>
        <div className="footer-links__about">
          <h4>Información</h4>
          <ul>
            <li><a href="">Acerca de</a></li>
            <li><a href="">Términos y condiciones</a></li>
            <li><a href="">Política de privacidad</a></li>
            <li><a href="">Uso de Cookies</a></li>
          </ul>
        </div>
        <div className="footer-links__description">
          <h4>K-Project</h4>
          <p>Intercambia, compra y vende mercancía de K-Pop</p>
          <p>Entérate de las últimas noticias</p>
        </div>
      </div>
      <div className="footer-networks">
        <div className="footer-networks__fb"><a href=""><img src={fb}/></a></div>
        <div className="footer-networks__tw"><a href=""><img src={tw} alt="Twitter"/></a></div>
        <div className="footer-networks__ig"><a href=""><img src={ig} alt="Instagram"/></a></div>
      </div>
      <div className="footer-text"><span>K-Project &copy; 2022</span></div>
    </footer>
  );
}

export default Footer;