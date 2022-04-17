import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';
import useGetData from '@hooks/useGetData';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

const URL = process.env.REACT_API_URL;
const endpoint = 'songs'
const API = `${URL}${endpoint}`;
const API_GROUPS = `${URL}groups`;
const groupsParams = {
  includeDeleted: false,
	includeUnpublished: false
}

const SongForm = () => {
  const { t } = useTranslation(['songs', 'validations', 'toaster']);
  const { headerConfig } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);

  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState({})
  const [btnClass, setBtnClass] = useState('button btn-primary');

  const groups = useGetData(API_GROUPS, groupsParams);
  
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
      setOpenToaster({type: types.SUCCESS, content: t('songs.success', { ns: 'toaster' })});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: t('songs.error', { ns: 'toaster' })});
    }
  }

  const onBlur = (e) => {
    const timeValid = new RegExp(/^([0-1]?[0-9]|5[0-9]):[0-5][0-9]$/);
    if (e.target.value.length === 0 && e.target.name !== 'lyrics' && e.target.name !== 'music' && e.target.name !== 'arrangements') {
        setError({...error, [e.target.name]: t('required', { ns: 'validations' })});
    } else {
      switch (e.target.name) {
        case 'title':
          if (e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, title: t('songs.title', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'duration':
          if (!timeValid.test(e.target.value)) {
            setError({...error, duration: t('invalid_time', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'album':
          const album = albums.find(x => x.name === e.target.value);
          if (album === undefined) {
            setError({...error, album: t('invalid_option', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'group':
          const group = groups.find(x => x.name === e.target.value);
          if (group === undefined) {
            setError({...error, group: t('invalid_option', { ns: 'validations' })});
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

  const handleGroupSelect = (e) => {
    const group = groups.find(x => x.name === e.target.value);
    if(group) {
      setAlbums([...group.albums]);
    }
  }

  return (
    <form action="" ref={form}>
      <label htmlFor="title">{t('form.title')}</label>
      <input type="text" name="title" id="title" onBlur={onBlur}/>
      {error.title ? <span className='error-msg'>{error.title}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="lyrics">{t('form.lyrics')}</label>
      <input type="text" name="lyrics" id="lyrics" onBlur={onBlur}/>
      {error.lyrics ? <span className='error-msg'>{error.lyrics}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="music">{t('form.music')}</label>
      <input type="text" name="music" id="music" onBlur={onBlur}/>
      {error.music ? <span className='error-msg'>{error.music}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="arrangements">{t('form.arrangements')}</label>
      <input type="text" name="arrangements" id="arrangements" onBlur={onBlur}/>
      {error.arrangements ? <span className='error-msg'>{error.arrangements}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="duration">{t('form.duration')}</label>
      <input type="text" name="duration" id="duration" onBlur={onBlur} onChange={onChangeDuration}/>
      {error.duration ? <span className='error-msg'>{error.duration}</span> : <span className='error-msg'>&nbsp;</span>}
      
      <label htmlFor="group">{t('form.group')}</label>
      <input list="group" name="group" onBlur={onBlur} onChange={handleGroupSelect}/>
      {error.group ? <span className='error-msg'>{error.group}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="group">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      
      <label htmlFor="album">{t('form.album')}</label>
      <input list="album" name="album" onBlur={onBlur}/>
      {error.album ? <span className='error-msg'>{error.album}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="album">
          {albums.map(album => (
            <option key={album.id} value={album.name} />
          ))}
        </datalist>
      <button type="button" disabled={Object.keys(error).length > 0} className={btnClass} onClick={handleSubmit}>{t('form.button')}</button>
    </form>
  );
}

export default SongForm;