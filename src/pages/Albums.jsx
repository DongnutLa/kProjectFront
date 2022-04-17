import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AlbumList from '@components/albums/AlbumList';
import useGetData from '@hooks/useGetData';
import AuthContext from '@context/AuthContext';

const URL = process.env.REACT_API_URL;
const endpoint = 'albums'

const Albums = () => {
	const { t } = useTranslation(['albums']);
  const { userPermissions } = useContext(AuthContext);
  const { groupId } = useParams();

	const API = `${URL}${endpoint}/group/${groupId}`;
  const albums = useGetData(API);

  return (
    <>
      {userPermissions.includes('VIEW_ALBUMS') ? 
				<section className="albums">
					<h2>{t('title')}</h2>
					<article className="albums-section">
						{albums.map(album => (
							<AlbumList key={album.id} album={album}/>
						))}
					</article>
				</section>
			: <p>Inicia sesión para acceder a esta página :D</p>}
    </>
  );
}

export default Albums;