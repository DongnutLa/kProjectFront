import React from 'react';
import { formatDistance, subDays } from 'date-fns';
import '@styles-components/Exchange.scss';

import exch from '@img/exchange.png';

const Exchange = ({ exchange }) => {
  const creationDate = formatDistance(subDays(new Date(exchange.creationDate), 0), new Date(), { addSuffix: true });

  return (
    <div className="exchange-card">
      <div className="card-title">
        <h4>Tengo</h4>
        <h4>Quiero</h4>
      </div>
      <div className="card-main">
        <div className="card-main__have">
        </div>
        <img src={exch} alt="exchange logo"/>
        <div className="card-main__want">
        </div>
      </div>
      <div className="card-data">
        <div className="card-data__labels">
          {exchange.tags && exchange.tags.map(tag => (
            <span key={tag} >{tag}</span>
          ))}
        </div>
        <div className="card-data__info">
          <div>
              <p>{exchange.user.username}</p>
              <p>&#8226;</p>
              <p>Bogotá</p>
          </div>
          <span>{creationDate}</span>
        </div>
        <div className="card-data__description">
          <p>{exchange.information}</p>
        </div>
      </div>
      <div className="card-data__buttons">
        <a href="">Anexos</a>
        <button type="button" className="button btn-secondary">Guardar</button>
        <button type="button" className="button btn-primary">Intercambiar</button>
      </div>
    </div>
  );
}

export default Exchange;