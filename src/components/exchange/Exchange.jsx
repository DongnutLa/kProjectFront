import React, { useState } from 'react';
import { formatDistance, subDays } from 'date-fns';
import '@styles-components/Exchange.scss';
import { useTranslation } from 'react-i18next';

import exch from '@img/exchange.png';

const Exchange = ({ exchange }) => {
  const { t } = useTranslation(['exchanges']);
  const [attach, setAttach] = useState(false);
  const creationDate = formatDistance(subDays(new Date(exchange.creationDate), 0), new Date(), { addSuffix: true });

  const pcHave = exchange.pcFrom.fileUrl;
  const pcWant = exchange.pcTo.fileUrl;

  const getAnexos = () => {
    setAttach(!attach);
  }

  return (
    <>
      <div className="exchange-card">
        <div>
          <div className="card-title">
            <h4>{t('home.have')}</h4>
            <h4>{t('home.want')}</h4>
          </div>
          <div className="card-main">
            <div className="card-main__have" style={{ backgroundImage: `url("${pcHave}")` }}>
            </div>
            <img src={exch} alt="exchange logo"/>
            <div className="card-main__want" style={{ backgroundImage: `url("${pcWant}")` }}>
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
        </div>
        <div className="card-data__buttons">
          <a href="#" onClick={getAnexos}>{t('home.attachments')}</a>
          <button type="button" className="button btn-secondary">{t('home.save')}</button>
          <button type="button" className="button btn-primary">{t('home.exchange')}</button>
        </div>
      </div>
      {attach && (
        <div className="attachments">
          <img src={exchange.fileUrl} alt="attachment" onClick={getAnexos}/>
        </div>
      )}
    </>
  );
}

export default Exchange;