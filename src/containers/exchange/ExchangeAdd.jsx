import React, { useState, useContext } from 'react';
import ExchangeForm from '@components/exchange/ExchangeForm';
import AppContext from '@context/AppContext';

import '@styles-utils/Forms.scss';

import upload from '@icons/upload.png';

const ExchangeAdd = () => {
  const { addDetails, joinData } = useContext(AppContext);

  const [toggleFormHave, setToggleFormHave] = useState(false);
  const [toggleFormWant, setToggleFormWant] = useState(false);

  const [details, setDetails] = useState({

  });

  const onChange = ({target: {name, value}}) => {
    setDetails({...details, [name]: value});
  }

  const onCreate = () => {
    addDetails(details);
    joinData();
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
          <ExchangeForm type={'have'} key={'have'}/>
        </>
      )}
      <div className="sub-form-container" onClick={() => setToggleFormWant(!toggleFormWant)}>
        <p>Datos de la photocard que quieres</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg>
      </div>
      {toggleFormWant && (
        <ExchangeForm type={'want'} key={'want'}/>
      )}
      <label htmlFor="image">Sube una foto de tu photocard</label>
        <label htmlFor="image" className="img-upload button btn-secondary"><img src={upload} alt=""/> <span>Subir archivo</span></label>
      <input type="file" name="image" id="image" onChange={onChange}/>
      <label htmlFor="content">Información adicional</label>
      <textarea name="content" id="content" cols="30" rows="10" placeholder="Escribe aquí el contenido" onChange={onChange}></textarea>
      <button type="button" className="button btn-primary" onClick={onCreate}>¡Crear!</button>
    </form>
  );
}

export default ExchangeAdd;