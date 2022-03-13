import React from 'react';
import '@styles-components/Header.scss';

import logo from '@icons/kpopColor.png';
import menu from '@icons/menu.svg';

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-item__left">
          <img src={logo} alt="logo"/>
          <ul>
            <li><a href="">Inicio</a></li>
            <li><a href="">Noticias</a></li>
            <li><a href="">Intercambios</a></li>
            <li><a href="">Ventas</a></li>
          </ul>
        </div>
        <ul className="navbar-item__right">
            <li><a href="">Login</a></li>
            <li><a href="">Signup</a></li>
            <li><a href="">Logout</a></li>
        </ul>
        <div className="navbar-item__menu">
            <a href=""><img src={menu} alt="Main menu"/></a>
        </div>
      </nav>
    </header>
  );
}

export default Header;