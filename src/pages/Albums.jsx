import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';

import AlbumList from '@components/albums/AlbumList';
import useGetData from '@hooks/useGetData';
import AuthContext from '@context/AuthContext';

const URL = process.env.API;
const endpoint = 'albums'

const Albums = () => {
  const { headerConfig } = useContext(AuthContext);
  const { groupId } = useParams();

	const API = `${URL}${endpoint}/group/${groupId}`;
  const albums = useGetData(API, headerConfig);

  return (
    <>
			<section className="albums">
				<h2>Álbumes</h2>
				<article className="albums-section">
					{albums.map(album => (
						<AlbumList key={album.id} album={album}/>
					))}
				</article>
			</section>
    </>
  );
}

export default Albums;