import React, { useEffect, useContext } from 'react';
import Footer from '@components/global/Footer';
import Header from '@components/global/Header';
import Adds from '@containers/Adds';
import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';
import Toaster from '@components/global/Toaster';

const Layout = ({ children }) => {
  const { getAuthData } = useContext(AuthContext);
  const { toasterStatus } = useContext(ToasterContext);
  useEffect(() => {
    getAuthData();
  }, [])

  return (
    <>
      <Header />
      {toasterStatus.visible && 
        <Toaster type={toasterStatus.type} content={toasterStatus.content} />
      }
      <main className="container">
        { children }
        <Adds />
      </main>
      <Footer />
    </>
  );
}

export default Layout;