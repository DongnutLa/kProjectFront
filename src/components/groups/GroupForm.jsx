import React from 'react';

import '@styles-utils/Forms.scss';
import '@styles-utils/buttons.scss';

const GroupForm = () => {
  return (
    <form action="">
      <label for="name">Nombre del grupo</label>
      <input type="text" name="name" id="name"/>
      <label for="koreanName">Nombre coreano del grupo</label>
      <input type="text" name="koreanName" id="koreanName"/>
      <label for="debutDate">Fecha del debut</label>
      <input type="date" name="debutDate" id="debutDate"/>
      <div className="form__divided">
        <div>
          <label for="membersNumber">Miembros</label>
          <input type="number" name="membersNumber" id="membersNumber"/>
        </div>
        <div>
          <label for="type">Tipo de grupo</label>
          <input list="type" name="type" />
            <datalist id="type">
              <option value="Girl group"/>
              <option value="Boy group"/>
              <option value="Mixto"/>
            </datalist>
        </div>
      </div>
      <label for="company">Empresa</label>
      <input type="text" name="company" id="company"/>
      <label for="fanclubName">Nombre del fanclub</label>
      <input type="text" name="fanclubName" id="fanclubName"/>
      <label for="fanclubBirth">Fecha de creación del fanclub</label>
      <input type="date" name="fanclubBirth" id="fanclubBirth"/>
      <label for="active">Actividad</label>
      <input list="active" name="active" />
        <datalist id="active">
          <option value="Activo"/>
          <option value="Inactivo"/>
        </datalist>
      <label for="instagram">Instagram del grupo</label>
      <input type="text" name="instagram" id="instagram"/>
      <label for="twitter">Twitter del grupo</label>
      <input type="text" name="twitter" id="twitter"/>
      <button type="button" className="button btn-primary">Agregar grupo</button>
    </form>
  );
}

export default GroupForm;