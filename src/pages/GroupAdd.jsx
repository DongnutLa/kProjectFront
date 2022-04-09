import React, { useContext } from 'react';

import GroupForm from '@components/groups/GroupForm';
import AuthContext from '@context/AuthContext';

const GroupAdd = () => {
  const { userPermissions } = useContext(AuthContext);
  return (
    <>
      {userPermissions.includes('EDIT_GROUPS') ? 
        <section className="new-form">
          <h4>Agregar grupo</h4>
          <GroupForm />
        </section> :
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default GroupAdd;