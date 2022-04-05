import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

import upload from '@icons/upload.png';

const URL = process.env.API;
const endpoint = 'groups'
const API = `${URL}${endpoint}`;

const groupTypes = ['Girl group', 'Boy group', 'Mixto'];
const activeData = ['Activo', 'Inactivo'];

const GroupForm = () => {
  const { headerConfig } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);

  const [error, setError] = useState({})
  const [btnClass, setBtnClass] = useState('button btn-primary');
  const [active, setActive] = useState(null);
  const form = useRef(null);

  const handleSubmit = async (event) => {
    const formData = new FormData(form.current);
    if (formData.get('fanclubName').length == 0) formData.delete('fanclubName')
    if (formData.get('fanclubBirth').length == 0) formData.delete('fanclubBirth')
    if (formData.get('instagram').length == 0) formData.delete('instagram')
    if (formData.get('twitter').length == 0) formData.delete('twitter')
    formData.append('active', active);
    try {
      const res = await axios.post(API, formData, headerConfig);
      setOpenToaster({type: types.SUCCESS, content: 'Grupo agregado correctamente'});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: 'No se pudo agregar el grupo'});
    }
  }

  const onBlur = (e) => {
    const dateValid = new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/);
    const today = parseInt(new Date().toISOString().split('-', 1).join());
    if ((e.target.value === null || e.target.value.length === 0) && e.target.name !== 'instagram' && e.target.name !== 'twitter' && e.target.name !== 'fanclubName' && e.target.name !== 'fanclubBirth') {
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
        case 'debutDate':
          const year = parseInt(e.target.value.split('-', 1).join());
          if (!dateValid.test(e.target.value)) {
            setError({...error, debutDate: 'La fecha no es válida'});
          } else if (year < 1990 || year > today) {
            setError({...error, debutDate: `El año debe ser mayor a 1990 y menor a ${today}`});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'membersNumber':
          if (e.target.value >= 30) {
            setError({...error, membersNumber: 'Selecciona menos de 30'});
          } else if (e.target.value < 1) {
            setError({...error, membersNumber: 'Selecciona al menos 1'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'type':
          if (!groupTypes.includes(e.target.value)) {
            setError({...error, type: 'Selecciona un tipo válido'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'company':
          if (e.target.value.length < 3 || e.target.value.length > 50) {
            setError({...error, company: 'La empresa debe tener entre 3 y 50 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'fanclubName':
          if (e.target.value === null || e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, fanclubName: 'El nombre debe tener entre 3 y 20 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'fanclubBirth':
          let yearFc = parseInt(e.target.value.split('-', 1).join());
          if (!dateValid.test(e.target.value)) {
            setError({...error, fanclubBirth: 'La fecha no es válida'});
          } else if (yearFc < 1990 || yearFc > today) {
            setError({...error, fanclubBirth: `El año debe ser mayor a 1990 y menor a ${today}`});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'active':
          if (!active.includes(e.target.value)) {
            setError({...error, active: 'Selecciona una opción válida'});
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
    if (Object.keys(error).length > 0 || formData.get('name').length === 0 
      || formData.get('koreanName').length === 0 || formData.get('debutDate').length === 0 
      || formData.get('membersNumber').length === 0 || formData.get('type').length === 0 
      || formData.get('company').length === 0 || active === null) {
      setBtnClass(btnClass + ' disable');
    } else {
      setBtnClass('button btn-primary');
    }
  }, [error, active])

  const onChangeActive = (e) => {
    setActive(e.target.value === 'Activo' ? true : false);
  }

  return (
    <form action="" ref={form}>
      <label htmlFor="name">Nombre del grupo</label>
      <input type="text" name="name" id="name" onBlur={onBlur}/>
      {error.name ? <span className='error-msg'>{error.name}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="koreanName">Nombre coreano del grupo</label>
      <input type="text" name="koreanName" id="koreanName" onBlur={onBlur}/>
      {error.koreanName ? <span className='error-msg'>{error.koreanName}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="debutDate">Fecha del debut</label>
      <input type="date" name="debutDate" id="debutDate" onBlur={onBlur}/>
      {error.debutDate ? <span className='error-msg'>{error.debutDate}</span> : <span className='error-msg'>&nbsp;</span>}
      <div className="form__divided">
        <div>
          <label htmlFor="membersNumber">Miembros</label>
          <input type="number" name="membersNumber" id="membersNumber" min={1} max={29} onBlur={onBlur}/>
          {error.membersNumber ? <span className='error-msg'>{error.membersNumber}</span> : <span className='error-msg'>&nbsp;</span>}
        </div>
        <div>
          <label htmlFor="type">Tipo de grupo</label>
          <input list="type" name="type" onBlur={onBlur}/>
          {error.type ? <span className='error-msg'>{error.type}</span> : <span className='error-msg'>&nbsp;</span>}
            <datalist id="type">
              {groupTypes && groupTypes.map(type =>
                <option key={type} value={type}/>
              )}
            </datalist>
        </div>
      </div>
      <label htmlFor="company">Empresa</label>
      <input type="text" name="company" id="company" onBlur={onBlur}/>
      {error.company ? <span className='error-msg'>{error.company}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="fanclubName">Nombre del fanclub</label>
      <input type="text" name="fanclubName" id="fanclubName" onBlur={onBlur}/>
      {error.fanclubName ? <span className='error-msg'>{error.fanclubName}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="fanclubBirth">Fecha de creación del fanclub</label>
      <input type="date" name="fanclubBirth" id="fanclubBirth" onBlur={onBlur}/>
      {error.fanclubBirth ? <span className='error-msg'>{error.fanclubBirth}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="active">Actividad</label>
      <input list="active" onBlur={onBlur} onChange={onChangeActive}/>
      {error.active ? <span className='error-msg'>{error.active}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="active">
          {activeData && activeData.map(item =>
            <option key={item} value={item}/>
          )}
        </datalist>
      <label htmlFor="instagram">Instagram del grupo</label>
      <input type="text" name="instagram" id="instagram" onBlur={onBlur}/>
      {error.instagam ? <span className='error-msg'>{error.instagam}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="twitter">Twitter del grupo</label>
      <input type="text" name="twitter" id="twitter" onBlur={onBlur}/>
      {error.twitter ? <span className='error-msg'>{error.twitter}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="file">Imágenes</label>
      <label htmlFor="file" className="img-upload button btn-secondary"><img src={upload} alt=""/> <span>Seleccionar fotos</span></label>
      <input type="file" multiple name="file" id="file"/>
      <button type="button" disabled={Object.keys(error).length > 0} className={btnClass} onClick={handleSubmit}>Agregar grupo</button>
    </form>
  );
}

export default GroupForm;