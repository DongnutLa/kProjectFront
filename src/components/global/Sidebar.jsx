import React from 'react';

import '@styles-components/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar__up">
        <li><a href="">Inicio</a></li>
        <li><a href="">Noticias</a></li>
        <li><a href="">Intercambios</a></li>
        <li><a href="">Ventas</a></li>
      </ul>
      <ul className="sidebar__down">
        <li><a href="">Login</a></li>
        <li><a href="">Signup</a></li>
        <li><a href="">Logout</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;