import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import Toaster from '@components/global/Toaster';

import '@styles-utils/Forms.scss';

import upload from '@icons/upload.png';

const URL = process.env.API;
const endpoint = 'news'
const API = `${URL}${endpoint}`;

const NewForm = () => {
  const { headerConfig } = useContext(AuthContext);

  const [filename, setFilename] = useState("Subir archivo");
  const [status, setStatus] = useState({
    type: null,
    content: '',
  });
  const form = useRef(null);

  const handleSubmit = (event) => {
    const formData = new FormData(form.current);
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      //image: formData.get('image'),
      source: formData.get('source'),
      tags: formData.get('labels').split(" "),
      creationDate: "2022-03-21"
    }
    console.log(data);
    axios.post(API, data, headerConfig).then(res => {
      console.log('Response: ', res);
      if(res.status === 201) {
        setStatus({...status, type: 'SUCCESS', content: 'Noticia creada correctamente'})
      }
    });
  }

  const onFileCharge = (event) => {
    setFilename("Subir archivo");
    if (event.target.files.length > 0) {
      setFilename(event.target.files[0].name);
    }
  }

  return (
    <>
      {status.type && <Toaster type={status.type} content={status.content} />}
      <form action="" ref={form}>
        <label htmlFor="title">Título</label>
        <input type="text" name="title" id="title" placeholder="Título de la noticia"/>
        <label htmlFor="content">contenido</label>
        <textarea name="content" id="content" cols="30" rows="10" placeholder="Escribe aquí el contenido"></textarea>
        <label htmlFor="image">Imagen</label>
        <label htmlFor="image" className="img-upload button btn-secondary"><img src={upload} alt=""/> <span>{filename}</span></label>
        <input type="file" name="image" id="image" onChange={onFileCharge}/>
        <label htmlFor="source">Fuente</label>
        <input type="text" name="source" id="source" placeholder="Fuente de la información"/>
        <label htmlFor="labels">Etiquetas</label>
        <input type="text" name="labels" id="labels" placeholder="Separadas por espacios"/>
        <button type="button" className="button btn-primary" onClick={handleSubmit}>¡Crear!</button>
      </form>
    </>
  );
}

export default NewForm;