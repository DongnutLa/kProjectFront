import React from 'react';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

import upload from '@icons/upload.png'

const AlbumForm = () => {
  return (
    <form action="">
      <label for="name">Nombre del album</label>
      <input type="text" name="name" id="name"/>
      <label for="koreanName">Nombre coreano del álbum</label>
      <input type="text" name="koreanName" id="koreanName"/>
      <label for="releaseDate">Fecha de lanzamiento</label>
      <input type="date" name="releaseDate" id="releaseDate"/>
      <label for="producers">Productores</label>
      <input type="text" name="producers" id="producers" placeholder="Separados por espacios"/>
      <label for="group">Grupo</label>
      <input list="group" name="group" />
        <datalist id="group">
          <option value="Dreamcatcher"/>
          <option value="Pink Fantasy"/>
          <option value="GFriend"/>
          <option value="IVE"/>
        </datalist>
      <label for="version">Versiones</label>
      <input type="text" name="version" id="version"/>
      <br/>
      <input type="text" name="version" id="version"/>
      <label for="image">Portada</label>
      <label for="image" class="img-upload button btn-secondary">
        <img src={upload} alt=""/>
        <span>Subir archivo</span>
      </label>
      <input type="file" name="image" id="image"/>
      <label for="pc-version">Versiones de photocards</label>
      <input type="text" name="pc-version" id="pc-version"/>
      <br/>
      <input type="text" name="pc-version" id="pc-version"/>
      <button type="button" class="button btn-primary">Agregar álbum</button>
    </form>
  );
}

export default AlbumForm;