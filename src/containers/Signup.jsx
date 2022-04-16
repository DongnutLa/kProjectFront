import React, { useRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import ModalContext from '@context/ModalContext';
import ToasterContext from '@context/ToasterContext';

import '@styles-containers/Auth.scss';
import '@styles-utils/buttons.scss';

import kpopColor from '@icons/kpopColor.png';

const URL = process.env.API;
const endpoint = 'users'
const API = `${URL}${endpoint}`;

const Signup = () => {
  const { t, i18n } = useTranslation(['home', 'validations', 'toaster'])
  const { toggleSignup, toggleForSignup } = useContext(ModalContext);
  const { headerConfig } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);

  const [error, setError] = useState({})
  const [btnClass, setBtnClass] = useState('button btn-primary');

  const form = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      lastname: formData.get('lastname'),
      birthday: formData.get('birthday'),
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    }
    try {
      const res = await axios.post(API, data, headerConfig);
      console.log(res);
      setOpenToaster({type: types.SUCCESS, content: t('signup.success', { ns: 'toaster', username: data.username})});
      navigate('/');
      toggleForSignup();
    } catch (error) {
      if(!error.response) setOpenToaster({type: types.ERROR, content: error.message})
      setOpenToaster({type: types.ERROR, content: error.response.data.message})
    }

  }

  const onBlur = (e) => {
    const dateValid = new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/);
    const usernameValid = new RegExp(/^[A-Za-z][A-Za-z0-9_-]{7,29}$/);
    const emailValid = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

    if (e.target.value.length === 0) {
        setError({...error, [e.target.name]: t('required', { ns: 'validations'})});
    } else {
      switch (e.target.name) {
        case 'name':
          if (e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, name: t('signup.name', { ns: 'validations'})});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'lastname':
          if (e.target.value.length <= 3 || e.target.value.length > 20) {
            setError({...error, lastname: t('signup.lastname', { ns: 'validations'})});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'birthday':
          const year = parseInt(e.target.value.split('-', 1).join());
          if (!dateValid.test(e.target.value)) {
            setError({...error, birthday: t('invalid_date', { ns: 'validations'})});
          } else if (year > 2012) {
            setError({...error, birthday: t('signup.birthday', { ns: 'validations'})});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'username':
          if (!usernameValid.test(e.target.value)) {
            setError({...error, username: t('signup.username', { ns: 'validations'})});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'email':
          if (!emailValid.test(e.target.value)) {
            setError({...error, email: t('invalid_email', { ns: 'validations'})});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'password':
          if (e.target.value.length < 5 || e.target.value.length > 50) {
            setError({...error, password: t('signup.password', { ns: 'validations'})});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'password_confirm':
          const formData = new FormData(form.current);
          if (formData.get('password') !== e.target.value) {
            setError({...error, password_confirm: t('signup.password_confirm', { ns: 'validations'})});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        default:
          break;
      }
    }
  }

  const deleteProperty = (prop) => {
    const errorState = JSON.parse(JSON.stringify(error));
    delete errorState[prop];
    setError(errorState)
  }

  useEffect(() => {
    const formData = new FormData(form.current);
    const name = formData.get('name');
    const lastname = formData.get('lastname');
    const birthday = formData.get('birthday');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordConfirm = formData.get('password_confirm');
    if (Object.keys(error).length > 0 || name.length === 0 || lastname.length === 0 || birthday.length === 0 || username.length === 0 || email.length === 0 || password.length === 0 || passwordConfirm.length === 0) {
      setBtnClass(btnClass + ' disable');
    } else {
      setBtnClass('button btn-primary');
    }
  }, [error])

  return (
    <section className="modal">
      <div className="modal-form">
        <div className="form-container">
          <span onClick={() => toggleSignup()}>X</span>
          <img src={kpopColor} alt="Logo K-project"/>
          <form action="" ref={form} className="signup">
            <div className="form__fullname">
              <div>
                <label htmlFor="name">{t('signup.name')}</label>
                <input type="text" name="name" id="name" onBlur={onBlur}/>
                {error.name ? <span className='error-msg'>{error.name}</span> : <span className='error-msg'>&nbsp;</span>}
              </div>
              <div>
                <label htmlFor="lastname">{t('signup.lastname')}</label>
                <input type="text" name="lastname" id="lastname" onBlur={onBlur}/>
                {error.lastname ? <span className='error-msg'>{error.lastname}</span> : <span className='error-msg'>&nbsp;</span>}
              </div>
            </div>
            <label htmlFor="birthday">{t('signup.birthday')}</label>
            <input type="date" name="birthday" id="birthday" onBlur={onBlur}/>
            {error.birthday ? <span className='error-msg'>{error.birthday}</span> : <span className='error-msg'>&nbsp;</span>}
            <label htmlFor="username">{t('signup.username')}</label>
            <input type="text" name="username" id="username" onBlur={onBlur}/>
            {error.username ? <span className='error-msg'>{error.username}</span> : <span className='error-msg'>&nbsp;</span>}
            <label htmlFor="email">{t('signup.email')}</label>
            <input type="email" name="email" id="email" onBlur={onBlur}/>
            {error.email ? <span className='error-msg'>{error.email}</span> : <span className='error-msg'>&nbsp;</span>}
            <label htmlFor="password">{t('signup.password')}</label>
            <input type="password" name="password" id="password" onBlur={onBlur}/>
            {error.password ? <span className='error-msg'>{error.password}</span> : <span className='error-msg'>&nbsp;</span>}
            <label htmlFor="password_confirm">{t('signup.password_confirm')}</label>
            <input type="password" name="password_confirm" id="password_confirm" onBlur={onBlur}/>
            {error.password_confirm ? <span className='error-msg'>{error.password_confirm}</span> : <span className='error-msg'>&nbsp;</span>}
            <button type="button"
              onClick={handleSubmit}
              disabled={Object.keys(error).length > 0} 
              className={btnClass}>{t('signup.signup')}</button>
            <span>{t('signup.have_account')}<a href="">{t('signup.login')}</a></span>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;