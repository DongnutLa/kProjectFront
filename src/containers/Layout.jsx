import React from 'react';
import Footer from '@components/global/Footer';
import Header from '@components/global/Header';
import Adds from '@containers/Adds';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container">
        { children }
        <Adds />
      </main>
      <Footer />
    </>
  );
}

export default Layout;