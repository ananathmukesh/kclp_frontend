import React, { useState, useRef, useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import {
  CaretLeft,
  CaretRight,
  Phone,
  UserCircle,
  GitFork,
  Envelope,
  LockOpen,
} from "@phosphor-icons/react";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authapi } from "../config/serverUrl";
const MobileNumberVerification = ({active,setActive}) => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const bottomRef = useRef(null);
  const [valid, setvalid] = useState(true);

  //Email useState
  const [emailid, setemailid] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [Error, setError] = useState("");
  const [visiable,setvisiable] = useState(false)
  const [mobile_no, setmobile_no] = useState("");
  const [mobileError, setMobileError] = useState("");
  // reset password usestate
  const [reset, setreset] = useState({ password: "", confirm_password: "" });
  const [formErrors, setFormErrors] = useState({
    password: "",
    confirm_password: "",
  });
  const [touchedFields, setTouchedFields] = useState({
    password: false,
    confirm_password: false,
  });

  //OTP Verify Usestate
  const [otploading, setotploading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otperror, setotperror] = useState("");

  //Resend OTP Usestate
  const [resendloading, setresendLoading] = useState(false);
  const [resendotpSent, setresendOtpSent] = useState(false);

  const navigate = useNavigate();

  const handlemobileno = (value) => {
    setmobile_no(value);
    setvalid(validationmobileno(value));
    setMobileError("");
  };

  const validationmobileno = (phonenumber) => {
    const mobilepattern = /^\d{10}$/;
    return mobilepattern.test(phonenumber);
  };

  console.log("emailid", emailid);

  const handlegetOTP = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailid)) {
      // If email format is invalid, show error message and return
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setvisiable(true)
    try {
      const res = await axios.post(`${authapi}/auth/email_OTP`, {
        email: emailid,
      });
      const data = res.data;
      console.log("data", data);
      setTimeout(() => {
        setLoading(false);
        setOtpSent(true);
        //bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    } catch (error) {
      console.error("Error while sending OTP:", error);
      setLoading(false);
    }
  };

  const handelpassword = (e) => {
    const { id, value } = e.target;
    setreset((prevData) => ({ ...prevData, [id]: value }));

    if (touchedFields[id]) {
      // Clear error message if the field is touched and user starts typing
      setFormErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }
  };

  console.log("reset:", reset);

  const handelrestpassword = async (e) => {
    e.preventDefault();

    setTouchedFields({ password: true, confirm_password: true });

    const errors = validate(reset);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(`${authapi}/auth/resetpassword`, {
          ...reset,
          email: emailid,
        });

        const data = response.data;
        console.log("DATA:", data);

        if (data.code == 200) {
          toast.success("Password Changed Successfully");
          navigate("/login");
        } else if (data.code == 400) {
          toast.error("Passwords do not match");
        }
      } catch (error) {
        // Handle request error
        console.error("Request failed:", error);
      }
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Password is required";
    } 
    else if (values.password.length > 20 ) {
      errors.password = "Password cannot exceed more than 20 characters";
    }

    if (!values.confirm_password) {
      errors.confirm_password = "Confirm password is required";
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    return errors;
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const isInvalidOTP = otp.some(
      (digit) => digit === "" || digit.length !== 1
    );

    if (isInvalidOTP) {
      setotperror("Please enter a valid 6-digit OTP number.");
      return;
    } else {
      setotperror("");
    }

    setotploading(true);

    try {
      const response = await axios.post(`${authapi}/auth/email_OTP_verify`, {
        emailOTP: otp.join(""),
      });
      console.log("data:", response.data);

      // Check if the response was successful
      if (response.data.code == 200) {
        // setSuccessMessage('Verification successful!');
        setVerified(true);
        setotperror("");
      } else {
        setVerified(false);
        setotperror("Incorrect OTP. Please try again.");
      }

      setTimeout(() => {
        setotploading(false);
        //bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
      setotperror("Error verifying OTP. Please try again.");
      setTimeout(() => {
        setotploading(false);
      }, 2000);
    }
  };

  const handelresendOTP = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailid)) {
      // If email format is invalid, show error message and return
      setError("Please enter a valid email address.");
      return;
    }

    setresendLoading(true);

    try {
      const res = await axios.post(`${authapi}/auth/email_OTP`, {
        email: emailid,
      });
      const data = res.data;
      console.log("data", data);
      setTimeout(() => {
        setresendLoading(false);
        setresendOtpSent(true);
        //bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    } catch (error) {
      console.error("Error while sending OTP:", error);
      setresendLoading(false);
    }
  };

  const handleChange = (index, event) => {
    const value = event.target.value;
    setotperror("");

    if (value.length <= 1 && !isNaN(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      if (value && inputRefs[index + 1] && inputRefs[index + 1].current) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  console.log("OTP", otp);

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text/plain").slice(0, 6);
    const newOTP = [...otp];
    pasteData.split("").forEach((char, index) => {
      newOTP[index] = char;
      if (inputRefs[index + 1] && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    });
    setOTP(newOTP);
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOTP(newOTP);
      inputRefs[index - 1].current.focus();
    }
  };

  
  

  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-forms">
          <div className="Auth-form-content">
            <div className="head d-flex">
              <Link onClick={()=>setActive(0)} style={{ color: "#4A4A4A" }}>
                <CaretLeft size={28} />
              </Link>
              <div className="d-flex justify-content-center w-100">
                <h5 className="text-center" style={{ color: "#4A4A4A" }}>
                  Forgot Password
                </h5>
              </div>
              
            </div>
            <div
              className="content"
              style={{ height: "550px" }}
            >
              <h4>Mobile Number Verification</h4>
              <p style={{ color: "#8B8B8B" }}>
                Please enter your Email Id to receive
                verification code
              </p>
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-8 col-12">
                 
                <div>
          <PhoneInput
            placeholder="Enter phone number"
            country="in"
            className="phone-input mt-4"
            value={mobile_no}
            onChange={handlemobileno}
            inputProps={{
              required: true,
            }}
            style={{
              border:
                touchedFields.mobile_no && mobileError
                  ? "2px solid red"
                  : "2px solid #bbb9b9",
              borderRadius:
                touchedFields.mobile_no && mobileError ? "5px" : "5px",
            }}
          />
        </div>


                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <button
                    className="btn btn-verify btn-verify  mt-3"
                    onClick={handlegetOTP}
                    disabled={loading || otpSent}
                    style={{
                      // fontSize:"11px",
                      backgroundColor: otpSent ? "green" : "",
                      color: otpSent ? "white" : "",
                      width: "113px",
                    }}
                  >
                    {loading ? (
                      <span>Loading...</span>
                    ) : otpSent ? (
                      <>
                        <span>OTP SENT</span> <span>&#10004;</span>
                      </>
                    ) : (
                      <span>GET OTP</span>
                    )}
                  </button>
                </div>
                {Error && <p style={{ color: "red" }}>{Error}</p>}
                {/* <div className="text-end mt-2"> */}
                {/* <button className="btn btn-verify px-4" onClick={handlegetOTP} disabled={loading || otpSent} style={{ backgroundColor: otpSent ? 'green' : '', color: otpSent ? 'white' : '' }}>
                  {loading ? <span>Loading...</span> : (otpSent ? <><span>OTP SENT</span> <span>&#10004;</span></> : <span>GET OTP</span>)}
                </button> */}
                {/* </div> */}
              </div>
              <h4 className="mt-5">OTP Verification</h4>
              <p style={{ color: "#8B8B8B" }}>
                   Enter the 6 digit code received on your Email Id
                <span
                  className="ms-2"
                  style={{ color: "#030303", fontWeight: "500" }}
                >
                 {visiable? emailid : ""}
                </span>
                <div className="my-3 d-flex justify-content-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(index, e)}
                      onPaste={handlePaste}
                      onKeyDown={(e) => handleBackspace(index, e)}
                      ref={inputRefs[index]}
                      className="opt-box"
                    />
                  ))}
                </div>
                <div className="d-flex justify-content-between">
                  {/* <button className="btn btn-prime px-3" onClick={handelresendOTP}>Resend OTP</button> */}

                  <button
                    className="btn btn-verify px-4"
                    onClick={handelresendOTP}
                    disabled={resendloading || resendotpSent}
                    style={{
                      backgroundColor: resendotpSent ? "green" : "",
                      color: resendotpSent ? "white" : "",
                    }}
                  >
                    {resendloading ? (
                      <span>Loading...</span>
                    ) : resendotpSent ? (
                      <>
                        <span>OTP SENT</span> <span>&#10004;</span>
                      </>
                    ) : (
                      <span style={{ color: "#fff" }}>Resend OTP</span>
                    )}
                  </button>

                  {/* <button className="btn btn-verify px-4" onClick={(e)=>handleVerify(e)}>Verify</button> */}
                  <button
                    className="btn btn-verify px-4"
                    onClick={()=>setActive(2)}
                    
                    style={{
                      backgroundColor: verified ? "green" : "",
                      color: verified ? "white" : "",
                    }}
                  >
                    {otploading ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        {verified ? (
                          <>
                            <span>Verified</span> <span>&#10004;</span>
                          </>
                        ) : (
                          <span style={{ color: "#fff" }}>Verify</span>
                        )}
                      </>
                    )}
                  </button>
                </div>
                {otperror && <p style={{ color: "red" }}>{otperror}</p>}
              </p>
         
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MobileNumberVerification;
