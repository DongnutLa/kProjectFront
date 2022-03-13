import React from 'react';
import '@styles-components/New.scss';

import ive from '@img/ive.jpeg';

const New = () => {
  return (
    <div className="news-card">
      <div className="news-card__img">
        <img src={ive} alt="ive"/>
      </div>
      <div className="news-card__head">
        <p>Girl Group</p>
        <span>1 diciembre 2021</span>
      </div>
      <h4 className="news-card__title">
        El nuevo girl-group de Starship IVE ha debutado
      </h4>
      <p className="news-card__text">
        ¡El nuevo grupo femenino de Starship Entertainment, IVE, ha hecho su debut con su primer álbum sencillo “ELEVEN”!
      </p>
    </div>
  );
}

export default New;