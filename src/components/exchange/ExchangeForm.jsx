import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import AuthContext from '@context/AuthContext';
import useGetData from '@hooks/useGetData';

import '@styles-utils/Forms.scss';
import '@styles-components/ExchangeForm.scss';

const URL = process.env.API;
const endpoint = 'idols'
const API = `${URL}${endpoint}`;
const API_GROUPS = `${URL}groups`;

const ExchangeForm = ({type, func, errors}) => {
  const { t } = useTranslation(['exchanges', 'validations']);
  const [error, setError] = useState({})
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
    if (group) {
      setMembers([...group.members]);
      setAlbums([...group.albums]);
    }
  }

  const onChange = ({target: {name, value}}) => {
    setExchange({...exchange, [name]: value});
  }

  const onAlbumChange = async (e) => {
    const album = albums.find(x => x.name === e.target.value);
    if (album) setSearchPcParams({...searchPcParams, albumId: album.id});
  }
  
  const onMemberChange = async (e) => {
    const member = members.find(x => x.stageName === e.target.value);
    if (member) setSearchPcParams({...searchPcParams, memberId: member.id});
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const API_PCS = `${URL}photocards?albumId=${searchPcParams.albumId}&memberId=${searchPcParams.memberId}`;
        const pcRes = await axios(API_PCS, headerConfig);
        setPhotocards([...pcRes.data]);
      } catch (error) {
        console.error(error);
      }
    }
    if( searchPcParams.albumId !== null && searchPcParams.memberId !== null) {
      fetchData();
    }
  }, [searchPcParams])

  useEffect(() => {
    func(exchange);
  }, [exchange])

  useEffect(() => {
    errors(error);
  }, [error])

  const onBlur = (e) => {
    switch (e.target.id) {
      case 'Group':
        const group = groups.find(x => x.name === e.target.value);
        if (group === undefined) {
          setError({...error, Group: t('invalid_option', { ns: 'validations' })});
        } else {
          deleteProperty(e.target.name);
        }
        break;
        case 'Album':
          const album = albums.find(x => x.name === e.target.value);
          if (album === undefined) {
            setError({...error, Album: t('invalid_option', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
          break;
      case 'Member':
        const member = members.find(x => x.stageName === e.target.value);
        if (member === undefined) {
          setError({...error, Member: t('invalid_option', { ns: 'validations' })});
        } else {
          deleteProperty(e.target.name);
        }
        break;
      default:
        break;
    }
  }

  const deleteProperty = (prop) => {
    const errorState = JSON.parse(JSON.stringify(error));
    delete errorState[prop];
    setError(errorState)
  }

  return (
    <>
      <label htmlFor="GgBg">{t('form.type')}</label>
      <input list="GgBg"/>
        <datalist id="GgBg">
          <option value="Girl group"/>
          <option value="Boy group"/>
          <option value="Mixto"/>
        </datalist>
      <label htmlFor="Group">{t('form.group')}</label>
      <input list="Group" id="Group" onChange={onGroupChange} onBlur={onBlur}/>
      {error.Group ? <span className='error-msg'>{error.Group}</span> : <span className='error-msg'>&nbsp;</span>}
      <datalist id="Group">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      <label htmlFor="Album">{t('form.album')}</label>
      <input list="Album" id="Album" onChange={onAlbumChange} onBlur={onBlur}/>
      {error.Album ? <span className='error-msg'>{error.Album}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="Album">
          {albums.map(album => (
            <option key={album.id} value={album.name} />
          ))}
        </datalist>
      <label htmlFor="Member">{t('form.member')}</label>
      <input list="Member" id="Member" onChange={onMemberChange} onBlur={onBlur}/>
      {error.Member ? <span className='error-msg'>{error.Member}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="Member">
          {members.map(member => (
            <option key={member.id} value={member.stageName} />
          ))}
        </datalist>
      {photocards.length > 0 && 
        <label htmlFor="Photocard">{t('form.photocard')}</label>
      }
      <div className="form-pcs">
        {photocards.map(pc => (
          <Fragment key={pc.id}>
            <input type="radio" className="radio_item" name={`photocard_${type}`} id={`${pc.name}_${type}`} onChange={onChange} value={pc.id} onBlur={onBlur}/>
            <label htmlFor={`${pc.name}_${type}`} className="label_item" > <img src={pc.fileUrl}/> </label>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default ExchangeForm;