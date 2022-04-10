import React from 'react';
import { useTranslation } from 'react-i18next';

import '@styles-containers/About.scss';

import exchange from '@img/exchange.png';
import buy from '@img/buy.png';
import news from '@img/news.png';

const About = () => {
  const { t } = useTranslation(['home']);

  return (
    <section className="about">
      <div className="about-container">
        <div className="about-img"><img src={exchange} alt="intercambios"/></div>
        <div className="about-text">
          <h3>{t('about.exchange.title')}</h3>
          <p>{t('about.exchange.text')}</p>
          <a href=""><p>{t('about.exchange.button')}</p></a>
        </div>
      </div>

      <div className="about-container">
        <div className="about-text">
          <h3>{t('about.sells.title')}</h3>
          <p>{t('about.sells.text')}</p>
          <a href=""><p>{t('about.sells.button')}</p></a>
        </div>
        <div className="about-img"><img src={buy} alt="intercambios"/></div>
      </div>

      <div className="about-container">
        <div className="about-img"><img src={news} alt="intercambios"/></div>
        <div className="about-text">
          <h3>{t('about.news.title')}</h3>
          <p>{t('about.news.text')}</p>
          <a href=""><p>{t('about.news.button')}</p></a>
        </div>
      </div>
    </section>
  );
}

export default About;