import React, { useContext, useRef, useState } from 'react';
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
    const data = {
      name: formData.get('name'),
      memberId: member !== undefined ? member.id : 0,
      albumId: album !== undefined ? album.id : 0,
      pcTypeId: pcType !== undefined ? pcType.id : 0,
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
      <input type="file" name="image" id="image" onChange={onImage}/>
      <img className="img-preview" src={file.img} />
      <button type="button" className="button btn-primary" onClick={handleSubmit}>Agregar álbum</button>
    </form>
  );
}

export default PhotocardForm;