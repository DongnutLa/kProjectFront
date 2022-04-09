import React, { useContext } from 'react';

import NewView from '@components/news/NewView';
import AuthContext from '@context/AuthContext';

const New = () => {
  const { userPermissions } = useContext(AuthContext);
  
  return (
    <>
      {userPermissions.includes('VIEW_NEWS') ? 
        <section className="new">
          <NewView />
        </section> :
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default New;