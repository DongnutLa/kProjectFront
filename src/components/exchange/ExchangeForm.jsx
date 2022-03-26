import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import AuthContext from '@context/AuthContext';
import useGetData from '@hooks/useGetData';

import '@styles-utils/Forms.scss';
import '@styles-components/ExchangeForm.scss';

import Handong from '@img/ETE-O2-Handong.png';
import Siyeon from '@img/ETE-O3-Siyeon.png';

const URL = process.env.API;
const endpoint = 'idols'
const API = `${URL}${endpoint}`;
const API_GROUPS = `${URL}groups`;

const ExchangeForm = ({type, func}) => {
  const [members, setMembers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photocards, setPhotocards] = useState([]);
  const [searchPcParams, setSearchPcParams] = useState({
    albumId: null,
    memberId: null
  })
  const { headerConfig } = useContext(AuthContext);

  const [exchange, setExchange] = useState({
    section: type
  });

  const groups = useGetData(API_GROUPS, headerConfig);

  const onGroupChange = (e) => {
    const group = groups.find(x => x.name === e.target.value);
    setMembers([...group.members]);
    setAlbums([...group.albums]);
  }

  const onChange = ({target: {name, value}}) => {
    setExchange({...exchange, [name]: value});
  }

  const onAlbumChange = async (e) => {
    const album = albums.find(x => x.name === e.target.value);
    setSearchPcParams({...searchPcParams, albumId: album.id});
  }
  
  const onMemberChange = async (e) => {
    const member = members.find(x => x.stageName === e.target.value);
    setSearchPcParams({...searchPcParams, memberId: member.id});
  }

  useEffect(async () => {
    if( searchPcParams.albumId !== null && searchPcParams.memberId !== null) {
      try {
        const API_PCS = `${URL}photocards?albumId=${searchPcParams.albumId}&memberId=${searchPcParams.memberId}`;
        const pcRes = await axios(API_PCS);
        setPhotocards([...pcRes.data]);
      } catch (error) {
        console.error(error);
      }
    }
  }, [searchPcParams])

  useEffect(() => {
    func(exchange)
  }, [exchange])

  return (
    <>
      <label htmlFor="GgBg">Boy/Girl group</label>
      <input list="GgBg" name="GgBg" placeholder="Boy/Girl group"/>
        <datalist id="GgBg">
          <option value="Girl group"/>
          <option value="Boy group"/>
          <option value="Mixto"/>
        </datalist>
      <label htmlFor="Group">Grupo</label>
      <input list="Group" name="Group" placeholder="Grupo" onChange={onGroupChange}/>
      <datalist id="Group">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      <label htmlFor="Album">Álbum</label>
      <input list="Album" name="Album" placeholder="Álbum" onChange={onAlbumChange}/>
        <datalist id="Album">
          {albums.map(album => (
            <option key={album.id} value={album.name} />
          ))}
        </datalist>
      <label htmlFor="Member">Miembro</label>
      <input list="Member" name="Member" placeholder="Miembro" onChange={onMemberChange}/>
        <datalist id="Member">
          {members.map(member => (
            <option key={member.id} value={member.stageName} />
          ))}
        </datalist>
      {photocards.length > 0 && 
        <label htmlFor="Photocard">Selecciona la Photocard</label>
      }
      <div className="form-pcs">
        {photocards.map(pc => (
          <Fragment key={pc.id}>
            <input type="radio" className="radio_item" name={`photocard_${type}`} id={`${pc.name}_${type}`} onChange={onChange} value={pc.id}/>
            <label htmlFor={`${pc.name}_${type}`} className="label_item" > <img src={Handong}/> </label>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default ExchangeForm;