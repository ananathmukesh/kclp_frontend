import React, { useState, useEffect } from 'react';

const TimerZoneMobile = () => {
  const [seconds, setSeconds] = useState(120);
  const [running, setRunning] = useState(true); // Initially start the timer
  const [rerunning, setRErunning] = useState(false); // Initially start the timer

  useEffect(() => {
    let intervalId;

    if (running && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 100);
    }

    // Clear the interval when the timer completes or when running is false
    return () => clearInterval(intervalId);
  }, [running, seconds]);

  // Stop the timer when seconds reach 0
  useEffect(() => {
    if (seconds === 0) {
      setRunning(false);
      setRErunning(true);
    }
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  const handleResend = async() => {
    
  }

  return (
    <div>
      {running && <p>Timer: {formatTime(seconds)}</p>}

      {rerunning && <a
          className="mt-3"
         
          style={{
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Resend OTP
        </a>}
    </div>
  );
};

export default TimerZoneMobile;
