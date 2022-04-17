import React, {useContext} from 'react';
import { useTranslation } from 'react-i18next';

import New from '@components/home/New';
import useGetData from '@hooks/useGetData';
import AuthContext from '@context/AuthContext';

import '@styles-containers/News.scss';

const URL = process.env.REACT_API_URL;
const endpoint = 'news';
const params = {
  limit: 6,
  offset: 0,
  includeDeleted: false,
  includeUnpublished: false
}
const API = `${URL}${endpoint}`;

const News = () => {
  const { t } = useTranslation(['home']);
  const { userPermissions } = useContext(AuthContext);
  const news = useGetData(API, params);

  return (
    <>
      {userPermissions.includes('VIEW_NEWS') &&
        <section className="news">
          <h2>{t('home.news.title')}</h2>
          <div className="news-container">
            {news.map(item => (
              <New item={item} key={item.id} />
            ))}
          </div>
        </section>
      }
    </>
  );
}

export default News;