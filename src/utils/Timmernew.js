import React, { useState, useEffect } from 'react';

const TimerNew = () => {
  const [remaining, setRemaining] = useState(120); // 120 seconds = 2 minutes
  const [timerOn, setTimerOn] = useState(false); // Initially, timer is not running

  useEffect(() => {
    let timer;
    if (timerOn) {
      timer = setTimeout(() => {
        if (remaining > 0) {
          setRemaining(remaining - 1);
        } else {
          setTimerOn(false); // Stop timer when time reaches 0
          handleTimeout();
        }
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [remaining, timerOn]);

  const formatTime = (time) => {
    return time < 10 ? '0' + time : time;
  };

  const handleStart = () => {
    setTimerOn(true);
  };

  const handleStop = () => {
    setTimerOn(false);
  };

  const handleTimeout = () => {
    alert('Timeout for OTP');
  };

  return (
    <div>
      <button onClick={handleStart} disabled={timerOn}>
        Start Timer
      </button>
      <button onClick={handleStop} disabled={!timerOn}>
        Stop Timer
      </button>
      {timerOn && (
        <div>Time left = {formatTime(Math.floor(remaining / 60))}:{formatTime(remaining % 60)}</div>
      )}
    </div>
  );
};

export default TimerNew;
