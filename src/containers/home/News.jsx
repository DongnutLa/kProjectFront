import React from 'react';
import New from '@components/home/New';
import useGetData from '@hooks/useGetData';

import '@styles-containers/News.scss';

const URL = process.env.API;
const endpoint = 'news';
const pagination = {
  limit: 6,
  offset: 0
}
const API = `${URL}${endpoint}?limit=${pagination.limit}&offset=${pagination.offset}`;

const News = () => {
  const news = useGetData(API);

  return (
    <section className="news">
      <h2>Lo nuevo en K-Pop</h2>
      <div className="news-container">
        {news.map(item => (
          <New item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}

export default News;