import React, {useContext} from 'react';

import GroupList from '@components/groups/GroupList';
import useGetData from '@hooks/useGetData';
import AuthContext from '@context/AuthContext';

const URL = process.env.API;
const endpoint = 'groups'
const API = `${URL}${endpoint}`;

const Groups = () => {
  const { headerConfig } = useContext(AuthContext);
  const groups = useGetData(API, headerConfig);

  return (
    <>
			<section className="groups">
				<h2>Grupos</h2>
				<article className="groups-container">
					{groups.map(group => (
						<GroupList key={group.id} group={group}/>
					))}
				</article>
			</section>
    </>
  );
}

export default Groups;