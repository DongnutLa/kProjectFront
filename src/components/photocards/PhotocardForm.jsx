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
    const member = members.find(x => x.stageName === formData.get('member'));
    const pcType = pcTypes.find(x => x.name === formData.get('pcType'));
    const album = albums.find(x => x.name === formData.get('album'));
    const group = groups.find(x => x.name === formData.get('group'));
    const data = {
      name: formData.get('name'),
      memberId: member !== undefined ? member.id : 0,
      albumId: album !== undefined ? album.id : 0,
      pcTypeId: pcType !== undefined ? pcType.id : 0,
      groupId: group !== undefined ? group.id : 0,
    }
    try {
      const res = await axios.post(API, data, headerConfig);
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
        case 'group':
          const group = groups.find(x => x.name === e.target.value);
          if (group === undefined) {
            setError({...error, group: 'Selecciona una opción válida'});
          } else {
            deleteProperty(e.target.name);
          }
        break;
        case 'album':
          const album = albums.find(x => x.name === e.target.value);
          if (album === undefined) {
            setError({...error, album: 'Selecciona una opción válida'});
          } else {
            deleteProperty(e.target.name);
          }
        break;
        case 'pcType':
          const pcType = pcTypes.find(x => x.name === e.target.value);
          if (pcType === undefined) {
            setError({...error, pcType: 'Selecciona una opción válida'});
          } else {
            deleteProperty(e.target.name);
          }
        break;
        case 'member':
          const member = members.find(x => x.stageName === e.target.value);
          if (member === undefined) {
            setError({...error, member: 'Selecciona una opción válida'});
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
    const member = formData.get('member');
    const group = formData.get('group');
    const album = formData.get('album');
    const pcType = formData.get('pcType');
    if (Object.keys(error).length > 0 || name.length === 0 || member.length === 0 || group.length === 0 || album.length === 0 || pcType.length === 0) {
      setBtnClass(btnClass + ' disable');
    } else {
      setBtnClass('button btn-primary');
    }
  }, [error])

  return (
    <form action="" ref={form}>
      <label htmlFor="name">Nombre de la photocard</label>
      <input type="text" name="name" id="name" onBlur={onBlur}/>
      {error.name ? <span className='error-msg'>{error.name}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="group">Grupo</label>
      <input list="group" name="group" onChange={handleGroupSelect} onBlur={onBlur}/>
      {error.group ? <span className='error-msg'>{error.group}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="group">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      <label htmlFor="album">Álbum</label>
      <input list="album" name="album" onChange={handleAlbumSelect} onBlur={onBlur}/>
      {error.album ? <span className='error-msg'>{error.album}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="album">
          {albums.map(album => (
            <option key={album.id} value={album.name} />
          ))}
        </datalist>
      <label htmlFor="pcType">Versión de photocard</label>
      <input list="pcType" name="pcType" onBlur={onBlur}/>
      {error.pcType ? <span className='error-msg'>{error.pcType}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="pcType">
          {pcTypes.map(pcType => (
            <option key={pcType.id} value={pcType.name} />
          ))}
        </datalist>
      <label htmlFor="member">Miembro</label>
      <input list="member" name="member" onBlur={onBlur}/>
      {error.member ? <span className='error-msg'>{error.member}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="member">
          {members.map(member => (
            <option key={member.id} value={member.stageName} />
          ))}
        </datalist>
      <label htmlFor="image">Imagen</label>
      <label htmlFor="image" className="img-upload button btn-secondary">
        <img src={upload} alt=""/>
        <span>Subir archivo</span>
      </label>
      <input type="file" name="image" id="image" onChange={onImage}/>
      <img className="img-preview" src={file.img} />
      <button type="button" disabled={Object.keys(error).length > 0} className={btnClass} onClick={handleSubmit}>Agregar photocard</button>
    </form>
  );
}

export default PhotocardForm;