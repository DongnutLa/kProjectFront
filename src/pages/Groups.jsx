import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
//import axios from 'axios';

import useGetData from '@hooks/useGetData';
import GroupList from '@components/groups/GroupList';
import AuthContext from '@context/AuthContext';

const URL = process.env.API;
const endpoint = 'groups'
const API = `${URL}${endpoint}`;
const params = { 
	limit: 20,
	offset: 0,
	includeDeleted: false,
	includeUnpublished: false
};

const Groups = () => {
	const { t } = useTranslation(['groups'])
  const { userPermissions } = useContext(AuthContext);

  const groups = useGetData(API, params);

  return (
    <>
      {userPermissions.includes('VIEW_GROUPS') ? 
				<section className="groups">
					<h2>{t('title')}</h2>
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