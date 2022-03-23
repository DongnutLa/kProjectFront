import React, { useContext, useRef } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import useGetData from '@hooks/useGetData';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

import upload from '@icons/upload.png';

const URL = process.env.API;
const endpoint = 'photocards'
const API = `${URL}${endpoint}`;
const API_GROUPS = `${URL}groups`;
const API_PCTYPE = `${URL}pctypes`;

const PhotocardForm = () => {
  const { userToken } = useContext(AuthContext);
  const postConfig = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  };

  const groups = useGetData(API_GROUPS, postConfig);
  console.log(groups)
  //const members = groups.members;

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
    console.log(data)
    /* axios.post(API, data, postConfig).then(res => {
      console.log('Response: ', res.data);
    }); */
  }

  return (
    <form action="" ref={form}>
      <label htmlFor="name">Nombre de la photocard</label>
      <input type="text" name="name" id="name"/>
      <label htmlFor="group">Grupo</label>
      <input list="group" name="group" />
        <datalist id="group">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      <label htmlFor="pcType">Versión de photocard</label>
      <input list="pcType" name="pcType" />
        <datalist id="pcType">
          <option value="Selfie"/>
          <option value="Side A"/>
          <option value="Side B"/>
        </datalist>
      <label htmlFor="member">Miembro</label>
      <input list="member" name="member" />
        <datalist id="member">
          {/* {members.map(member => (
            <option key={member.id} value={member.stageName} />
          ))} */}
        </datalist>
      <label htmlFor="image">Imagen</label>
      <label htmlFor="image" className="img-upload button btn-secondary">
        <img src={upload} alt=""/>
        <span>Subir archivo</span>
      </label>
      <input type="file" name="image" id="image"/>
      <button type="button" className="button btn-primary" onClick={handleSubmit}>Agregar álbum</button>
    </form>
  );
}

export default PhotocardForm;