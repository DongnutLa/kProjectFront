import React from 'react';
import ExchangeForm from '@components/exchange/ExchangeForm';

const ExchangeCreate = () => {
  return (
    <>
      <section className="new-form">
        <h4>Nuevo intercambio</h4>
        <p>Datos de la photocard que tienes:</p>
        <ExchangeForm />
      </section>
    </>
  );
}

export default ExchangeCreate;