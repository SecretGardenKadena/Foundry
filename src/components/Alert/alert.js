import React, { useState, useEffect } from 'react';

const Notification = ({ message, type }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 7000); 
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!show) {
    return null;
  }

  const alertClass = `alert alert-${type} alert-dismissible fade show fixed-top`;

  return (
    <div className={alertClass} role="alert">
      {message}
    </div>
  );
};

export default Notification;
