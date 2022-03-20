import React from 'react';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

import upload from '@icons/upload.png';

const PhotocardForm = () => {
  return (
    <form action="">
      <label htmlFor="name">Nombre de la photocard</label>
      <input type="text" name="name" id="name"/>
      <label htmlFor="group">Grupo</label>
      <input list="group" name="group" />
        <datalist id="group">
          <option value="Dreamcatcher"/>
          <option value="Pink Fantasy"/>
          <option value="GFriend"/>
          <option value="IVE"/>
        </datalist>
      <label htmlFor="pcType">Versión de photocard</label>
      <input list="pcType" name="pcType" />
        <datalist id="pcType">
          <option value="Selfie"/>
          <option value="Side A"/>
          <option value="Side B"/>
        </datalist>
      <label htmlFor="member">Miembro</label>
      <input list="member" name="member" />
        <datalist id="member">
          <option value="Handong"/>
          <option value="SuA"/>
          <option value="JiU"/>
          <option value="Dami"/>
        </datalist>
      <label htmlFor="image">Imagen</label>
      <label htmlFor="image" className="img-upload button btn-secondary">
        <img src={upload} alt=""/>
        <span>Subir archivo</span>
      </label>
      <input type="file" name="image" id="image"/>
      <button type="button" className="button btn-primary">Agregar álbum</button>
    </form>
  );
}

export default PhotocardForm;