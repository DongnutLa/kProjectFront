import React, { useRef, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';

import '@styles-utils/Forms.scss';

import upload from '@icons/upload.png';

const URL = process.env.API;
const endpoint = 'news'
const API = `${URL}${endpoint}`;

const NewForm = () => {
  const { headerConfig } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);

  const [labels, setLabels] = useState([]);
  const [error, setError] = useState({})
  const [btnClass, setBtnClass] = useState('button btn-primary');
  const [filename, setFilename] = useState("Subir archivo");

  const form = useRef(null);

  const handleSubmit = async (event) => {
    const formData = new FormData(form.current);
    if(labels.length > 0) {
      labels.forEach(tag => {
        formData.append('tags[]', tag);
      })
    }
    try {
      const res = await axios.post(API, formData, headerConfig);
      setOpenToaster({type: types.SUCCESS, content: 'Noticia creada correctamente'});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: 'No se pudo crear la noticia'});
    }
  }

  const onFileCharge = (event) => {
    setFilename("Subir archivo");
    if (event.target.files.length > 0) {
      setFilename(event.target.files[0].name);
    }
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

  useEffect(() => {
    if (labels.length === 0) setError({...error, labels: 'Este campo es obligatorio*'});
    if (labels.length > 0) deleteProperty('labels');
  }, [labels])

  const onBlur = (e) => {
    if (labels.length === 0 && e.target.value.length === 0) {
        setError({...error, [e.target.name]: 'Este campo es obligatorio*'});
    } else {
      switch (e.target.name) {
        case 'title':
          if (e.target.value.length < 10 || e.target.value.length > 50) {
            setError({...error, title: 'El título debe tener entre 10 y 50 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'content':
          if (e.target.value.length <= 50) {
            setError({...error, content: 'El contenido debe ser mayor a 50 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'source':
          if (e.target.value.length <= 3) {
            setError({...error, source: 'La fuente debe ser mayor a 3 carácteres'});
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
    const title = formData.get('title');
    const content = formData.get('content');
    const source = formData.get('source');
    const tags = formData.get('labels');
    if (Object.keys(error).length > 0 || title.length === 0 || content.length === 0 || source.length === 0) {
      setBtnClass(btnClass + ' disable');
    } else {
      setBtnClass('button btn-primary');
    }
  }, [error])

  const onDeleteLabel = (e) => {
    const values = [...labels];
    const index = values.indexOf(e.target.textContent)
    values.splice(index, 1);
    setLabels(values);
  }

  return (
      <form action="" ref={form}>
        <label htmlFor="title">Título</label>
        <input type="text" name="title" id="title" placeholder="Título de la noticia" onBlur={onBlur}/>
        {error.title ? <span className='error-msg'>{error.title}</span> : <span className='error-msg'>&nbsp;</span>}
        <label htmlFor="content">contenido</label>
        <textarea name="content" id="content" cols="30" rows="10" placeholder="Escribe aquí el contenido" onBlur={onBlur}></textarea>
        {error.content ? <span className='error-msg'>{error.content}</span> : <span className='error-msg'>&nbsp;</span>}
        <label htmlFor="file">Imagen</label>
        <label htmlFor="file" className="img-upload button btn-secondary"><img src={upload} alt=""/> <span>{filename}</span></label>
        <input type="file" name="file" id="file" onChange={onFileCharge}/>
        <label htmlFor="source">Fuente</label>
        <input type="text" name="source" id="source" placeholder="Fuente de la información" onBlur={onBlur}/>
        {error.source ? <span className='error-msg'>{error.source}</span> : <span className='error-msg'>&nbsp;</span>}
        <label htmlFor="labels">Etiquetas</label>
        <input type="text" id="labels" placeholder="Separadas por espacios" onChange={onLabels} onBlur={onBlur}/>
        {error.labels && <span className='error-msg'>{error.labels}</span>}
        <div className='labels-container'>
          {labels.map((label, index) => (
            <span className='labels-name' id={index} key={index} onClick={onDeleteLabel}>{label}</span>
          ))}
        </div>
        <button type="button" disabled={Object.keys(error).length > 0} className={btnClass} onClick={handleSubmit}>¡Crear!</button>
      </form>
  );
}

export default NewForm;