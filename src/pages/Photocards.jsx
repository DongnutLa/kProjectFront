import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PhotocardList from '@components/photocards/PhotocardList';
import useGetData from '@hooks/useGetData';
import AuthContext from '@context/AuthContext';

const URL = process.env.REACT_API_URL;
const endpoint = 'photocards';
const endpointTypes = 'pctypes';

const Photocards = () => {
  const { t } = useTranslation(['photocards']);
  const { headerConfig, userPermissions } = useContext(AuthContext);
  const { group, groupId } = useParams();
	
	const API = `${URL}${endpoint}/group/${groupId}`;
  const photocards = useGetData(API, headerConfig);
	const API_PCTYPES = `${URL}${endpointTypes}/group/${groupId}`;
  const pcTypes = useGetData(API_PCTYPES, headerConfig);

  return (
    <>
      {userPermissions.includes('VIEW_PHOTOCARDS') ? 
        <section className="photocards">
          <h2>{t('title')} - {group}</h2>
          {pcTypes.map(pcType => (
            <PhotocardList key={pcType.id} pcType={pcType} photocards={photocards.filter(x => x.pcTypeId === pcType.id)}/>
          ))}
        </section> : 
        <p>Inicia sesión para acceder a esta página :D</p>
      }
    </>
  );
}

export default Photocards;