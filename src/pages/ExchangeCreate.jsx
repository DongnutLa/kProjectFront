import React, { useContext } from 'react';

import AuthContext from '@context/AuthContext';
import ExchangeAdd from '@containers/exchange/ExchangeAdd';

const ExchangeCreate = () => {
  const { userPermissions } = useContext(AuthContext);

  return (
    <>
      { userPermissions.includes('EDIT_EXCHANGES') ? (
        <section className="new-form">
          <h4>Nuevo intercambio</h4>
          <ExchangeAdd />
        </section>
      ) :
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default ExchangeCreate;