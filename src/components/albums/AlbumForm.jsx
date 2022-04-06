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

  const [error, setError] = useState({})
  const [btnClass, setBtnClass] = useState('button btn-primary');
  const [togglePcTypes, setTogglePcTypes] = useState(false);
  const [pctypeField, setPctypeField] = useState([{name: "pcVersion"}])
  const [file, setFile] = useState({});

  const groups = useGetData(API_GROUPS, headerConfig);

  const form = useRef(null);

  const handleSubmit = async (event) => {
    const formData = new FormData(form.current);
    const group = groups.find(x => x.name === formData.get('groupId'));
    formData.set('groupId', group.id);
    const producers = formData.get('producers').split(" ");
    formData.delete('producers');
    producers.forEach(producer => {
      formData.append('producers[]', producer);
    });
    if(formData.get('pcVersion')) formData.delete('pcVersion');
    
    try {
      var res = await axios.post(API_ALBUMS, formData, headerConfig);
      setOpenToaster({type: types.SUCCESS, content: 'Álbum creado correctamente'});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: 'Hubo un error al crear el álbum'});
    }
    
    pctypeField.forEach(async (item) => {
      if (Object.keys(item).length > 1) {
        const sendData = {
          albumId: res.data.id,
          groupId: res.data.groupId,
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

  const onBlur = (e) => {
    const dateValid = new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/);
    const today = parseInt(new Date().toISOString().split('-', 1).join());

    if (e.target.value.length === 0 && e.target.name !== 'producers') {
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
        case 'releaseDate':
          const year = parseInt(e.target.value.split('-', 1).join());
          if (!dateValid.test(e.target.value)) {
            setError({...error, releaseDate: 'La fecha no es válida'});
          } else if (year < 1990 || year > today) {
            setError({...error, releaseDate: `El año debe ser mayor a 1990 y menor a ${today}`});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'producers':
          if (e.target.value.length < 3 && e.target.value.length > 0) {
            setError({...error, producers: 'Debe haber al menos un productor mayor a 3 dígitos'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'groupId':
          const group = groups.find(x => x.name === e.target.value);
          if (group === undefined) {
            setError({...error, groupId: 'Selecciona una opción válida'});
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
    const releaseDate = formData.get('releaseDate');
    const group = formData.get('groupId');
    if (Object.keys(error).length > 0 || name.length === 0 || koreanName.length === 0 || releaseDate.length === 0 || group.length === 0) {
      setBtnClass(btnClass + ' disable');
    } else {
      setBtnClass('button btn-primary');
    }
  }, [error])

  return (
    <form action="" ref={form}>
      <label htmlFor="name">Nombre del album</label>
      <input type="text" name="name" id="name" onBlur={onBlur}/>
      {error.name ? <span className='error-msg'>{error.name}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="koreanName">Nombre coreano del álbum</label>
      <input type="text" name="koreanName" id="koreanName" onBlur={onBlur}/>
      {error.koreanName ? <span className='error-msg'>{error.koreanName}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="releaseDate">Fecha de lanzamiento</label>
      <input type="date" name="releaseDate" id="releaseDate" onBlur={onBlur}/>
      {error.releaseDate ? <span className='error-msg'>{error.releaseDate}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="producers">Productores</label>
      <input type="text" name="producers" id="producers" placeholder="Separados por espacios" onBlur={onBlur}/>
      {error.producers ? <span className='error-msg'>{error.producers}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="groupId">Grupo</label>
      <input list="groupId" name="groupId" onBlur={onBlur}/>
      {error.groupId ? <span className='error-msg'>{error.groupId}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="groupId">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      {/* <label htmlFor="version">Versiones</label>
      <input type="text" name="version" id="version"/>
      <br/>
      <input type="text" name="version" id="version"/> */}
      <label htmlFor="file">Portadas</label>
      <label htmlFor="file" className="img-upload button btn-secondary">
        <img src={upload} alt=""/>
        <span>Subir archivo</span>
      </label>
      <input type="file" multiple name="file" id="file" onChange={onImage}/>
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
      <button type="button" disabled={Object.keys(error).length > 0} className={btnClass} onClick={handleSubmit}>Agregar álbum</button>
    </form>
  );
}

export default AlbumForm;