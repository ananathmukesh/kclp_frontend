import React, { useState, useRef, useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";

import "react-phone-input-2/lib/style.css";

import { Calendar } from "primereact/calendar";

import SendOtpMail from "./ResetComponent/SendOtpMail";
import SendOtpMobile from "./ResetComponent/SendOtpMobile";
import SendOtpPhone from "./ResetComponent/SendOtpPhone";
import SendOtpField from "./ResetComponent/SendInput";
import ChangePassword from "./ResetComponent/changePassword";
import TimerZone from "../utils/2minutesTimer";
import TimerZoneMobile from "../utils/2minutesTimerMobile";

const ResetPassword = () => {
  const [date, setDate] = useState(null);

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [TimerState, setTimerState] = useState(null);
  const [TimerStatem,setTimerStatem  ] = useState(null);

  const [formikErrors, setFormikErrors] = useState({});
  const [formikmailOtpErrors, setFormikmailOtpErrors] = useState({});
  const [formikMobileErrors, setformikMobileErrors] = useState({});
  const [formikMOtpErrors, setformikMOtpErrors] = useState({});

  // Resend OTP Usestate
  

  const [ResendLoader,setResendLoader] = useState(false);
  const [ResendLoaderMObile,setResendLoaderMObile] = useState(false);

  const [disableEmail,setDisableEmail] = useState(true);
  const [disableEmailOtp,setDisableEmailOtp] = useState(true);
  const [disableMobileOtp,setDisableMobileOtp] = useState(true);

  const [TimeHider, setTimeHider] = useState(null);
  const [MobileTimeHider, setMobileTimeHider] = useState(null);

  const [expiryTime, setExpiryTime] = useState(null);
  const [Timerdata, setTimer] = useState(false);

  useEffect(() => {
    // Set the expiry time to be 2 minutes from now
    const currentTime = new Date().getTime();
    const twoMinutesInMilliseconds = 2 * 60 * 1000;
    const expiryTime = currentTime + twoMinutesInMilliseconds;
    setExpiryTime(expiryTime);
  }, []);
 console.log('formikmailOtpErrors',formikmailOtpErrors);
  return (
  <>
      
    <div className="Auth-form-container">
      <div className="Auth-formss">
        <div className="Auth-form-content">
          <div className="head d-flex">
            <Link to="/login" style={{ color: "#4A4A4A" }}>
              <CaretLeft size={28} />
            </Link>

            <div className="d-flex justify-content-center w-100">
              <h5 className="text-center" style={{ color: "#4A4A4A" }}>
                Reset Password
              </h5>
            </div>
          </div>
          <div
            className="content"
            // style={{ height: "550px" }}
          >
            <h4>E-mail Verification</h4>
            <p style={{ color: "#8B8B8B" }}>
              Please enter your Email Id to receive verification code
            </p>

            <div className="row align-items-center mt-2">
              <div className="col-lg-7 col-md-8 ">
                <SendOtpMail
                  setEmail={setEmail}
                  setTimer={setTimer}
                  email={email}
                  TimeHider={TimeHider}
                  setFormikErrors={setFormikErrors}
                  formikErrors={formikErrors}
                  setTimerState={setTimerState}
                  setDisableEmail={setDisableEmail}
                  ResendLoader={ResendLoader}
                  setResendLoader={setResendLoader}
                />
              </div>
              <div className="col-lg-5 col-md-4" style={{
                marginBottom:"8px"
              }}>
                <SendOtpMobile 
                email={email}
                 setTimeHider={setTimeHider}
                  setFormikmailOtpErrors={setFormikmailOtpErrors} 
                  setTimerState={setTimerState}
                  disableEmail={disableEmail}
                  setDisableEmailOtp={setDisableEmailOtp}
                  />
                  
              </div>
              <div className="row">
                <div className="col-7 py-0 ps-3" >
                {
                  TimerState && (
                    <TimerZone  setTimerState={setTimerState} email={email}  setResendLoader={setResendLoader} />
                  )
                }
                  {formikErrors && <p style={{ color: "red" }}>{formikErrors.email}</p>}
                </div>
                <div className="col-5 py-0 ps-3">
               {
                formikmailOtpErrors && <p style={{ color: "red" }}>{formikmailOtpErrors.otp}</p>
               }
                </div>
              </div>
            </div>

            <h4 className="mt-5">Mobile Number Verification</h4>
            <p style={{ color: "#8B8B8B" }}>
              Please enter your Mobile Number to receive verification code
            </p>

            <div className="row align-items-center mt-2">
              <div className="col-lg-7 col-md-8 ">
                <SendOtpPhone
                  email={email}
                  setMobile={setMobile}
                  mobile={mobile}
                  MobileTimeHider={MobileTimeHider}
                  setformikMobileErrors={setformikMobileErrors}
                  setTimerStatem={setTimerStatem}
                  disableEmailOtp={disableEmailOtp}
                  setDisableMobileOtp={setDisableMobileOtp}
                  ResendLoaderMObile={ResendLoaderMObile}
                />
              </div>

              <div className="col-lg-5 col-md-4" style={{
                marginBottom:"8px"
              }}>
                <SendOtpField
                  mobile={mobile}
                  setMobileTimeHider={setMobileTimeHider}
                  setformikMOtpErrors={setformikMOtpErrors}
                  setTimerStatem={setTimerStatem}
                  disableMobileOtp={disableMobileOtp}
                />
              </div>
            </div>
            <div className="row">
            
              <div className="col-7 py-0 ps-3">
              {
              TimerStatem && (
                 <TimerZoneMobile email={email} mobile={mobile} setResendLoaderMObile={setResendLoaderMObile} />
              )
            }
                {  formikMobileErrors && (<p style={{ color: "red" }}>{formikMobileErrors.mobileNumber}</p>) }</div>
              <div style={{ color: "red" }} className="col-5 py-0 ps-3">{ formikMOtpErrors && (<p style={{ color: "red" }}>{formikMOtpErrors.otp}</p>)  } </div>
            </div>

            <ChangePassword email={email} mobile={mobile} />
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default ResetPassword;
