import React, { useState, useContext, useEffect } from 'react';
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
  const { headerConfig } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);

  const [toggleFormHave, setToggleFormHave] = useState(false);
  const [toggleFormWant, setToggleFormWant] = useState(false);
  const [file, setFile] = useState({});
  const [pcData, setPcData] = useState({
    userId: 1,
    pcFromId: null,
    pcToId: null,
    creationDate: "2022-03-25",
    active: true,
    information: ''
  })

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
    try {
      const res = await axios.post(API, pcData, headerConfig);
      setOpenToaster({type: types.SUCCESS, content: 'Intercambio creado correctamente'});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: 'No se pudo crear el intercambio'});
    }
  }

  return (
    <form action="">
      <div className="sub-form-container" onClick={() => setToggleFormHave(!toggleFormHave)}>
        <p>Datos de la photocard que tienes</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg>
      </div>
      {toggleFormHave && (
        <>
          <ExchangeForm type={'have'} key={'have'} func={pc_have}/>
        </>
      )}
      <div className="sub-form-container" onClick={() => setToggleFormWant(!toggleFormWant)}>
        <p>Datos de la photocard que quieres</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg>
      </div>
      {toggleFormWant && (
        <ExchangeForm type={'want'} key={'want'} func={pc_want}/>
      )}
      <label htmlFor="image">Sube una foto de tu photocard</label>
        <label htmlFor="image" className="img-upload button btn-secondary"><img src={upload} alt=""/> <span>Subir archivo</span></label>
      <input type="file" name="image" id="image" onChange={onChange}/>
      <img className="img-preview" src={file.img} />
      <label htmlFor="content">Información adicional</label>
      <textarea name="content" id="content" cols="30" rows="10" placeholder="Escribe aquí el contenido" onChange={onDetails}></textarea>
      <button type="button" className="button btn-primary" onClick={onCreateExchange}>¡Crear!</button>
    </form>
  );
}

export default ExchangeAdd;