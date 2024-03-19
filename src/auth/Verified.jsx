import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./login.css"; // Assuming you have some CSS styles defined here
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Verified = () => {
  const navigate = useNavigate();
  const textRef = useRef(null);
  const location = useLocation();
  const { state } = location;

  console.log('state',state);
  useEffect(() => {
     if(state && state.signup=="success"){
       setTimeout(()=>{
        navigate('/');
       },5000)
     }
  }, []);

  return (
    <div className="verified-container">
      <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content p-5">
            <center>
              <div class="checkmark-circle">
                <div class="background"></div>
                <div class="checkmark draw"></div>
              </div>
            </center>
            <h2 ref={textRef} className="text-center">
              Your Account is Successfully Verified
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verified;

/* Styles */
