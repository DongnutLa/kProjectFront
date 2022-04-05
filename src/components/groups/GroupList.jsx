import React from 'react';
import { useNavigate } from 'react-router-dom';

import '@styles-utils/buttons.scss';
import '@styles-components/GroupList.scss';

import heart from '@icons/heart.svg';
import disk from '@icons/disk.svg';
import card from '@icons/card.svg';

const GroupList = ({ group }) => {
	const navigate = useNavigate();

	return (
		<>
			<div className="group-card">
				<div className="group-card__image">
					<img src={group.filesUrls[0]} alt="dreamcatcher"/>
				</div>
				<div className="group-card__body">
					<h4>{group.name}</h4>
					<div className="group-card__body-icons">
						{/* <img src={heart} alt=""/> */}
						<img src={disk} onClick={() => navigate(`/albums/${group.id}`)} alt=""/>
						<img src={card} onClick={() => navigate(`/photocards/${group.name}/${group.id}`)} alt=""/>
					</div>
				</div>
			</div>
		</>
	);
}

export default GroupList;