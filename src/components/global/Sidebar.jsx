import React, { useState } from 'react';

import Login from '@containers/Login';
import Signup from '@containers/Signup';

import '@styles-components/Sidebar.scss';

const Sidebar = () => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleSignup, setToggleSignup] = useState(false);

  const handleToggleLogin = () => {
    setToggleLogin(!toggleLogin);
  }
  const handleToggleSignup = () => {
    setToggleSignup(!toggleSignup);
  }

  return (
    <>
      <div className="sidebar">
        <ul className="sidebar__up">
          <li><a href="/">Inicio</a></li>
          <li><a href="/news">Noticias</a></li>
          <li><a href="/exchange">Intercambios</a></li>
          <li><a href="/store">Ventas</a></li>
        </ul>
        <ul className="sidebar__down">
          <li onClick={handleToggleLogin}><a href="#">Login</a></li>
          <li onClick={handleToggleSignup}><a href="#">Signup</a></li>
          <li><a href="">Logout</a></li>
        </ul>
      </div>
      {toggleLogin && <Login />}
      {toggleSignup && <Signup />}
    </>
  );
}

export default Sidebar;