import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';
import useGetData from '@hooks/useGetData';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

import upload from '@icons/upload.png';

const URL = process.env.API;
const endpoint = 'photocards'
const API = `${URL}${endpoint}`;
const API_GROUPS = `${URL}groups`;

const PhotocardForm = () => {
  const { headerConfig } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);

  const [error, setError] = useState({})
  const [btnClass, setBtnClass] = useState('button btn-primary');
  const [members, setMembers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [pcTypes, setPcTypes] = useState([]);
  const [file, setFile] = useState({});

  const groups = useGetData(API_GROUPS, headerConfig);

  const form = useRef(null);

  const handleSubmit = async (event) => {
    const formData = new FormData(form.current);
    const member = members.find(x => x.stageName === formData.get('memberId'));
    const pcType = pcTypes.find(x => x.name === formData.get('pcTypeId'));
    const album = albums.find(x => x.name === formData.get('albumId'));
    const group = groups.find(x => x.name === formData.get('groupId'));
    formData.set('memberId', member.id);
    formData.set('pcTypeId', pcType.id);
    formData.set('albumId', album.id);
    formData.set('groupId', group.id);
    try {
      const res = await axios.post(API, formData, headerConfig);
      setOpenToaster({type: types.SUCCESS, content: 'Photocard creada correctamente'});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: 'No se pudo crear la photocard'});
    }
  }

  const handleGroupSelect = (e) => {
    const group = groups.find(x => x.name === e.target.value);
    setMembers([...group.members]);
    setAlbums([...group.albums]);
  }

  const handleAlbumSelect = async (e) => {
    const album = albums.find(x => x.name === e.target.value);
    const API_PCTYPE = `${URL}pctypes/albumId/${album.id}`;
    try {
      const response = await axios(API_PCTYPE, headerConfig);
      setPcTypes([...response.data])
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: 'Hubo un error buscando las versiones de photocards'});
    }
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
    if (e.target.value.length === 0) {
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
        case 'groupId':
          const group = groups.find(x => x.name === e.target.value);
          if (group === undefined) {
            setError({...error, groupId: 'Selecciona una opción válida'});
          } else {
            deleteProperty(e.target.name);
          }
        break;
        case 'albumId':
          const album = albums.find(x => x.name === e.target.value);
          if (album === undefined) {
            setError({...error, albumId: 'Selecciona una opción válida'});
          } else {
            deleteProperty(e.target.name);
          }
        break;
        case 'pcTypeId':
          const pcType = pcTypes.find(x => x.name === e.target.value);
          if (pcType === undefined) {
            setError({...error, pcTypeId: 'Selecciona una opción válida'});
          } else {
            deleteProperty(e.target.name);
          }
        break;
        case 'memberId':
          const member = members.find(x => x.stageName === e.target.value);
          if (member === undefined) {
            setError({...error, memberId: 'Selecciona una opción válida'});
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
    const member = formData.get('memberId');
    const group = formData.get('groupId');
    const album = formData.get('albumId');
    const pcType = formData.get('pcTypeId');
    /* if (Object.keys(error).length > 0 || name.length === 0 || member.length === 0 || group.length === 0 || album.length === 0 || pcType.length === 0) {
      setBtnClass(btnClass + ' disable');
    } else {
      setBtnClass('button btn-primary');
    } */
  }, [error])

  return (
    <form action="" ref={form}>
      <label htmlFor="name">Nombre de la photocard</label>
      <input type="text" name="name" id="name" onBlur={onBlur}/>
      {error.name ? <span className='error-msg'>{error.name}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="groupId">Grupo</label>
      <input list="groupId" name="groupId" onChange={handleGroupSelect} onBlur={onBlur}/>
      {error.groupId ? <span className='error-msg'>{error.groupId}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="groupId">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      <label htmlFor="albumId">Álbum</label>
      <input list="albumId" name="albumId" onChange={handleAlbumSelect} onBlur={onBlur}/>
      {error.albumId ? <span className='error-msg'>{error.albumId}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="albumId">
          {albums.map(album => (
            <option key={album.id} value={album.name} />
          ))}
        </datalist>
      <label htmlFor="pcTypeId">Versión de photocard</label>
      <input list="pcTypeId" name="pcTypeId" onBlur={onBlur}/>
      {error.pcTypeId ? <span className='error-msg'>{error.pcTypeId}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="pcTypeId">
          {pcTypes.map(pcType => (
            <option key={pcType.id} value={pcType.name} />
          ))}
        </datalist>
      <label htmlFor="memberId">Miembro</label>
      <input list="memberId" name="memberId" onBlur={onBlur}/>
      {error.memberId ? <span className='error-msg'>{error.memberId}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="memberId">
          {members.map(member => (
            <option key={member.id} value={member.stageName} />
          ))}
        </datalist>
      <label htmlFor="file">Imagen</label>
      <label htmlFor="file" className="img-upload button btn-secondary">
        <img src={upload} alt=""/>
        <span>Subir archivo</span>
      </label>
      <input type="file" name="file" id="file" onChange={onImage}/>
      <img className="img-preview" src={file.img} />
      <button type="button" disabled={Object.keys(error).length > 0} className={btnClass} onClick={handleSubmit}>Agregar photocard</button>
    </form>
  );
}

export default PhotocardForm;