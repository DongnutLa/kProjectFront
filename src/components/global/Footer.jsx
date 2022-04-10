import React from 'react';
import { useTranslation } from 'react-i18next';

import '@styles-components/Footer.scss';

import fb from '@icons/fb.svg';
import tw from '@icons/tw.svg';
import ig from '@icons/ig.svg';

const Footer = () => {
  const { t } = useTranslation(['home']);

  return (
    <footer className="footer-container">
      <div className="footer-links">
        <div className="footer-links__main">
          <h4>{t('footer.site.title')}</h4>
          <ul>
            <li><a href="/">{t('footer.site.home')}</a></li>
            <li><a href="/groups">{t('footer.site.groups')}</a></li>
            <li><a href="/exchanges">{t('footer.site.exchange')}</a></li>
            {/* <li><a href="/store">Ventas</a></li> */}
          </ul>
        </div>
        <div className="footer-links__about">
          <h4>{t('footer.info.title')}</h4>
          <ul>
            <li><a href="">{t('footer.info.about')}</a></li>
            <li><a href="">{t('footer.info.terms')}</a></li>
            <li><a href="">{t('footer.info.privacy')}</a></li>
            <li><a href="">{t('footer.info.cookies')}</a></li>
          </ul>
        </div>
        <div className="footer-links__description">
          <h4>K-Project</h4>
          <p>{t('footer.links.exchange')}</p>
          <p>{t('footer.links.news')}</p>
        </div>
      </div>
      <div className="footer-networks">
        <div className="footer-networks__fb"><a href=""><img src={fb}/></a></div>
        <div className="footer-networks__tw"><a href=""><img src={tw} alt="Twitter"/></a></div>
        <div className="footer-networks__ig"><a href=""><img src={ig} alt="Instagram"/></a></div>
      </div>
      <div className="footer-text"><span>K-Project &copy; 2022</span></div>
    </footer>
  );
}

export default Footer;