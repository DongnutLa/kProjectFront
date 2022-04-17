import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import { formatDistance, subDays } from 'date-fns';

import useGetData from '@hooks/useGetData';
import AuthContext from '@context/AuthContext';

import '@styles-components/NewView.scss';

const URL = process.env.REACT_API_URL;
const endpoint = 'news';

const NewView = () => {
  const { headerConfig } = useContext(AuthContext);
  const { newId } = useParams();
  const API = `${URL}${endpoint}/${newId}`;
  const newItem = useGetData(API, headerConfig);
  if (newItem.creationDate) {
    var creationDate = formatDistance(subDays(new Date(newItem.creationDate), 0), new Date(), { addSuffix: true });
  }
  return(
    <section className="new">
      <div className="new__img">
        <img src={newItem.fileUrl} alt="IVE"/>
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
        <span>{creationDate}</span>
      </div>
      <div className="new__content">
          <p>{newItem.content}</p>
        <div>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/--FmExEAsM8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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