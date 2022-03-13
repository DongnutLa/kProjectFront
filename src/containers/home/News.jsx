import React from 'react';
import New from '@components/home/New';

import '@styles-containers/News.scss';

const News = () => {
  return (
    <section className="news">
      <h2>Lo nuevo en K-Pop</h2>
      <div className="news-container">
        <New />
        <New />
        <New />
      </div>
    </section>
  );
}

export default News;