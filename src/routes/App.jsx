import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppContext from '@context/AppContext';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Layout from '@containers/Layout';
import Exchange from '@pages/Exchange';
import ExchangeCreate from '@pages/ExchangeCreate';
import New from '@pages/New';
import NewCreate from '@pages/NewCreate'
import GroupAdd from '@pages/GroupAdd';
import IdolAdd from '@pages/IdolAdd';
import AlbumAdd from '@pages/AlbumAdd';
import SongAdd from '@pages/SongAdd';
import PhotocardAdd from '@pages/PhotocardAdd';
import useInitialState from '@hooks/useInitialState';

import '@styles/global.scss';

const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/exchange/create" element={<ExchangeCreate />} />
            <Route path="/new/:newId" element={<New />} />
            <Route path="/new/create" element={<NewCreate />} />
            <Route path="/groups/add" element={<GroupAdd />} />
            <Route path="/idols/add" element={<IdolAdd />} />
            <Route path="/albums/add" element={<AlbumAdd />} />
            <Route path="/songs/add" element={<SongAdd />} />
            <Route path="/photocards/add" element={<PhotocardAdd />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App;