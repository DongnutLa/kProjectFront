import React, { useState } from 'react';
import Sidebar from '@components/global/Sidebar';
import Login from '@containers/Login';
import Signup from '@containers/Signup';

import '@styles-components/Header.scss';

import logo from '@icons/kpopColor.png';
import menu from '@icons/menu.svg';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleSignup, setToggleSignup] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  }
  const handleToggleLogin = () => {
    setToggleLogin(!toggleLogin);
  }
  const handleToggleSignup = () => {
    setToggleSignup(!toggleSignup);
  }

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-item__left">
            <img src={logo} alt="logo"/>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/news">Noticias</a></li>
              <li><a href="/exchange">Intercambios</a></li>
              <li><a href="/store">Ventas</a></li>
            </ul>
          </div>
          <ul className="navbar-item__right">
              <li onClick={handleToggleLogin}><a href="#">Login</a></li>
              <li onClick={handleToggleSignup}><a href="#">Signup</a></li>
              <li><a href="#">Logout</a></li>
          </ul>
          <div className="navbar-item__menu">
              <a href="#" onClick={handleToggleMenu}>
                <img src={menu} alt="Main menu"/>
              </a>
          </div>
        </nav>
      </header>
      {toggleMenu && <Sidebar />}
      {toggleLogin && <Login />}
      {toggleSignup && <Signup />}
    </>
  );
}

export default Header;