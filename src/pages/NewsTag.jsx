import React, { useContext } from 'react';

import NewTag from '@containers/NewTag';
import AuthContext from '@context/AuthContext';

const NewsTag = () => {
  const { userPermissions } = useContext(AuthContext);
  
  return (
    <>
      {userPermissions.includes('VIEW_NEWS') ? 
        <section className="new">
          <NewTag />
        </section> :
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default NewsTag;