import React, { useContext } from 'react';

import IdolForm from '@components/idols/IdolForm';
import AuthContext from '@context/AuthContext';

const IdolAdd = () => {
  const { userPermissions } = useContext(AuthContext);
  
  return (
    <>
      {userPermissions.includes('EDIT_IDOLS') ? 
        <section className="new-form">
          <h4>Agregar idol</h4>
          <IdolForm />
        </section> :
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default IdolAdd;