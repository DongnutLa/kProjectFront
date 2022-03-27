import React, { useContext } from 'react';

import ToasterContext from '@context/ToasterContext';

import '@styles-components/Toaster.scss';
import checkIcon from '@icons/checkIcon.svg';
import cancelIcon from '@icons/cancelIcon.svg';

const Toaster = () => {
  const { types, toasterStatus, initialToasterStatus, setToasterStatus } = useContext(ToasterContext)
  let containerClass = 'toaster-container';
  let messageClass = 'toaster-message';
  if (toasterStatus.type === types.ERROR) {
    containerClass += ' error';
    messageClass += ' error';
  }
  if (toasterStatus.type === types.SUCCESS) {
    containerClass += ' success';
    messageClass += ' success';
  }

  return (
    <section className={containerClass}>
      {toasterStatus.type === types.ERROR && <img src={cancelIcon} alt="" />}
      {toasterStatus.type === types.SUCCESS && <img src={checkIcon} alt="" />}
      <div className="toaster-message">
        {toasterStatus.type === types.ERROR && <span>Error</span>}
        {toasterStatus.type === types.SUCCESS && <span>Success</span>}
        <span>{toasterStatus.content}</span>
      </div>
      <span className="close-toaster" onClick={() => setToasterStatus(initialToasterStatus)}>X</span>
    </section>
  );
}

export default Toaster;