import React from 'react';
import { useTranslation } from 'react-i18next';

import '@styles-components/Head.scss';

const Head = () => {
  const { t } = useTranslation(['home']);
  return (
    <section className="head">
      <div className="head__img">
        <div className="head__text">
          <h2>K-Project</h2>
          <p>{t('home.head.exchange')}</p>
        </div>
      </div>
    </section>
  );
}

export default Head;