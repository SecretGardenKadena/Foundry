import React, { useState, useEffect } from 'react';

const BootstrapAlert = ({ message, type, duration = 10000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return visible ? (
    <div className={`alert alert-${type} alert-dismissible fade show fixed-top`} role="alert">
      <strong style={{color: 'white'}}>{message}</strong>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={() => setVisible(false)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  ) : null;
};

export default BootstrapAlert;
