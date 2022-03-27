import React, { useRef, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import useGetData from '@hooks/useGetData';
import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

import upload from '@icons/upload.png'

const URL = process.env.API;
const endpoint = 'albums'
const API_ALBUMS = `${URL}${endpoint}`;
const API_GROUPS = `${URL}groups`;
const API_PCTYPE = `${URL}pctypes`;

const AlbumForm = () => {
  const { headerConfig } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);

  const [togglePcTypes, setTogglePcTypes] = useState(false);
  const [pctypeField, setPctypeField] = useState([{name: "pcVersion"}])
  const [file, setFile] = useState({});

  const groups = useGetData(API_GROUPS, headerConfig);

  const form = useRef(null);

  const handleSubmit = async (event) => {
    const formData = new FormData(form.current);
    const group = groups.find(x => x.name === formData.get('group'));
    const data = {
      name: formData.get('name'),
      koreanName: formData.get('koreanName'),
      releaseDate: formData.get('releaseDate'),
      producers: formData.get('producers').split(" "),
      groupId: group !== undefined ? group.id : 0,
    }
    try {
      var res = await axios.post(API_ALBUMS, data, headerConfig);
      setOpenToaster({type: types.SUCCESS, content: 'Álbum creado correctamente'});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: 'Hubo un error al crear el álbum'});
    }
    
    pctypeField.forEach(async (item) => {
      if (Object.keys(item).length > 1) {
        const sendData = {
          albumId: res.data.id,
          name: item.pcVersion
        }
        try {
          const resPt = await axios.post(API_PCTYPE, sendData, headerConfig);
          setOpenToaster({type: types.SUCCESS, content: 'Versiones de photocards creadas correctamente'});
        } catch (error) {
          setOpenToaster({type: types.ERROR, content: 'Hubo un error al crear las versiones de photocards'});
        }
      }
    });
  }

  const handleChangeInput = (index, e) => {
    const values = [...pctypeField];
    values[index][e.target.name] = e.target.value;
    setPctypeField(values);
  }

  const onDeleteInput = () => {
    const values = [...pctypeField];
    values.splice(values.length -1, 1);
    setPctypeField(values);
  }

  const onImage = (e) => {
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

  return (
    <form action="" ref={form}>
      <label htmlFor="name">Nombre del album</label>
      <input type="text" name="name" id="name"/>
      <label htmlFor="koreanName">Nombre coreano del álbum</label>
      <input type="text" name="koreanName" id="koreanName"/>
      <label htmlFor="releaseDate">Fecha de lanzamiento</label>
      <input type="date" name="releaseDate" id="releaseDate"/>
      <label htmlFor="producers">Productores</label>
      <input type="text" name="producers" id="producers" placeholder="Separados por espacios"/>
      <label htmlFor="group">Grupo</label>
      <input list="group" name="group" />
        <datalist id="group">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      <label htmlFor="version">Versiones</label>
      <input type="text" name="version" id="version"/>
      <br/>
      <input type="text" name="version" id="version"/>
      <label htmlFor="image">Portada</label>
      <label htmlFor="image" className="img-upload button btn-secondary">
        <img src={upload} alt=""/>
        <span>Subir archivo</span>
      </label>
      <input type="file" name="image" id="image" onChange={onImage}/>
      <img className="img-preview" src={file.img} />

      <div className="sub-form-container" onClick={() => setTogglePcTypes(!togglePcTypes)}>
        <p>Versiones de photocards</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg>
      </div>
      {togglePcTypes && (
        <>
        {pctypeField.map((item, index) => (
          <React.Fragment key={index}>
            <input type="text" name={item.name} id={item.name} onChange={e => handleChangeInput(index, e)}/>
            <br/>
          </React.Fragment>
        ))}
          <div className="form__divided">
            <a 
              onClick={() => setPctypeField([...pctypeField, {name: "pcVersion"}])}>Agregar
            </a>
            <a 
              onClick={() => onDeleteInput()}>Borrar último
            </a>
          </div>
        </>
      )}
      <button type="button" className="button btn-primary" onClick={handleSubmit}>Agregar álbum</button>
    </form>
  );
}

export default AlbumForm;