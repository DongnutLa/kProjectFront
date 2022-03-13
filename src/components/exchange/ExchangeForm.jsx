import React from 'react';

import '@styles-utils/Forms.scss';
import '@styles-components/ExchangeForm.scss';

import upload from '@icons/upload.png';
import handong from '@img/ETE-O2-Handong.png';
import siyeon from '@img/ETE-O3-Siyeon.png';

const ExchangeForm = () => {
  return (
    <form action="">
      <label for="GgBg">Boy/Girl group</label>
      <input list="GgBg" name="GgBg" placeholder="Boy/Girl group" />
        <datalist id="GgBg">
          <option value="Girl group"/>
          <option value="Boy group"/>
          <option value="Mixto"/>
        </datalist>
      <label for="Group">Grupo</label>
      <input list="Group" name="Group" placeholder="Grupo" />
        <datalist id="Group">
          <option value="IVE"/>
          <option value="Dreamcatcher"/>
          <option value="Pink Fantasy"/>
          <option value="G-Friend"/>
          <option value="IU"/>
          <option value="Ailee"/>
        </datalist>
      <label for="Album">Álbum</label>
      <input list="Album" name="Album" placeholder="Álbum" />
        <datalist id="Album">
          <option value="Eleven"/>
          <option value="Escape The Era"/>
          <option value="Shadow Play"/>
          <option value="Walpurgis Night"/>
          <option value="Lilac"/>
          <option value="Heaven"/>
        </datalist>
      <label for="Member">Miembro</label>
      <input list="Member" name="Member" placeholder="Miembro" />
        <datalist id="Member">
          <option value="JiU"/>
          <option value="SuA"/>
          <option value="Siyeon"/>
          <option value="Handong"/>
          <option value="Yoohyeon"/>
          <option value="Dami"/>
          <option value="Gahyeon"/>
        </datalist>
      <label for="Pc-mine">Selecciona la Photocard</label>
      <div className="form-pcs">
        <input type="radio" className="radio_item" value="" name="Pc-mine" id="Pc-mine-1"/>
        <label for="Pc-mine-1" className="label_item" > <img src={handong}/> </label>
        <input type="radio" className="radio_item" value="" name="Pc-mine" id="Pc-mine-2"/>
        <label for="Pc-mine-2" className="label_item" > <img src={siyeon}/> </label>
        <input type="radio" className="radio_item" value="" name="Pc-mine" id="Pc-mine-3"/>
        <label for="Pc-mine-3" className="label_item" > <img src={handong}/> </label>
      </div>
      <label for="image">Sube una foto de tu photocard</label>
      <label for="image" className="img-upload button btn-secondary"><img src={upload} alt=""/> <span>Subir archivo</span></label>
      <input type="file" name="image" id="image"/>
      <p>Datos de la photocard que quieres:</p>
      <label for="GgBg">Boy/Girl group</label>
      <input list="GgBg" name="GgBg" placeholder="Boy/Girl group" />
        <datalist id="GgBg">
          <option value="Girl group"/>
          <option value="Boy group"/>
          <option value="Mixto"/>
        </datalist>
      <label for="Group">Grupo</label>
      <input list="Group" name="Group" placeholder="Grupo" />
        <datalist id="Group">
          <option value="IVE"/>
          <option value="Dreamcatcher"/>
          <option value="Pink Fantasy"/>
          <option value="G-Friend"/>
          <option value="IU"/>
          <option value="Ailee"/>
        </datalist>
      <label for="Album">Álbum</label>
      <input list="Album" name="Album" placeholder="Álbum" />
        <datalist id="Album">
          <option value="Eleven"/>
          <option value="Escape The Era"/>
          <option value="Shadow Play"/>
          <option value="Walpurgis Night"/>
          <option value="Lilac"/>
          <option value="Heaven"/>
        </datalist>
      <label for="Member">Miembro</label>
      <input list="Member" name="Member" placeholder="Miembro" />
        <datalist id="Member">
          <option value="JiU"/>
          <option value="SuA"/>
          <option value="Siyeon"/>
          <option value="Handong"/>
          <option value="Yoohyeon"/>
          <option value="Dami"/>
          <option value="Gahyeon"/>
        </datalist>
      <label for="Pc-want">Selecciona la Photocard</label>
      <div className="form-pcs">
        <input type="radio" className="radio_item" value="" name="Pc-want" id="Pc-want-1"/>
        <label for="Pc-want-1" className="label_item" > <img src={handong}/> </label>
        <input type="radio" className="radio_item" value="" name="Pc-want" id="Pc-want-2"/>
        <label for="Pc-want-2" className="label_item" > <img src={siyeon}/> </label>
        <input type="radio" className="radio_item" value="" name="Pc-want" id="Pc-want-3"/>
        <label for="Pc-want-3" className="label_item" > <img src={handong}/> </label>
      </div>

      <label for="content">Información adicional</label>
      <textarea name="content" id="content" cols="30" rows="10" placeholder="Escribe aquí el contenido"></textarea>
      <button type="button" className="button btn-primary">¡Crear!</button>
    </form>
  );
}

export default ExchangeForm;