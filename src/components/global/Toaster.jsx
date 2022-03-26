import React from 'react';

import '@styles-components/Toaster.scss';

const Toaster = ({ type, content }) => {
  return (
    <section className="toaster-container">
      {type.ERROR && <img src="./assets/logos/cancelIcon.svg" alt="" />}
      {type.SUCCESS && <img src="./assets/logos/checkIcon.svg" alt="" />}
      <div className="toaster-message">
        <span>{type.ERROR ? 'Error' : 'Success'}</span>
        <span>{content}</span>
      </div>
      <span className="close-toaster">X</span>
    </section>
  );
}

export default Toaster;