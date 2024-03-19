import React, { useState, useEffect } from 'react';
import { Toast } from "primereact/toast";
import { useRef } from "react";
import axios from 'axios';
import { authapi } from '../config/serverUrl';
import '../auth/ResetComponent/loader.css'

const SignUpTimer = ({email,mobile}) => {

    console.log('email,mobile',email,mobile);
  const [seconds, setSeconds] = useState(120);
  const [running, setRunning] = useState(true); // Initially start the timer
  const [rerunning, setRErunning] = useState(false); // Initially start the timer
  const toast = useRef(null);

  useEffect(() => {
    let intervalId;

    if (running && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
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
    
    const res = await axios.post(`${authapi}/auth/resendsignupotp`,{
      email:email,
      mobile:mobile
    });
    console.log(res);
    if (res.data) {
      if (res.data.code == 200) {
        
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: res.data.data.message,
          life: 3000,
        });
        setSeconds(120);
        setRunning(true);
        setRErunning(false);
      } else {
        
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: res.data.data.message,
          life: 3000,
        });
      }
    }
    
   
  }


  return (
    <div>
       <Toast ref={toast} />
      {running && <p>Timer: {formatTime(seconds)}</p>}

      {rerunning && <a
          className="mt-3"
          onClick={handleResend}
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

export default SignUpTimer;
