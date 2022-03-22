import React, { useContext } from 'react';

import NewForm from '@components/news/NewForm';
import AuthContext from '@context/AuthContext';

const NewCreate = () => {
  const { userRole } = useContext(AuthContext);
  return (
    <>
      {userRole.isEditor || userRole.isAdmin ? (
        <section className="new-form">
          <h4>Nueva noticia</h4>
          <NewForm />
        </section>
      ) :
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default NewCreate;