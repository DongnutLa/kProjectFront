import React from 'react';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

const SongForm = () => {
  return (
    <form action="">
      <label for="title">Título</label>
      <input type="text" name="title" id="title"/>
      <label for="lyrics">Letra por</label>
      <input type="text" name="lyrics" id="lyrics"/>
      <label for="music">Musica por</label>
      <input type="text" name="music" id="music"/>
      <label for="arrangements">Arreglos por</label>
      <input type="text" name="arrangements" id="arrangements"/>
      <label for="duration">Duración</label>
      <input type="time" name="duration" id="duration"/>
      <label for="album">Álbum</label>
      <input list="album" name="album" />
        <datalist id="album">
          <option value="Escape the era"/>
          <option value="Poison"/>
          <option value="Walpurgis Night"/>
          <option value="Eleven"/>
        </datalist>
      <button type="button" className="button btn-primary">Agregar canción</button>
    </form>
  );
}

export default SongForm;