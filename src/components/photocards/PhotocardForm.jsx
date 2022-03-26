import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
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
  const [members, setMembers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [pcTypes, setPcTypes] = useState([]);

  const groups = useGetData(API_GROUPS, headerConfig);
  console.log(groups)

  const form = useRef(null);

  const handleSubmit = (event) => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      memberId: members.find(x => x.stageName === formData.get('member')).id,
      pcTypeId: pcTypes.find(x => x.name === formData.get('pcType')).id,
    }
    console.log(data)
    axios.post(API, data, headerConfig).then(res => {
      console.log('Response: ', res.data);
    });
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
      console.error(error);
    }
  }

  return (
    <form action="" ref={form}>
      <label htmlFor="name">Nombre de la photocard</label>
      <input type="text" name="name" id="name"/>
      <label htmlFor="group">Grupo</label>
      <input list="group" name="group" onChange={handleGroupSelect}/>
        <datalist id="group">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      <label htmlFor="album">Álbum</label>
      <input list="album" name="album" onChange={handleAlbumSelect}/>
        <datalist id="album">
          {albums.map(album => (
            <option key={album.id} value={album.name} />
          ))}
        </datalist>
      <label htmlFor="pcType">Versión de photocard</label>
      <input list="pcType" name="pcType" />
        <datalist id="pcType">
          {pcTypes.map(pcType => (
            <option key={pcType.id} value={pcType.name} />
          ))}
        </datalist>
      <label htmlFor="member">Miembro</label>
      <input list="member" name="member" />
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
      <input type="file" name="image" id="image"/>
      <button type="button" className="button btn-primary" onClick={handleSubmit}>Agregar álbum</button>
    </form>
  );
}

export default PhotocardForm;