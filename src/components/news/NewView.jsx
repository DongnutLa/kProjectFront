import React from 'react';
import { useParams } from 'react-router-dom';
import { formatDistance, subDays } from 'date-fns';

import useGetData from '@hooks/useGetData';

import '@styles-components/NewView.scss';
import ive from '@img/ive.jpeg';

const endpoint = 'news'
//const API = `${process.env.REACT_APP_API}/${endpoint}` || 'http://localhost:3000/api/v1/news';

const NewView = () => {
  const { newId } = useParams();
  const API = `http://localhost:3000/api/v1/news/${newId}`;
  const newItem = useGetData(API);
  //const creationDate = formatDistance(subDays(new Date(newItem.creationDate), 0), new Date(), { addSuffix: true });

  return(
    <section className="new">
      <div className="new__img">
        <img src={ive} alt="IVE"/>
      </div>
      <div className="new__title">
        <h1>{newItem.title}</h1>
      </div>
      <div className="new__label">
        <div className="new__label__tags">
          {newItem.tags && newItem.tags.map(tag => (
            <p key={tag}>{tag}</p>
          ))}
        </div>
        <span>{newItem.creationDate}</span>
      </div>
      <div className="new__content">
          <p>{newItem.content}</p>
        <div>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/--FmExEAsM8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
      <div className="new__source">
        <h4>Fuente:</h4>
        <p>{newItem.source}</p>
      </div>
    </section>
  );
}

export default NewView;