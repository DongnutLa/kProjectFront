import React from 'react';
import '@styles-containers/Auth.scss';
import '@styles-utils/buttons.scss';

import kpopColor from '@icons/kpopColor.png';

const Signup = () => {
  return (
    <section className="modal">
      <div className="modal-form">
        <div className="form-container">
          <span>X</span>
          <img src={kpopColor} alt="Logo K-project"/>
          <form action="">
            <div className="form__fullname">
              <div>
                <label for="name">Nombres</label>
                <input type="text" name="name" id="name"/>
              </div>
              <div>
                <label for="lastname">Apellidos</label>
                <input type="text" name="lastname" id="lastname"/>
              </div>
            </div>
            <label for="birthday">Fecha de nacimiento</label>
            <input type="date" name="birthday" id="birthday"/>
            <label for="username">Nombre de usuario</label>
            <input type="text" name="username" id="username"/>
            <label for="email">Correo</label>
            <input type="email" name="email" id="email"/>
            <label for="password">Contraseña</label>
            <input type="password" name="password" id="password"/>
            <label for="password-confirm">Confirmar contraseña</label>
            <input type="password" name="password-confirm" id="password-confirm"/>
            <button className="button btn-primary" type="button">Registrarse</button>
            <span>¿Ya tienes cuenta?, <a href="">¡Inicia sesión!</a></span>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;