import React, { useContext, useRef } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import useGetData from '@hooks/useGetData';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

const URL = process.env.API;
const endpoint = 'songs'
const API = `${URL}${endpoint}`;
const API_ALBUMS = `${URL}albums`;

const SongForm = () => {
  const { headerConfig } = useContext(AuthContext);

  const albums = useGetData(API_ALBUMS, headerConfig);
  
  const form = useRef(null);

  const handleSubmit = (event) => {
    const formData = new FormData(form.current);
    const data = {
      title: formData.get('title'),
      lyrics: formData.get('lyrics').split(" "),
      music: formData.get('music').split(" "),
      arrangements: formData.get('arrangements').split(" "),
      duration: formData.get('duration'),
      albumId: albums.find(x => x.name === formData.get('album')).id,
    }
    axios.post(API, data, headerConfig).then(res => {
      console.log('Response: ', res.data);
    });
  }

  return (
    <form action="" ref={form}>
      <label htmlFor="title">Título</label>
      <input type="text" name="title" id="title"/>
      <label htmlFor="lyrics">Letra por</label>
      <input type="text" name="lyrics" id="lyrics"/>
      <label htmlFor="music">Musica por</label>
      <input type="text" name="music" id="music"/>
      <label htmlFor="arrangements">Arreglos por</label>
      <input type="text" name="arrangements" id="arrangements"/>
      <label htmlFor="duration">Duración</label>
      <input type="time" name="duration" id="duration"/>
      <label htmlFor="album">Álbum</label>
      <input list="album" name="album" />
        <datalist id="album">
          {albums.map(album => (
            <option key={album.id} value={album.name} />
          ))}
        </datalist>
      <button type="button" className="button btn-primary" onClick={handleSubmit}>Agregar canción</button>
    </form>
  );
}

export default SongForm;