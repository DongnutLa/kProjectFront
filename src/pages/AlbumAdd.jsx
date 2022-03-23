import React, { useContext } from 'react';

import AlbumForm from '@components/albums/AlbumForm';
import AuthContext from '@context/AuthContext';

const AlbumAdd = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <>
      {userRole.isAdmin ? 
        <section className="new-form">
          <h4>Agregar álbum</h4>
          <AlbumForm />
        </section> : 
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default AlbumAdd;