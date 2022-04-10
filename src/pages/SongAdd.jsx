import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AuthContext from '@context/AuthContext';
import SongForm from '@components/songs/SongForm';

const SongAdd = () => {
  const { t } = useTranslation(['songs']);
  const { userPermissions } = useContext(AuthContext);

  return (
    <>
      {userPermissions.includes('EDIT_SONGS') ? 
        <section className="new-form">
          <h4>{t('add_song')}</h4>
          <SongForm />
        </section> :
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default SongAdd;