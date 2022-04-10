import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AuthContext from '@context/AuthContext';
import PhotocardForm from '@components/photocards/PhotocardForm';

const PhotocardAdd = () => {
  const { t } = useTranslation(['photocards']);
  const { userPermissions } = useContext(AuthContext);

  return (
    <>
      {userPermissions.includes('EDIT_PHOTOCARDS') ? 
        <section className="new-form">
          <h4>{t('add_photocard')}</h4>
          <PhotocardForm />
        </section> : 
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default PhotocardAdd;