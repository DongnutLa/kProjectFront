import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Login from '@containers/Login';
import Signup from '@containers/Signup';
import ModalContext from '@context/ModalContext';
import AuthContext from '@context/AuthContext';

import '@styles-components/Sidebar.scss';

const Sidebar = () => {
  const navigate = useNavigate();

  const { deleteAuthData, userData, isAuthenticated, userPermissions } = useContext(AuthContext);
  const { toggleLogin, toggleSignup, modalState } = useContext(ModalContext);

  const onLogout = () => {
    deleteAuthData();
    navigate('/');
  }

  return (
    <>
      <div className="sidebar">
        <ul className="sidebar__up">
          <li><a onClick={() => navigate('/')}>Inicio</a></li>
          {userPermissions.includes('VIEW_GROUPS') &&
            <li><a onClick={() => navigate('/groups')}>Grupos</a></li>
          }
          {userPermissions.includes('VIEW_EXCHANGES') &&
            <li><a onClick={() => navigate('/exchange')}>Intercambios</a></li>
          }
          {/* <li><a onClick={() => navigate('/store')}>Ventas</a></li> */}
        </ul>
        <ul className="sidebar__down">
          {!isAuthenticated && (
            <>
              <li><a onClick={() => toggleLogin()}>Login</a></li>
              <li><a onClick={() => toggleSignup()}>Signup</a></li>
            </>
          )}
          {isAuthenticated && (
            <>
              <li><a href="#">{userData.username}</a></li>
              <li><a href="" onClick={onLogout}>Logout</a></li>
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