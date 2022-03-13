import React from 'react';
import Exchanges from '@containers/exchange/Exchanges';
import Filter from '@components/exchange/Filter';

import '@styles-pages/Exchange.scss';

const Exchange = () => {
    return (
      <>
        <section className="exchange-container">
          <Filter />
          <Exchanges />
        </section>
      </>
    );
  }
  
  export default Exchange;