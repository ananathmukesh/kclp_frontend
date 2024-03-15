import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { authapi } from '../config/serverUrl';

function MobileNumberTimer({ mobile, setShowhider, showResendButtoon,setshowResendButtoon,email }) {
  const [remaining, setRemaining] = useState(120);
  const [timerOn, setTimerOn] = useState(true);
  
  const [resendHideShow,setresendHideShow] = useState(null);
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (remaining > 0 && timerOn) {
        setRemaining(remaining - 1);
      } else if (!timerOn) {
        // Do validate stuff here
        console.log('timer on');
      } else {
        setShowhider(false);
        setshowResendButtoon(false);
        setresendHideShow(true);
        await axios.post(`${authapi}/auth/resend_otp`, {
          email: '',
          data: 'completeMobileTime',
          mobile: mobile
        });

        // alert('Timeout for otp');
      }
    }, 1000); // Changed the timeout interval to 1000 milliseconds

    return () => clearTimeout(timer);
  }, [remaining, timerOn]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleResendClick = async() => {
    
    setshowResendButtoon(true);
    setresendHideShow(false);
    setRemaining(120); // Reset remaining time
    setTimerOn(true); // Start timer again
     const res = await axios.post(`${authapi}/auth/resend_otp`, {
      email: email,
      data: 'mobile',
      mobile: mobile
    });
  console.log('mobile phone response',res);
  };

  return (
    <div>
   
      
      {resendHideShow && (
        <a
          className="mt-3"
          onClick={handleResendClick}
          style={{
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Resend OTP
        </a>
      )}
    </div>
  );
}

export default MobileNumberTimer;
