import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

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
const groupsParams = {
  includeDeleted: false,
	includeUnpublished: false
}

const PhotocardForm = () => {
  const { t } = useTranslation(['photocards', 'validations', 'toaster']);
  const { headerConfig } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);

  const [error, setError] = useState({})
  const [btnClass, setBtnClass] = useState('button btn-primary');
  const [members, setMembers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [pcTypes, setPcTypes] = useState([]);
  const [file, setFile] = useState({});

  const groups = useGetData(API_GROUPS, groupsParams);

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
      setOpenToaster({type: types.SUCCESS, content: t('photocards.success', { ns: 'toaster' })});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: t('photocards.error', { ns: 'toaster' })});
    }
  }

  const handleGroupSelect = (e) => {
    const group = groups.find(x => x.name === e.target.value);
    if(group) {
      setMembers([...group.members]);
      setAlbums([...group.albums]);
    }
  }

  const handleAlbumSelect = async (e) => {
    const album = albums.find(x => x.name === e.target.value);
    if(album) {
      const API_PCTYPE = `${URL}pctypes/albumId/${album.id}`;
      try {
        const response = await axios(API_PCTYPE, headerConfig);
        setPcTypes([...response.data])
      } catch (error) {
        setOpenToaster({type: types.ERROR, content: t('photocards.pc_type_failed', { ns: 'toaster' })});
      }
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
        setError({...error, [e.target.name]: t('required', { ns: 'validations' })});
    } else {
      switch (e.target.name) {
        case 'name':
          if (e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, name: t('photocards.name', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
        break;
        case 'groupId':
          const group = groups.find(x => x.name === e.target.value);
          if (group === undefined) {
            setError({...error, groupId: t('invalid_option', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
        break;
        case 'albumId':
          const album = albums.find(x => x.name === e.target.value);
          if (album === undefined) {
            setError({...error, albumId: t('invalid_option', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
        break;
        case 'pcTypeId':
          const pcType = pcTypes.find(x => x.name === e.target.value);
          if (pcType === undefined) {
            setError({...error, pcTypeId: t('invalid_option', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
        break;
        case 'memberId':
          const member = members.find(x => x.stageName === e.target.value);
          if (member === undefined) {
            setError({...error, memberId: t('invalid_option', { ns: 'validations' })});
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
    if (Object.keys(error).length > 0 || name.length === 0 || member.length === 0 || group.length === 0 || album.length === 0 || pcType.length === 0) {
      setBtnClass(btnClass + ' disable');
    } else {
      setBtnClass('button btn-primary');
    }
  }, [error])

  return (
    <form action="" ref={form}>
      <label htmlFor="name">{t('form.name')}</label>
      <input type="text" name="name" id="name" onBlur={onBlur}/>
      {error.name ? <span className='error-msg'>{error.name}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="groupId">{t('form.group')}</label>
      <input list="groupId" name="groupId" onChange={handleGroupSelect} onBlur={onBlur}/>
      {error.groupId ? <span className='error-msg'>{error.groupId}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="groupId">
          {groups.map(group => (
            <option key={group.id} value={group.name} />
          ))}
        </datalist>
      <label htmlFor="albumId">{t('form.album')}</label>
      <input list="albumId" name="albumId" onChange={handleAlbumSelect} onBlur={onBlur}/>
      {error.albumId ? <span className='error-msg'>{error.albumId}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="albumId">
          {albums.map(album => (
            <option key={album.id} value={album.name} />
          ))}
        </datalist>
      <label htmlFor="pcTypeId">{t('form.pc_type')}</label>
      <input list="pcTypeId" name="pcTypeId" onBlur={onBlur}/>
      {error.pcTypeId ? <span className='error-msg'>{error.pcTypeId}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="pcTypeId">
          {pcTypes.map(pcType => (
            <option key={pcType.id} value={pcType.name} />
          ))}
        </datalist>
      <label htmlFor="memberId">{t('form.member')}</label>
      <input list="memberId" name="memberId" onBlur={onBlur}/>
      {error.memberId ? <span className='error-msg'>{error.memberId}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="memberId">
          {members.map(member => (
            <option key={member.id} value={member.stageName} />
          ))}
        </datalist>
      <label htmlFor="file">{t('form.image')}</label>
      <label htmlFor="file" className="img-upload button btn-secondary">
        <img src={upload} alt=""/>
        <span>{t('form.upload')}</span>
      </label>
      <input type="file" name="file" id="file" onChange={onImage}/>
      <img className="img-preview" src={file.img} />
      <button type="button" disabled={Object.keys(error).length > 0} className={btnClass} onClick={handleSubmit}>{t('form.button')}</button>
    </form>
  );
}

export default PhotocardForm;