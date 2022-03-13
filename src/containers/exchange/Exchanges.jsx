import React from 'react';
import Exchange from '@components/exchange/Exchange';

import '@styles-containers/Exchanges.scss';

const Exchanges = () => {
  return (
    <div className="exchange__body">
      <Exchange />
      <Exchange />
      <Exchange />
      <Exchange />
    </div>
  );
}

export default Exchanges;