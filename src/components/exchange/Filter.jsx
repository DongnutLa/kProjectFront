import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '@context/AuthContext';

import '@styles-components/Filter.scss';

const Filter = () => {
  const { userPermissions } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="exchange__filters">
      {userPermissions.includes('EDIT_EXCHANGES') && 
        <a onClick={() => navigate('/exchange/create')}><span>¿Crear un intercambio?</span></a>
      }
      <p>Filtrar</p>
      <form action="">
        <input list="GgBg" name="GgBg" placeholder="Boy/Girl group" />
        <datalist id="GgBg">
          <option value="Girl group"/>
          <option value="Boy group"/>
          <option value="Mixto"/>
        </datalist>
        <input list="Group" name="Group" placeholder="Grupo" />
        <datalist id="Group">
          <option value="IVE"/>
          <option value="Dreamcatcher"/>
          <option value="Pink Fantasy"/>
          <option value="G-Friend"/>
          <option value="IU"/>
          <option value="Ailee"/>
        </datalist>
        <input list="Album" name="Album" placeholder="Album" />
        <datalist id="Album">
          <option value="Eleven"/>
          <option value="Escape The Era"/>
          <option value="Shadow Play"/>
          <option value="Walpurgis Night"/>
          <option value="Lilac"/>
          <option value="Heaven"/>
        </datalist>
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
        <input list="Saved" name="Saved" placeholder="Guardados" />
        <datalist id="Saved">
          <option value="Shadow Play"/>
          <option value="Lilac"/>
        </datalist>
      </form>
    </div>
  );
}

export default Filter;