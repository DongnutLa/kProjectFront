import React, {useState} from 'react';

import '@styles-components/PhotocardList.scss';

import arrow from '@icons/arrow.svg';
import handong from '@img/ETE-O2-Handong.png';

const PhotocardList = ({pcType, photocards}) => {
	const [togglePcSection, setTogglePcSection] = useState(false);

	return (
		<>
			<div className="photocards-section" onClick={() => setTogglePcSection(!togglePcSection)}>
				<p>{pcType.name}</p>
				<img src={arrow} alt="" />
			</div>
			{togglePcSection && (
				<div className="photocards-container">
					{photocards.map(photocard => (
						<div key={photocard.id} className="photocard-img">
							<img src={handong} alt="" />
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default PhotocardList;