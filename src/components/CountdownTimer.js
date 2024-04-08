import React from 'react';

function CountdownTimer({ nDays, tDate }) {
  const targetDate = new Date(tDate);
  const daysInMilliseconds = nDays * 24 * 60 * 60 * 1000;
  const endDate = new Date(targetDate.getTime() + daysInMilliseconds);

  const calculateTimeRemaining = () => {
    const currentTime = new Date();
    const remaining = endDate - currentTime;
    
    if (remaining > 0) {
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      
      return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    } else {
      return 'expired';
    }
  };

  return (
    <div>
      <p>Countdown Timer:</p>
      <p>{calculateTimeRemaining()}</p>
    </div>
  );
}

export default CountdownTimer;
