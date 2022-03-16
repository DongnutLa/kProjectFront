import React, { useRef } from 'react';
import axios from 'axios';

import '@styles-containers/Auth.scss';
import '@styles-utils/buttons.scss';

import kpopColor from '@icons/kpopColor.png';

const API = 'http://localhost:3000/api/v1/users';

const Signup = () => {
  const form = useRef(null);

  const handleSubmit = (event) => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      lastname: formData.get('lastname'),
      birthday: formData.get('birthday'),
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      //passwordConfirm: formData.get('password-confirm'),
      roleId: "1"
    }
    console.log(data);
    axios.post(API, data).then(res => {
      console.log('Response: ', res.data);
    });
  }

  return (
    <section className="modal">
      <div className="modal-form">
        <div className="form-container">
          <span>X</span>
          <img src={kpopColor} alt="Logo K-project"/>
          <form action="" ref={form}>
            <div className="form__fullname">
              <div>
                <label htmlFor="name">Nombres</label>
                <input type="text" name="name" id="name"/>
              </div>
              <div>
                <label htmlFor="lastname">Apellidos</label>
                <input type="text" name="lastname" id="lastname"/>
              </div>
            </div>
            <label htmlFor="birthday">Fecha de nacimiento</label>
            <input type="date" name="birthday" id="birthday"/>
            <label htmlFor="username">Nombre de usuario</label>
            <input type="text" name="username" id="username"/>
            <label htmlFor="email">Correo</label>
            <input type="email" name="email" id="email"/>
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password"/>
            <label htmlFor="password-confirm">Confirmar contraseña</label>
            <input type="password" name="password-confirm" id="password-confirm"/>
            <button className="button btn-primary" 
              type="button"
              onClick={handleSubmit}>Registrarse</button>
            <span>¿Ya tienes cuenta?, <a href="">¡Inicia sesión!</a></span>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;