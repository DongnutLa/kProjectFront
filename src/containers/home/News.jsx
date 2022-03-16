import React from 'react';
import New from '@components/home/New';
import useGetExchanges from '@hooks/useGetExchanges';

import '@styles-containers/News.scss';

const endpoint = 'news'
//const API = `${process.env.REACT_APP_API}/${endpoint}` || 'http://localhost:3000/api/v1/news';
const API = 'http://localhost:3000/api/v1/news';

const News = () => {
  const news = useGetExchanges(API);

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