import React from 'react';
import '@styles-containers/Auth.scss';
import '@styles-utils/buttons.scss';

import kpopColor from '@icons/kpopColor.png';

const Login = () => {
  return (
    <section className="modal">
        <div className="modal-form">
            <div className="form-container">
                <span>X</span>
                <img src={kpopColor} alt="Logo K-project"/>
                <form action="">
                    <label for="username">Nombre de usuario</label>
                    <input type="text" name="username" id="username"/>
                    <label for="password">Contraseña</label>
                    <input type="password" name="password" id="password"/>
                    <button className="button btn-primary" type="button">Iniciar sesión</button>
                    <span>¿No tienes cuenta?, <a href="">¡Crea una!</a></span>
                </form>
            </div>
        </div>
    </section>
  );
}

export default Login;