import React from 'react';
import Head from '@components/home/Head';
import About from '@containers/home/About';
import News from '@containers/home/News';
import '@styles-pages/Home.scss';

const Home = () => {
  return (
    <>
        <div className='Home'>
          <Head />
          <About />
          <News />
        </div>
    </>
  );
}

export default Home;