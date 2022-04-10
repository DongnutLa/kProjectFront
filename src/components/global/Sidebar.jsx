import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Login from '@containers/Login';
import Signup from '@containers/Signup';
import ModalContext from '@context/ModalContext';
import AuthContext from '@context/AuthContext';

import '@styles-components/Sidebar.scss';

const Sidebar = () => {
  const { t, i18n } = useTranslation(['home']);
  const navigate = useNavigate();

  const { deleteAuthData, userData, isAuthenticated, userPermissions } = useContext(AuthContext);
  const { toggleLogin, toggleSignup, modalState } = useContext(ModalContext);

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
      <div className="sidebar">
        <ul className="sidebar__up">
          <li><a onClick={() => navigate('/')}>{t('header.home')}</a></li>
          {userPermissions.includes('VIEW_GROUPS') &&
            <li><a onClick={() => navigate('/groups')}>{t('header.groups')}</a></li>
          }
          {userPermissions.includes('VIEW_EXCHANGES') &&
            <li><a onClick={() => navigate('/exchange')}>{t('header.exchanges')}</a></li>
          }
          {/* <li><a onClick={() => navigate('/store')}>Ventas</a></li> */}
        </ul>
        <ul className="sidebar__down">
          {!isAuthenticated && (
            <>
              <li><a onClick={() => toggleLogin()}>{t('header.login')}</a></li>
              <li><a onClick={() => toggleSignup()}>{t('header.signup')}</a></li>
            </>
          )}
            <li onClick={changeLanguage}><a>{i18n.language}</a></li>
          {isAuthenticated && (
            <>
              <li><a href="#">{userData.username}</a></li>
              <li><a href="" onClick={onLogout}>{t('header.logout')}</a></li>
            </>
          )}
        </ul>
      </div>
      {modalState.loginModal && <Login />}
      {modalState.signupModal && <Signup />}
    </>
  );
}

export default Sidebar;