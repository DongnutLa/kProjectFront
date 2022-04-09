import React, {useContext} from 'react';

import GroupList from '@components/groups/GroupList';
import useGetData from '@hooks/useGetData';
import AuthContext from '@context/AuthContext';

const URL = process.env.API;
const endpoint = 'groups'
const API = `${URL}${endpoint}`;

const Groups = () => {
  const { headerConfig, userPermissions } = useContext(AuthContext);
  const groups = useGetData(API, headerConfig);

  return (
    <>
      {userPermissions.includes('VIEW_GROUPS') ? 
				<section className="groups">
					<h2>Grupos</h2>
					<article className="groups-container">
						{groups.map(group => (
							<GroupList key={group.id} group={group}/>
						))}
					</article>
				</section>
			: <p>Inicia sesión para acceder a esta página :D</p>}
		</>
  );
}

export default Groups;