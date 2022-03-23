import React, { useContext, useRef } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import useGetData from '@hooks/useGetData';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

const URL = process.env.API;
const endpoint = 'idols'
const API = `${URL}${endpoint}`;
const API_GROUPS = `${URL}groups`;

const IdolForm = () => {
  const { userToken } = useContext(AuthContext);
  const postConfig = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  };

  const groups = useGetData(API_GROUPS, postConfig);

  const form = useRef(null);

  const handleSubmit = (event) => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      koreanName: formData.get('koreanName'),
      stageName: formData.get('stageName'),
      koreanStageName: formData.get('stageNameKr'),
      birthday: formData.get('birthday'),
      nationality: formData.get('nationality'),
      birthPlace: formData.get('birthPlace'),
      position: formData.get('position'),
      instagram: formData.get('instagram'),
      twitter: formData.get('twitter'),
      groupId: groups.find(x => x.name === formData.get('group')).id,
    }
    axios.post(API, data, postConfig).then(res => {
      console.log('Response: ', res.data);
    });
  }

  return (
    <form action="" ref={form}>
      <div className="form__divided">
        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" id="name"/>
        </div>
        <div>
          <label htmlFor="koreanName">Nombre coreano</label>
          <input type="text" name="koreanName" id="koreanName"/>
        </div>
      </div>
      <div className="form__divided">
        <div>
          <label htmlFor="stageName">Nombre artístico</label>
          <input type="text" name="stageName" id="stageName"/>
        </div>
        <div>
          <label htmlFor="stageNameKr">Nombre artístico (Kr)</label>
          <input type="text" name="stageNameKr" id="stageNameKr"/>
        </div>
      </div>
      <label htmlFor="birthday">Fecha de nacimiento</label>
      <input type="date" name="birthday" id="birthday"/>
      <label htmlFor="nationality">Nacionalidad</label>
      <input type="text" name="nationality" id="nationality"/>
      <label htmlFor="birthPlace">Lugar de nacimiento</label>
      <input type="text" name="birthPlace" id="birthPlace"/>
      <label htmlFor="position">Posición</label>
      <input type="text" name="position" id="position"/>
      <label htmlFor="instagram">Instagram</label>
      <input type="text" name="instagram" id="instagram"/>
      <label htmlFor="twitter">Twitter</label>
      <input type="text" name="twitter" id="twitter"/>
      <label htmlFor="group">Grupo</label>
      <input list="group" name="group" />
        <datalist id="group">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      <button type="button" className="button btn-primary" onClick={handleSubmit}>Agregar Idol</button>
    </form>
  );
}

export default IdolForm;