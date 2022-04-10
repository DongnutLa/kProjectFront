import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Sidebar from '@components/global/Sidebar';
import Login from '@containers/Login';
import Signup from '@containers/Signup';
import AuthContext from '@context/AuthContext';
import ModalContext from '@context/ModalContext';

import '@styles-components/Header.scss';

import logo from '@icons/kpopColor.png';
import menu from '@icons/menu.svg';

const Header = () => {
  const { t, i18n } = useTranslation(['home']);
  const navigate = useNavigate();

  const { deleteAuthData, userData, isAuthenticated, userPermissions } = useContext(AuthContext);
  const { modalState, toggleLogin, toggleSignup } = useContext(ModalContext);

  const [menuState, setMenuState] = useState(false);

  const onLogout = () => {
    deleteAuthData();
    navigate('/');
  }

  const changeLanguage = () => {
    switch (i18n.language) {
      case 'en':
        i18n.changeLanguage('es');
        break;
      case 'es-US':
      case 'es':
        i18n.changeLanguage('en');
      default:
        break;
    }
  }

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-item__left">
            <img src={logo} alt="logo"/>
            <ul>
              <li onClick={() => navigate('/')}><a>{t('header.home')}</a></li>
              {userPermissions.includes('VIEW_GROUPS') &&
                <li onClick={() => navigate('/groups')}><a>{t('header.groups')}</a></li>
              }
              {userPermissions.includes('VIEW_EXCHANGES') &&
                <li onClick={() => navigate('/exchange')}><a>{t('header.exchanges')}</a></li>
              }
              {/* <li onClick={() => navigate('/store')}><a>Ventas</a></li> */}
            </ul>
          </div>
          <ul className="navbar-item__right">
              {!isAuthenticated && (
                <>
                  <li onClick={() => toggleLogin()}><a>{t('header.login')}</a></li>
                  <li onClick={() => toggleSignup()}><a>{t('header.signup')}</a></li>
                </>
              )}
                <li onClick={changeLanguage}><a>{i18n.language}</a></li>
              {isAuthenticated && (
                <>
                  <li><a>{userData.username}</a></li>
                  <li><a href="" onClick={onLogout}>{t('header.logout')}</a></li>
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