import React, { useContext } from 'react';
import Exchanges from '@containers/exchange/Exchanges';
import Filter from '@components/exchange/Filter';
import AuthContext from '@context/AuthContext';

import '@styles-pages/Exchange.scss';

const Exchange = () => {
  const { userPermissions } = useContext(AuthContext);

  return (
    <>
      {userPermissions.includes('VIEW_EXCHANGES') ? 
        <section className="exchange-container">
          <Filter />
          <Exchanges />
        </section>
			: <p>Inicia sesión para acceder a esta página :D</p>}
    </>
  );
}
  
export default Exchange;