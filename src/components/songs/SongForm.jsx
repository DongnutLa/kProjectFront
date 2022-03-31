import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';
import useGetData from '@hooks/useGetData';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

const URL = process.env.API;
const endpoint = 'songs'
const API = `${URL}${endpoint}`;
const API_ALBUMS = `${URL}albums`;

const SongForm = () => {
  const { headerConfig } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);

  const [error, setError] = useState({})
  const [btnClass, setBtnClass] = useState('button btn-primary');

  const albums = useGetData(API_ALBUMS, headerConfig);
  
  const form = useRef(null);

  const handleSubmit = async (event) => {
    const formData = new FormData(form.current);
    const album = albums.find(x => x.name === formData.get('album'));
    const data = {
      title: formData.get('title'),
      duration: formData.get('duration'),
      albumId: album !== undefined ? album.id : 0,
    }
    if (formData.get('lyrics').length > 0) data.lyrics = formData.get('lyrics').split(" ");
    if (formData.get('music').length > 0) data.music = formData.get('music').split(" ");
    if (formData.get('arrangements').length > 0) data.arrangements = formData.get('arrangements').split(" ");
    try {
      const res = await axios.post(API, data, headerConfig);
      setOpenToaster({type: types.SUCCESS, content: 'Canción agregada correctamente'});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: 'No se pudo agregar la canción'});
    }
  }

  const onBlur = (e) => {
    const timeValid = new RegExp(/^([0-1]?[0-9]|5[0-9]):[0-5][0-9]$/);
    if (e.target.value.length === 0 && e.target.name !== 'lyrics' && e.target.name !== 'music' && e.target.name !== 'arrangements') {
        setError({...error, [e.target.name]: 'Este campo es obligatorio*'});
    } else {
      switch (e.target.name) {
        case 'title':
          if (e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, title: 'El título debe tener entre 3 y 20 carácteres'});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'duration':
          if (!timeValid.test(e.target.value)) {
            setError({...error, duration: 'No es una duración válida'});
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
    const lyrics = formData.get('lyrics').split(" ");
    const music = formData.get('music').split(" ");
    const arrangements = formData.get('arrangements').split(" ");
    const duration = formData.get('duration');
    const albumId = formData.get('album');
    if (Object.keys(error).length > 0 || title.length === 0 || lyrics.length === 0 || music.length === 0 || arrangements.length === 0 || duration.length === 0 || albumId.length === 0) {
      setBtnClass(btnClass + ' disable');
    } else {
      setBtnClass('button btn-primary');
    }
  }, [error])

  const onChangeDuration = (e) => {
    if(e.target.value.length == 2 && !e.target.value.includes(':')) {
      e.target.value += ':';
    }
    if (e.target.value.length > 4) {
      e.target.value = e.target.value.split('', 5).join('');
    }
  }

  return (
    <form action="" ref={form}>
      <label htmlFor="title">Título</label>
      <input type="text" name="title" id="title" onBlur={onBlur}/>
      {error.title ? <span className='error-msg'>{error.title}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="lyrics">Letra por</label>
      <input type="text" name="lyrics" id="lyrics" onBlur={onBlur}/>
      {error.lyrics ? <span className='error-msg'>{error.lyrics}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="music">Musica por</label>
      <input type="text" name="music" id="music" onBlur={onBlur}/>
      {error.music ? <span className='error-msg'>{error.music}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="arrangements">Arreglos por</label>
      <input type="text" name="arrangements" id="arrangements" onBlur={onBlur}/>
      {error.arrangements ? <span className='error-msg'>{error.arrangements}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="duration">Duración</label>
      <input type="text" name="duration" id="duration" onBlur={onBlur} onChange={onChangeDuration}/>
      {error.duration ? <span className='error-msg'>{error.duration}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="album">Álbum</label>
      <input list="album" name="album" onBlur={onBlur}/>
      {error.album ? <span className='error-msg'>{error.album}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="album">
          {albums.map(album => (
            <option key={album.id} value={album.name} />
          ))}
        </datalist>
      <button type="button" disabled={Object.keys(error).length > 0} className={btnClass} onClick={handleSubmit}>Agregar canción</button>
    </form>
  );
}

export default SongForm;