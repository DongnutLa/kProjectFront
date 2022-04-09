import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '@components/global/Sidebar';
import Login from '@containers/Login';
import Signup from '@containers/Signup';
import AuthContext from '@context/AuthContext';
import ModalContext from '@context/ModalContext';

import '@styles-components/Header.scss';

import logo from '@icons/kpopColor.png';
import menu from '@icons/menu.svg';

const Header = () => {
  const navigate = useNavigate();

  const { deleteAuthData, userData, isAuthenticated, userPermissions } = useContext(AuthContext);
  const { modalState, toggleLogin, toggleSignup } = useContext(ModalContext);

  const [menuState, setMenuState] = useState(false);

  const onLogout = () => {
    deleteAuthData();
    navigate('/');
  }

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-item__left">
            <img src={logo} alt="logo"/>
            <ul>
              <li onClick={() => navigate('/')}><a>Inicio</a></li>
              {userPermissions.includes('VIEW_GROUPS') &&
                <li onClick={() => navigate('/groups')}><a>Grupos</a></li>
              }
              {userPermissions.includes('VIEW_EXCHANGES') &&
                <li onClick={() => navigate('/exchange')}><a>Intercambios</a></li>
              }
              {/* <li onClick={() => navigate('/store')}><a>Ventas</a></li> */}
            </ul>
          </div>
          <ul className="navbar-item__right">
              {!isAuthenticated && (
                <>
                  <li onClick={() => toggleLogin()}><a>Login</a></li>
                  <li onClick={() => toggleSignup()}><a>Signup</a></li>
                </>
              )}
              {isAuthenticated && (
                <>
                  <li><a>{userData.username}</a></li>
                  <li><a href="" onClick={onLogout}>Logout</a></li>
                </>
              )}
          </ul>
          <div className="navbar-item__menu">
              <a href="#" onClick={() => setMenuState(!menuState)}>
                <img src={menu} alt="Main menu"/>
              </a>
          </div>
        </nav>
      </header>
      {menuState && <Sidebar />}
      {modalState.loginModal && <Login />}
      {modalState.signupModal && <Signup />}
    </>
  );
}

export default Header;