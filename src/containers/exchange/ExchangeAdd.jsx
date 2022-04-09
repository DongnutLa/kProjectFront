import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';

import ExchangeForm from '@components/exchange/ExchangeForm';
import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';

import '@styles-utils/Forms.scss';

import upload from '@icons/upload.png';

const URL = process.env.API;
const endpoint = 'exchanges'
const API = `${URL}${endpoint}`;

const ExchangeAdd = () => {
  const { headerConfig, userData, userPermissions } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);

  const [btnClass, setBtnClass] = useState('button btn-primary');
  const [error, setError] = useState({pcFrom: {}, pcTo: {}})
  const [toggleFormHave, setToggleFormHave] = useState(false);
  const [toggleFormWant, setToggleFormWant] = useState(false);
  const [labels, setLabels] = useState([]);
  const [file, setFile] = useState({});
  const [pcData, setPcData] = useState({
    userId: userData.id,
    pcFromId: NaN,
    pcToId: NaN,
    information: ''
  })

  const form = useRef(null);

  const onChange = (e) => {
    if (e.target.files.length < 1) {
      setFile({img: ''});
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFile({img: reader.result});
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const pc_have = (data) => {
    setPcData({...pcData, pcFromId: parseInt(data.photocard_have)})
  }
  const pc_want = (data) => {
    setPcData({...pcData, pcToId: parseInt(data.photocard_want)})
  }
  const onDetails = (e) => {
    setPcData({...pcData, information: e.target.value})
  }

  const onCreateExchange = async () => {
    const formData = new FormData(form.current);
    formData.delete('photocard_have');
    formData.delete('photocard_want');
    formData.append('userId', pcData.userId);
    formData.append('pcFromId', pcData.pcFromId);
    formData.append('pcToId', pcData.pcToId);
    if(labels.length > 0) {
      labels.forEach(tag => {
        formData.append('tags[]', tag);
      })
    }
    try {
      const res = await axios.post(API, formData, headerConfig);
      setOpenToaster({type: types.SUCCESS, content: 'Intercambio creado correctamente'});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: 'No se pudo crear el intercambio'});
    }
  }

  const error_have = (data) => {
    setError({...error, pcFrom: data})
  }
  const error_want = (data) => {
    setError({...error, pcTo: data})
  }

  useEffect(() => {
    if (Object.keys(error.pcFrom).length > 0 || Object.keys(error.pcTo).length > 0 || Object.keys(error).length > 2 || isNaN(pcData.pcFromId) || isNaN(pcData.pcToId) || pcData.information.length < 10) {
      setBtnClass(btnClass + ' disable');
    } else {
      setBtnClass('button btn-primary');
    }
  }, [error, pcData])

  useEffect(() => {
    if (labels.length === 0) setError({...error, labels: 'Este campo es obligatorio*'});
    if (labels.length > 0) deleteProperty('labels');
  }, [labels])

  const onBlur = (e) => {
    if (labels.length === 0 && e.target.value.length === 0) {
      setError({...error, [e.target.name]: 'Este campo es obligatorio*'});
    } else {
      switch (e.target.name) {
        case 'content':
          if (e.target.value.length < 10) {
            setError({...error, content: 'El contenido debe ser mayor a 10 carácteres'});
          } else if (e.target.value.length > 400) {
            setError({...error, content: 'El contenido debe ser menor a 400 carácteres'});
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

  const onLabels = (e) => {
    const validTag = new RegExp(/^[A-Za-z0-9]{3,20}$/);
    if (e.target.value.includes(' ')) {
      const value = e.target.value.split(' ', 1).join();
      if (!validTag.test(value)) {
        setError({...error, labels: 'La etiqueta debe ser mayor a 2 carácteres y menor a 20'});
        e.target.value = value;
      } else {
        deleteProperty(e.target.name);
        setLabels([...labels, value]);
        e.target.value = '';
      }
    }
  }

  const onDeleteLabel = (e) => {
    const values = [...labels];
    const index = values.indexOf(e.target.textContent)
    values.splice(index, 1);
    setLabels(values);
  }

  return (
    <form action="" ref={form}>
      <div className="sub-form-container" onClick={() => setToggleFormHave(!toggleFormHave)}>
        <p>Datos de la photocard que tienes</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg>
      </div>
      {toggleFormHave && (
        <>
          <ExchangeForm type={'have'} key={'have'} func={pc_have} errors={error_have}/>
        </>
      )}
      <div className="sub-form-container" onClick={() => setToggleFormWant(!toggleFormWant)}>
        <p>Datos de la photocard que quieres</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg>
      </div>
      {toggleFormWant && (
        <ExchangeForm type={'want'} key={'want'} func={pc_want} errors={error_want}/>
      )}
      <label htmlFor="file">Sube una foto de tu photocard</label>
        <label htmlFor="file" className="img-upload button btn-secondary"><img src={upload} alt=""/> <span>Subir archivo</span></label>
      <input type="file" name="file" id="file" onChange={onChange}/>
      <img className="img-preview" src={file.img} />
      <label htmlFor="labels">Etiquetas</label>
      <input type="text" id="labels" placeholder="Separadas por espacios" onChange={onLabels} onBlur={onBlur}/>
      {error.labels && <span className='error-msg'>{error.labels}</span>}
      <div className='labels-container'>
        {labels.map((label, index) => (
          <span className='labels-name' id={index} key={index} onClick={onDeleteLabel}>{label}</span>
        ))}
      </div>
      <label htmlFor="information">Información adicional</label>
      <textarea name="information" id="information" cols="30" rows="10" placeholder="Escribe aquí el contenido" onChange={onDetails} onBlur={onBlur}></textarea>
      {error.information ? <span className='error-msg'>{error.information}</span> : <span className='error-msg'>&nbsp;</span>}
      {userPermissions.includes('EDIT_EXCHANGES') ?
        <button type="button" disabled={Object.keys(error.pcFrom).length > 0 || Object.keys(error.pcTo).length > 0 || Object.keys(error).length > 2} className={btnClass} onClick={onCreateExchange}>¡Crear!</button> 
      : <p>No tienes permisos para crear un intercambio</p>}
    </form>
  );
}

export default ExchangeAdd;