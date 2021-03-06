import React from 'react';
import { useTranslation } from 'react-i18next';

import '@styles-utils/buttons.scss';
import '@styles-components/AlbumList.scss';

import dystopia from '@img/DystopiaLoseMyself.jpg';
const GroupList = ({ album }) => {
	const { t } = useTranslation(['albums']);

	return (
		<>
			<div className="album-container">
				<div className="album-card">
						<div className="album-card__front">
								<div className="album-card__image">
										<img src={album.filesUrls.length ? album.filesUrls[0] : dystopia} alt={album.name}/>
								</div>
								<div className="album-card__body">
										<h4>{album.name}</h4>
										<p className="">&nbsp;</p>
								</div>
						</div>
						<div className="album-card__back">
								<div className="album-data">
										<p>{t('release')}</p>
										<span>{album.releaseDate}</span>
								</div>
								<div className="album-data">
										<p>{t('producers')}</p>
										<span>{album.producers && album.producers.join(', ')}</span>
								</div>
								<div className="album-data">
										<p>{t('songs')}</p>
										<div className="songs-list">
											{album.songs.map(song => (
												<React.Fragment key={song.id}>
													<span>
														{song.title}
													</span>
													<span>
														{song.duration}
													</span>
												</React.Fragment>
											))}
										</div>
								</div>
						</div>

				</div>	
			</div>
		</>
	);
}

export default GroupList;