import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import ModalContext from '@context/ModalContext';
import ToasterContext from '@context/ToasterContext';

import '@styles-containers/Auth.scss';
import '@styles-utils/buttons.scss';

import kpopColor from '@icons/kpopColor.png';

const URL = process.env.API;
const endpoint = 'auth/login'
const API = `${URL}${endpoint}`;

const Login = () => {
  const { types, setOpenToaster } = useContext(ToasterContext);
  const { saveAuthData, getAuthData, headerConfig } = useContext(AuthContext);
  const { toggleLogin } = useContext(ModalContext);
  const navigate = useNavigate();
  
  const form = useRef(null);

  const handleSubmit = (event) => {
    const formData = new FormData(form.current);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    }
    axios.post(API, data, headerConfig).then(res => {
      saveAuthData(res.data);
      navigate('/');
      getAuthData();
      toggleLogin();
    }).catch(err => {
      setOpenToaster({type: types.ERROR, content: 'Usuario o clave inválida'});
    });
  }

  return (
    <section className="modal">
      <div className="modal-form">
        <div className="form-container">
          <span onClick={() => toggleLogin()}>X</span>
          <img src={kpopColor} alt="Logo K-project"/>
          <form action="" ref={form}>
            <label htmlFor="username">Nombre de usuario</label>
            <input type="text" name="username" id="username"/>
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password"/>
            <button className="button btn-primary" 
              type="button" 
              onClick={handleSubmit}>
                Iniciar sesión
            </button>
            <span>¿No tienes cuenta?, <a href="">¡Crea una!</a></span>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;