import React, { useEffect, useContext } from 'react';
import Footer from '@components/global/Footer';
import Header from '@components/global/Header';
import Adds from '@containers/Adds';
import AuthContext from '@context/AuthContext';

const Layout = ({ children }) => {
  const { getAuthData } = useContext(AuthContext);
  useEffect(() => {
    getAuthData();
  }, [])

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