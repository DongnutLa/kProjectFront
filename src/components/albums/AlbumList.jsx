import React from 'react';

import '@styles-utils/buttons.scss';
import '@styles-components/AlbumList.scss';

import dystopia from '@img/DystopiaLoseMyself.jpg';

const GroupList = ({ album }) => {

	return (
		<>
			<div className="album-container">
				<div className="album-card">
						<div className="album-card__front">
								<div className="album-card__image">
										<img src={dystopia} alt="Dystopia"/>
								</div>
								<div className="album-card__body">
										<h4>{album.name}</h4>
										<p className="">&nbsp;</p>
								</div>
						</div>
						<div className="album-card__back">
								<div className="album-data">
										<p>Lanzamiento:</p>
										<span>{album.releaseDate}</span>
								</div>
								<div className="album-data">
										<p>Productores:</p>
										<span>{album.producers.join(', ')}</span>
								</div>
								<div className="album-data">
										<p>Canciones:</p>
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