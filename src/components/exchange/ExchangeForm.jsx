import React, { Fragment, useState, useContext } from 'react';
import AppContext from '@context/AppContext';

import '@styles-utils/Forms.scss';
import '@styles-components/ExchangeForm.scss';

import Handong from '@img/ETE-O2-Handong.png';
import Siyeon from '@img/ETE-O3-Siyeon.png';

const ExchangeForm = ({type}) => {
  const { addExchange } = useContext(AppContext);

  let pcs = ["JiU", "SuA", "Siyeon", "Handong", "Yoohyeon", "Dami", "Gahyeon"];

  const [exchange, setExchange] = useState({
    GgBg: '',
    Group: '',
    Album: '',
    Member: '',
  });

  const onChange = ({target: {name, value}}) => {
    setExchange({...exchange, [name]: value});
  }

  const handleChanges = () => {
    addExchange(exchange, type);
  }

  return (
    <>
      <label htmlFor="GgBg">Boy/Girl group</label>
      <input list="GgBg" name="GgBg" placeholder="Boy/Girl group" onChange={onChange} value={exchange.GgBg}/>
        <datalist id="GgBg">
          <option value="Girl group"/>
          <option value="Boy group"/>
          <option value="Mixto"/>
        </datalist>
      <label htmlFor="Group">Grupo</label>
      <input list="Group" name="Group" placeholder="Grupo" onChange={onChange} value={exchange.Group}/>
        <datalist id="Group">
          <option value="IVE"/>
          <option value="Dreamcatcher"/>
          <option value="Pink Fantasy"/>
          <option value="G-Friend"/>
          <option value="IU"/>
          <option value="Ailee"/>
        </datalist>
      <label htmlFor="Album">Álbum</label>
      <input list="Album" name="Album" placeholder="Álbum" onChange={onChange} value={exchange.Album}/>
        <datalist id="Album">
          <option value="Eleven"/>
          <option value="Escape The Era"/>
          <option value="Shadow Play"/>
          <option value="Walpurgis Night"/>
          <option value="Lilac"/>
          <option value="Heaven"/>
        </datalist>
      <label htmlFor="Member">Miembro</label>
      <input list="Member" name="Member" placeholder="Miembro" onChange={onChange} value={exchange.Member}/>
        <datalist id="Member">
          <option value="JiU"/>
          <option value="SuA"/>
          <option value="Siyeon"/>
          <option value="Handong"/>
          <option value="Yoohyeon"/>
          <option value="Dami"/>
          <option value="Gahyeon"/>
        </datalist>
      <label htmlFor="Photocard">Selecciona la Photocard</label>
      <div className="form-pcs">
        {pcs.map(pc => (
          <Fragment key={pc}>
            <input type="radio" className="radio_item" name={`photocard_${type}`} id={`${pc}_${type}`} onChange={onChange} value={pc}/>
            <label htmlFor={`${pc}_${type}`} className="label_item" > <img src={Handong}/> </label>
          </Fragment>
        ))}
      </div>
      <button type='button' className='button btn-primary' onClick={handleChanges}>Salvar cambios</button>
    </>
  );
}

export default ExchangeForm;