import React, { useRef } from 'react';
import '@styles-containers/Auth.scss';
import '@styles-utils/buttons.scss';

import useAuth from '@hooks/useAuth';

import kpopColor from '@icons/kpopColor.png';
import axios from 'axios';

const API = 'http://localhost:3000/api/v1/auth/login';

const Login = () => {
  const form = useRef(null);

  const handleSubmit = (event) => {
    const formData = new FormData(form.current);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    }
    axios.post(API, data).then(res => {
      console.log('Response: ', res.data);
    });
    /* const response = useAuth(API, data);
    console.log(response); */
  }

  return (
    <section className="modal">
        <div className="modal-form">
            <div className="form-container">
                <span>X</span>
                <img src={kpopColor} alt="Logo K-project"/>
                <form action="" ref={form}>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input type="text" name="username" id="username"/>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" id="password"/>
                    <button className="button btn-primary" 
                      type="button" 
                      onClick={handleSubmit}>
                        Iniciar sesión</button>
                    <span>¿No tienes cuenta?, <a href="">¡Crea una!</a></span>
                </form>
            </div>
        </div>
    </section>
  );
}

export default Login;