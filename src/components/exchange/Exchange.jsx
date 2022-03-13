import React from 'react';
import '@styles-components/Exchange.scss';

import exchange from '@img/exchange.png';

const Exchange = () => {
  return (
    <div className="exchange-card">
      <div className="card-title">
        <h4>Tengo</h4>
        <h4>Quiero</h4>
      </div>
      <div className="card-main">
        <div className="card-main__have">
        </div>
        <img src={exchange} alt="exchange logo"/>
        <div className="card-main__want">
        </div>
      </div>
      <div className="card-data">
        <div className="card-data__labels">
          <span>Dreamcatcher</span>
          <span>Escape The Era</span>
          <span>Handong</span>
          <span>Handong</span>
        </div>
        <div className="card-data__info">
          <div>
              <p>DongnutLa</p>
              <p>&#8226;</p>
              <p>Bogotá</p>
          </div>
          <span>13 enero del 2022</span>
        </div>
        <div className="card-data__description">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo consequuntur id nihil velit amet reprehenderit dolorum earum! Assumenda commodi aliquam ea odio natus modi, nostrum possimus dolorem tenetur iusto sequi.</p>
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