import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistance, subDays } from 'date-fns';
import '@styles-components/New.scss';

import ive from '@img/ive.jpeg';

const New = ({ item }) => {
  const creationDate = formatDistance(subDays(new Date(item.creationDate), 0), new Date(), { addSuffix: true });

  const navigate = useNavigate();

  return (
    <div className="news-card">
      <div className="news-card__img">
        <img src={ive} alt="ive"/>
      </div>
      <div className="news-card__head">
        {item.tags && item.tags.map(tag => (
          <p key={tag}>{tag}</p>
        ))}
      </div>
      <div className="news-card__date">
        <span>{creationDate}</span>
      </div>
      <h4 className="news-card__title" onClick={() => {
        navigate(`/new/${item.id}`);
      }}>
        {item.title}
      </h4>
      <p className="news-card__text">
        {item.content}
      </p>
    </div>
  );
}

export default New;