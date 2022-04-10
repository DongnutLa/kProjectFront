import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import GroupForm from '@components/groups/GroupForm';
import AuthContext from '@context/AuthContext';

const GroupAdd = () => {
  const { t } = useTranslation(['groups']);
  const { userPermissions } = useContext(AuthContext);
  return (
    <>
      {userPermissions.includes('EDIT_GROUPS') ? 
        <section className="new-form">
          <h4>{t('add_group')}</h4>
          <GroupForm />
        </section> :
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default GroupAdd;