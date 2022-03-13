import React from 'react';
import SongForm from '@components/songs/SongForm';

const SongAdd = () => {
  return (
    <section className="new-form">
      <h4>Agregar canción</h4>
      <SongForm />
    </section>
  );
}

export default SongAdd;