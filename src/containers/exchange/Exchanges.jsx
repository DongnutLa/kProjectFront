import React from 'react';
import Exchange from '@components/exchange/Exchange';
import useGetExchanges from '@hooks/useGetExchanges';

import '@styles-containers/Exchanges.scss';

const endpoint = 'exchanges'
//const API = `${process.env.REACT_APP_API}/${endpoint}` || 'http://localhost:3000/api/v1/exchanges';
const API = 'http://localhost:3000/api/v1/exchanges';

const Exchanges = () => {
  const exchanges = useGetExchanges(API);

  return (
    <div className="exchange__body">
      {exchanges.map(exchange => (
        <Exchange exchange={exchange} key={exchange.id} />
      ))}
    </div>
  );
}

export default Exchanges;