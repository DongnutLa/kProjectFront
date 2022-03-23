import React from 'react';
import Exchange from '@components/exchange/Exchange';
import useGetData from '@hooks/useGetData';

import '@styles-containers/Exchanges.scss';

const URL = process.env.API;
const endpoint = 'exchanges'
const API = `${URL}/${endpoint}`;

const Exchanges = () => {
  const exchanges = useGetData(API);

  return (
    <div className="exchange__body">
      {exchanges.map(exchange => (
        <Exchange exchange={exchange} key={exchange.id} />
      ))}
    </div>
  );
}

export default Exchanges;