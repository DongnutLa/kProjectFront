import React, {useContext} from 'react';
import { useTranslation } from 'react-i18next';

import New from '@components/home/New';
import useGetData from '@hooks/useGetData';
import AuthContext from '@context/AuthContext';

import '@styles-containers/News.scss';

const URL = process.env.API;
const endpoint = 'news';
const pagination = {
  limit: 6,
  offset: 0
}
const API = `${URL}${endpoint}?limit=${pagination.limit}&offset=${pagination.offset}`;

const News = () => {
  const { t } = useTranslation(['home']);
  const { headerConfig, userPermissions } = useContext(AuthContext);
  const news = useGetData(API, headerConfig);

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