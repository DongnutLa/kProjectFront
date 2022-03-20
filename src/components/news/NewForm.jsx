import React from 'react';

import '@styles-utils/Forms.scss';

import upload from '@icons/upload.png';

const NewForm = () => {
  return (
    <form action="">
      <label htmlFor="title">Título</label>
      <input type="text" name="title" id="title" placeholder="Título de la noticia"/>
      <label htmlFor="content">contenido</label>
      <textarea name="content" id="content" cols="30" rows="10" placeholder="Escribe aquí el contenido"></textarea>
      <label htmlFor="image">Imagen</label>
      <label htmlFor="image" className="img-upload button btn-secondary"><img src={upload} alt=""/> <span>Subir archivo</span></label>
      <input type="file" name="image" id="image"/>
      <label htmlFor="source">Fuente</label>
      <input type="text" name="source" id="source" placeholder="Fuente de la información"/>
      <label htmlFor="labels">Etiquetas</label>
      <input type="text" name="labels" id="labels" placeholder="Separadas por espacios"/>
      <button type="button" className="button btn-primary">¡Crear!</button>
    </form>
  );
}

export default NewForm;