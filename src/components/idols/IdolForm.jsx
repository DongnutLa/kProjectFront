import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';

import useGetData from '@hooks/useGetData';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

const URL = process.env.API;
const endpoint = 'idols'
const API = `${URL}${endpoint}`;
const API_GROUPS = `${URL}groups`;

const IdolForm = () => {
  const { headerConfig } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);

  const [error, setError] = useState({})
  const [btnClass, setBtnClass] = useState('button btn-primary');

  const groups = useGetData(API_GROUPS, headerConfig);

  const form = useRef(null);

  const handleSubmit = async (event) => {
    const formData = new FormData(form.current);
    const group = groups.find(x => x.name === formData.get('group'));
    console.log(group)
    const data = {
      name: formData.get('name'),
      koreanName: formData.get('koreanName'),
      stageName: formData.get('stageName'),
      koreanStageName: formData.get('stageNameKr'),
      birthday: formData.get('birthday'),
      nationality: formData.get('nationality'),
      birthPlace: formData.get('birthPlace'),
      position: formData.get('position'),
      groupId: group !== undefined ? group.id : 0,
    }
    if (formData.get('instagram').length > 0) data.instagram = formData.get('instagram');
    if (formData.get('twitter').length > 0) data.twitter = formData.get('twitter');
    try {
      const res = await axios.post(API, data, headerConfig)
      setOpenToaster({type: types.SUCCESS, content: 'Idol agregado correctamente'});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: 'No se pudo agregar al Idol'});
    }
  }

  const onBlur = (e) => {
    const dateValid = new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/);
    const today = parseInt(new Date().toISOString().split('-', 1).join());

    if (e.target.value.length === 0 && e.target.name !== 'instagram' && e.target.name !== 'twitter') {
        setError({...error, [e.target.name]: 'Este campo es obligatorio*'});
    } else {
      switch (e.target.name) {
        case 'name':
          if (e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, name: 'El nombre debe tener entre 3 y 20 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'koreanName':
          if (e.target.value.length <= 1 || e.target.value.length > 10) {
            setError({...error, koreanName: 'El nombre debe tener entre 1 y 10 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'stageName':
          if (e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, stageName: 'El nombre debe tener entre 3 y 20 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'stageNameKr':
          if (e.target.value.length <= 1 || e.target.value.length > 10) {
            setError({...error, stageNameKr: 'El nombre debe tener entre 1 y 10 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'birthday':
          const year = parseInt(e.target.value.split('-', 1).join());
          if (!dateValid.test(e.target.value)) {
            setError({...error, birthday: 'La fecha no es válida'});
          } else if (year < 1990 || year > today) {
            setError({...error, birthday: `El año debe ser mayor a 1990 y menor a ${today}`});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'nationality':
          if (e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, nationality: 'La nacionalidad debe tener entre 3 y 20 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'birthPlace':
          if (e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, birthPlace: 'El lugar de nacimiento debe tener entre 3 y 20 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'position':
          if (e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, position: 'El nombre debe tener entre 3 y 20 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'group':
          const group = groups.find(x => x.name === e.target.value);
          if (group === undefined) {
            setError({...error, group: 'Selecciona una opción válida'});
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
    const koreanName = formData.get('koreanName');
    const stageName = formData.get('stageName');
    const stageNameKr = formData.get('stageNameKr');
    const birthday = formData.get('birthday');
    const nationality = formData.get('nationality');
    const birthPlace = formData.get('birthPlace');
    const position = formData.get('position');
    const group = formData.get('group');
    if (Object.keys(error).length > 0 || name.length === 0 || koreanName.length === 0 || stageName.length === 0 || stageNameKr.length === 0 || birthday.length === 0 || nationality.length === 0 || birthPlace.length === 0 || position.length === 0 || group.length === 0) {
      setBtnClass(btnClass + ' disable');
    } else {
      setBtnClass('button btn-primary');
    }
  }, [error])

  return (
    <form action="" ref={form}>
      <div className="form__divided">
        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" id="name" onBlur={onBlur}/>
          {error.name ? <span className='error-msg'>{error.name}</span> : <span className='error-msg'>&nbsp;</span>}
        </div>
        <div>
          <label htmlFor="koreanName">Nombre coreano</label>
          <input type="text" name="koreanName" id="koreanName" onBlur={onBlur}/>
          {error.koreanName ? <span className='error-msg'>{error.koreanName}</span> : <span className='error-msg'>&nbsp;</span>}
        </div>
      </div>
      <div className="form__divided">
        <div>
          <label htmlFor="stageName">Nombre artístico</label>
          <input type="text" name="stageName" id="stageName" onBlur={onBlur}/>
          {error.stageName ? <span className='error-msg'>{error.stageName}</span> : <span className='error-msg'>&nbsp;</span>}
        </div>
        <div>
          <label htmlFor="stageNameKr">Nombre artístico</label>
          <input type="text" name="stageNameKr" id="stageNameKr" placeholder='Coreano' onBlur={onBlur}/>
          {error.stageNameKr ? <span className='error-msg'>{error.stageNameKr}</span> : <span className='error-msg'>&nbsp;</span>}
        </div>
      </div>
      <label htmlFor="birthday">Fecha de nacimiento</label>
      <input type="date" name="birthday" id="birthday" onBlur={onBlur}/>
      {error.birthday ? <span className='error-msg'>{error.birthday}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="nationality">Nacionalidad</label>
      <input type="text" name="nationality" id="nationality" onBlur={onBlur}/>
      {error.nationality ? <span className='error-msg'>{error.nationality}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="birthPlace">Lugar de nacimiento</label>
      <input type="text" name="birthPlace" id="birthPlace" onBlur={onBlur}/>
      {error.birthPlace ? <span className='error-msg'>{error.birthPlace}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="position">Posición</label>
      <input type="text" name="position" id="position" onBlur={onBlur}/>
      {error.position ? <span className='error-msg'>{error.position}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="instagram">Instagram</label>
      <input type="text" name="instagram" id="instagram" onBlur={onBlur}/>
      {error.instagram ? <span className='error-msg'>{error.instagram}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="twitter">Twitter</label>
      <input type="text" name="twitter" id="twitter" onBlur={onBlur}/>
      {error.twitter ? <span className='error-msg'>{error.twitter}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="group">Grupo</label>
      <input list="group" name="group" onBlur={onBlur}/>
      {error.group ? <span className='error-msg'>{error.group}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="group">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      <button type="button" disabled={Object.keys(error).length > 0} className={btnClass} onClick={handleSubmit}>Agregar Idol</button>
    </form>
  );
}

export default IdolForm;