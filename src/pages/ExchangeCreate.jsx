import React from 'react';
import ExchangeAdd from '@containers/exchange/ExchangeAdd';

const ExchangeCreate = () => {
  return (
    <>
      <section className="new-form">
        <h4>Nuevo intercambio</h4>
        <ExchangeAdd />
      </section>
    </>
  );
}

export default ExchangeCreate;