import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';

import PhotocardList from '@components/photocards/PhotocardList';
import useGetData from '@hooks/useGetData';
import AuthContext from '@context/AuthContext';

const URL = process.env.API;
const endpoint = 'photocards';
const endpointTypes = 'pctypes';

const Photocards = () => {
  const { headerConfig } = useContext(AuthContext);
  const { group, groupId } = useParams();
	
	const API = `${URL}${endpoint}/group/${groupId}`;
  const photocards = useGetData(API, headerConfig);
	const API_PCTYPES = `${URL}${endpointTypes}/group/${groupId}`;
  const pcTypes = useGetData(API_PCTYPES, headerConfig);

  return (
    <>
			<section className="photocards">
				<h2>Photocards - {group}</h2>
				{pcTypes.map(pcType => (
					<PhotocardList key={pcType.id} pcType={pcType} photocards={photocards.filter(x => x.pcTypeId === pcType.id)}/>
				))}
			</section>
    </>
  );
}

export default Photocards;