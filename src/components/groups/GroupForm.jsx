import React, { useContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

import upload from '@icons/upload.png';

const URL = process.env.API;
const endpoint = 'groups'
const API = `${URL}${endpoint}`;

const groupTypes = ['Girl group', 'Boy group', 'Mixto'];

const GroupForm = () => {
  const { t } = useTranslation(['groups', 'validations', 'toaster']);
  const { headerConfig } = useContext(AuthContext);
  const { types, setOpenToaster } = useContext(ToasterContext);
  
  const [error, setError] = useState({})
  const [btnClass, setBtnClass] = useState('button btn-primary');
  const [active, setActive] = useState(null);
  const form = useRef(null);
  
  const activeData = [t('form.active_true'), t('form.active_false')];
  
  const handleSubmit = async (event) => {
    const formData = new FormData(form.current);
    if (formData.get('fanclubName').length == 0) formData.delete('fanclubName')
    if (formData.get('fanclubBirth').length == 0) formData.delete('fanclubBirth')
    if (formData.get('instagram').length == 0) formData.delete('instagram')
    if (formData.get('twitter').length == 0) formData.delete('twitter')
    formData.append('active', active);
    try {
      const res = await axios.post(API, formData, headerConfig);
      setOpenToaster({type: types.SUCCESS, content: t('groups.success', {ns: 'toaster'})});
    } catch (error) {
      setOpenToaster({type: types.ERROR, content: t('groups.error', {ns: 'toaster'})});
    }
  }

  const onBlur = (e) => {
    const dateValid = new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/);
    const today = parseInt(new Date().toISOString().split('-', 1).join());
    if ((e.target.value === null || e.target.value.length === 0) && e.target.name !== 'instagram' && e.target.name !== 'twitter' && e.target.name !== 'fanclubName' && e.target.name !== 'fanclubBirth') {
        setError({...error, [e.target.name]: t('required', { ns: 'validations' })});
    } else {
      switch (e.target.name) {
        case 'name':
          if (e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, name: t('groups.name', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'koreanName':
          if (e.target.value.length <= 1 || e.target.value.length > 10) {
            setError({...error, koreanName: t('groups.korean_name', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'debutDate':
          const year = parseInt(e.target.value.split('-', 1).join());
          if (!dateValid.test(e.target.value)) {
            setError({...error, debutDate: t('invalid_date', { ns: 'validations' })});
          } else if (year < 1990 || year > today) {
            setError({...error, debutDate: t('groups.debut', { ns: 'validations', today: today })});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'membersNumber':
          if (e.target.value >= 30) {
            setError({...error, membersNumber: t('groups.members_less', { ns: 'validations' })});
          } else if (e.target.value < 1) {
            setError({...error, membersNumber: t('groups.members_more', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'type':
          if (!groupTypes.includes(e.target.value)) {
            setError({...error, type: t('invalid_type', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'company':
          if (e.target.value.length < 3 || e.target.value.length > 50) {
            setError({...error, company: t('groups.company', { ns: 'validations' })});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'fanclubName':
          if (e.target.value === null || e.target.value.length < 3 || e.target.value.length > 20) {
            setError({...error, fanclubName: t('groups.name', { ns: 'validations'})});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'fanclubBirth':
          let yearFc = parseInt(e.target.value.split('-', 1).join());
          if (!dateValid.test(e.target.value)) {
            setError({...error, fanclubBirth: t('invalid_date', { ns: 'validations' })});
          } else if (yearFc < 1990 || yearFc > today) {
            setError({...error, fanclubBirth: t('groups.debut', { ns: 'validations', today: today })});
          } else {
            deleteProperty(e.target.name);
          }
          break;
        case 'active':
          if (!active.includes(e.target.value)) {
            setError({...error, active: t('invalid_option', { ns: 'invalid_option' })});
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
    if (Object.keys(error).length > 0 || formData.get('name').length === 0 
      || formData.get('koreanName').length === 0 || formData.get('debutDate').length === 0 
      || formData.get('membersNumber').length === 0 || formData.get('type').length === 0 
      || formData.get('company').length === 0 || active === null) {
      setBtnClass(btnClass + ' disable');
    } else {
      setBtnClass('button btn-primary');
    }
  }, [error, active])

  const onChangeActive = (e) => {
    setActive(e.target.value === 'Activo' ? true : false);
  }

  return (
    <form action="" ref={form}>
      <label htmlFor="name">{t('form.name')}</label>
      <input type="text" name="name" id="name" onBlur={onBlur}/>
      {error.name ? <span className='error-msg'>{error.name}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="koreanName">{t('form.korean_name')}</label>
      <input type="text" name="koreanName" id="koreanName" onBlur={onBlur}/>
      {error.koreanName ? <span className='error-msg'>{error.koreanName}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="debutDate">{t('form.debut')}</label>
      <input type="date" name="debutDate" id="debutDate" onBlur={onBlur}/>
      {error.debutDate ? <span className='error-msg'>{error.debutDate}</span> : <span className='error-msg'>&nbsp;</span>}
      <div className="form__divided">
        <div>
          <label htmlFor="membersNumber">{t('form.members')}</label>
          <input type="number" name="membersNumber" id="membersNumber" min={1} max={29} onBlur={onBlur}/>
          {error.membersNumber ? <span className='error-msg'>{error.membersNumber}</span> : <span className='error-msg'>&nbsp;</span>}
        </div>
        <div>
          <label htmlFor="type">{t('form.type')}</label>
          <input list="type" name="type" onBlur={onBlur}/>
          {error.type ? <span className='error-msg'>{error.type}</span> : <span className='error-msg'>&nbsp;</span>}
            <datalist id="type">
              {groupTypes && groupTypes.map(type =>
                <option key={type} value={type}/>
              )}
            </datalist>
        </div>
      </div>
      <label htmlFor="company">{t('form.company')}</label>
      <input type="text" name="company" id="company" onBlur={onBlur}/>
      {error.company ? <span className='error-msg'>{error.company}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="fanclubName">{t('form.fanclub_name')}</label>
      <input type="text" name="fanclubName" id="fanclubName" onBlur={onBlur}/>
      {error.fanclubName ? <span className='error-msg'>{error.fanclubName}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="fanclubBirth">{t('form.fanclub_date')}</label>
      <input type="date" name="fanclubBirth" id="fanclubBirth" onBlur={onBlur}/>
      {error.fanclubBirth ? <span className='error-msg'>{error.fanclubBirth}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="active">{t('form.active')}</label>
      <input list="active" onBlur={onBlur} onChange={onChangeActive}/>
      {error.active ? <span className='error-msg'>{error.active}</span> : <span className='error-msg'>&nbsp;</span>}
        <datalist id="active">
          {activeData && activeData.map(item =>
            <option key={item} value={item}/>
          )}
        </datalist>
      <label htmlFor="instagram">{t('form.instagram')}</label>
      <input type="text" name="instagram" id="instagram" onBlur={onBlur}/>
      {error.instagam ? <span className='error-msg'>{error.instagam}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="twitter">{t('form.twitter')}</label>
      <input type="text" name="twitter" id="twitter" onBlur={onBlur}/>
      {error.twitter ? <span className='error-msg'>{error.twitter}</span> : <span className='error-msg'>&nbsp;</span>}
      <label htmlFor="file">{t('form.images')}</label>
      <label htmlFor="file" className="img-upload button btn-secondary"><img src={upload} alt=""/> <span>{t('form.select_photos')}</span></label>
      <input type="file" multiple name="file" id="file"/>
      <button type="button" disabled={Object.keys(error).length > 0} className={btnClass} onClick={handleSubmit}>{t('form.button')}</button>
    </form>
  );
}

export default GroupForm;