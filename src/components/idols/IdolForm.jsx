import React from 'react';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

const IdolForm = () => {
  return (
    <form action="">
      <div className="form__divided">
        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" id="name"/>
        </div>
        <div>
          <label htmlFor="koreanName">Nombre coreano</label>
          <input type="text" name="koreanName" id="koreanName"/>
        </div>
      </div>
      <div className="form__divided">
        <div>
          <label htmlFor="stageName">Nombre artístico</label>
          <input type="text" name="stageName" id="stageName"/>
        </div>
        <div>
          <label htmlFor="stageNameKr">Nombre artístico (Kr)</label>
          <input type="text" name="stageNameKr" id="stageNameKr"/>
        </div>
      </div>
      <label htmlFor="birthday">Fecha de nacimiento</label>
      <input type="date" name="birthday" id="birthday"/>
      <label htmlFor="nationality">Nacionalidad</label>
      <input type="text" name="nationality" id="nationality"/>
      <label htmlFor="birthPlace">Lugar de nacimiento</label>
      <input type="text" name="birthPlace" id="birthPlace"/>
      <label htmlFor="position">Posición</label>
      <input type="text" name="position" id="position"/>
      <label htmlFor="instagram">Instagram</label>
      <input type="text" name="instagram" id="instagram"/>
      <label htmlFor="twitter">Twitter</label>
      <input type="text" name="twitter" id="twitter"/>
      <label htmlFor="group">Grupo</label>
      <input list="group" name="group" />
        <datalist id="group">
          <option value="Dreamcatcher"/>
          <option value="Pink Fantasy"/>
          <option value="GFriend"/>
          <option value="IVE"/>
        </datalist>
      <button type="button" className="button btn-primary">Agregar Idol</button>
    </form>
  );
}

export default IdolForm;