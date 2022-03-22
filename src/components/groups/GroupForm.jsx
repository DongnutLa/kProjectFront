import React, { useContext, useRef } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

const URL = process.env.API;
const endpoint = 'groups'
const API = `${URL}${endpoint}`;

const GroupForm = () => {
  const { userToken } = useContext(AuthContext);

  const postConfig = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  };
  
  const form = useRef(null);

  const handleSubmit = (event) => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      koreanName: formData.get('koreanName'),
      debutDate: formData.get('debutDate'),
      membersNumber: parseInt(formData.get('membersNumber')),
      type: formData.get('type'),
      company: formData.get('company'),
      fanclubName: formData.get('fanclubName'),
      fanclubBirth: formData.get('fanclubBirth'),
      active: formData.get('active') === 'Activo' ? true : false,
      instagram: formData.get('instagram'),
      twitter: formData.get('twitter'),
    }
    console.log(data);
    axios.post(API, data, postConfig).then(res => {
      console.log('Response: ', res.data);
    });
  }

  return (
    <form action="" ref={form}>
      <label htmlFor="name">Nombre del grupo</label>
      <input type="text" name="name" id="name"/>
      <label htmlFor="koreanName">Nombre coreano del grupo</label>
      <input type="text" name="koreanName" id="koreanName"/>
      <label htmlFor="debutDate">Fecha del debut</label>
      <input type="date" name="debutDate" id="debutDate"/>
      <div className="form__divided">
        <div>
          <label htmlFor="membersNumber">Miembros</label>
          <input type="number" name="membersNumber" id="membersNumber"/>
        </div>
        <div>
          <label htmlFor="type">Tipo de grupo</label>
          <input list="type" name="type" />
            <datalist id="type">
              <option value="Girl group"/>
              <option value="Boy group"/>
              <option value="Mixto"/>
            </datalist>
        </div>
      </div>
      <label htmlFor="company">Empresa</label>
      <input type="text" name="company" id="company"/>
      <label htmlFor="fanclubName">Nombre del fanclub</label>
      <input type="text" name="fanclubName" id="fanclubName"/>
      <label htmlFor="fanclubBirth">Fecha de creación del fanclub</label>
      <input type="date" name="fanclubBirth" id="fanclubBirth"/>
      <label htmlFor="active">Actividad</label>
      <input list="active" name="active" />
        <datalist id="active">
          <option value="Activo"/>
          <option value="Inactivo"/>
        </datalist>
      <label htmlFor="instagram">Instagram del grupo</label>
      <input type="text" name="instagram" id="instagram"/>
      <label htmlFor="twitter">Twitter del grupo</label>
      <input type="text" name="twitter" id="twitter"/>
      <button type="button" className="button btn-primary" onClick={handleSubmit}>Agregar grupo</button>
    </form>
  );
}

export default GroupForm;