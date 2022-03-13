import React from 'react';
import NewForm from '@components/news/NewForm';

const NewCreate = () => {
  return (
    <>
      <section className="new-form">
        <h4>Nueva noticia</h4>
        <NewForm />
      </section>
    </>
  );
}

export default NewCreate;