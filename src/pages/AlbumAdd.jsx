import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AlbumForm from '@components/albums/AlbumForm';
import AuthContext from '@context/AuthContext';

const AlbumAdd = () => {
	const { t } = useTranslation(['albums']);
  const { userPermissions } = useContext(AuthContext);

  return (
    <>
      {userPermissions.includes('EDIT_ALBUMS') ? 
        <section className="new-form">
          <h4>{t('add_album')}</h4>
          <AlbumForm />
        </section> : 
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default AlbumAdd;