import React, { useContext } from 'react';

import AuthContext from '@context/AuthContext';
import PhotocardForm from '@components/photocards/PhotocardForm';

const PhotocardAdd = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <>
      {userRole.isAdmin ? 
        <section className="new-form">
          <h4>Agregar photocard</h4>
          <PhotocardForm />
        </section> : 
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default PhotocardAdd;