import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';

import New from '@components/home/New';
import useGetData from '@hooks/useGetData';
import AuthContext from '@context/AuthContext';

import '@styles-containers/News.scss';

const URL = process.env.API;
const endpoint = 'news';

const NewTag = () => {
  const { headerConfig } = useContext(AuthContext);
  const { tag } = useParams();
  const API = `${URL}${endpoint}?tag=${tag}`
  const news = useGetData(API, headerConfig);
  return (
    <>
      <section className="news">
        <h2>{tag}</h2>
        <div className="news-container">
          {news && news.map(x => (
            <New key={x.id} item={x}/>
          ))}
        </div>
      </section>
    </>
  );
}

export default NewTag;