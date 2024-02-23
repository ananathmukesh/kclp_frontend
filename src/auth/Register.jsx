import React, { useState, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import {
  CaretLeft,
  Phone,
  UserCircle,
  GitFork,
  Envelope,
  LockOpen,
} from "@phosphor-icons/react";

const Register = () => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (value.length <= 1 && !isNaN(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Move to the next input box
      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

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
              <Link to="/login" style={{ color: "#4A4A4A" }}>
                <CaretLeft size={28} />
              </Link>
              <div className="d-flex justify-content-center w-100">
                <h5 className="text-center" style={{ color: "#4A4A4A" }}>
                  Create an account
                </h5>
              </div>
            </div>
            <div
              className="content"
              style={{ height: "450px", overflowY: "scroll" }}
            >
              <h4>Step1</h4>
              <p>Add your mobile number to create an account</p>
              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Phone size={28} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your phone number"
                />
              </div>
              <h4 className="mt-5">OTP Verification</h4>
              <p style={{ color: "#8B8B8B" }}>
                Enter the 6 digit code received on your Phone number
                <span
                  className="ms-2"
                  style={{ color: "#030303", fontWeight: "500" }}
                >
                  (+91 90000123456)
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
                      style={{
                        width: "40px",
                        textAlign: "center",
                        height: "40px",
                        padding: "5px",
                        margin: "10px",
                        fontWeight: "500",
                        border: "2px solid #68BCFF",
                        borderRadius: "5px",
                      }}
                    />
                  ))}
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-prime px-3">Resend OTP</button>
                  <button className="btn btn-verify px-4">Verify</button>
                </div>
              </p>
              <h4 className="mt-5">Step 2</h4>
              <p>Add your basic details</p>
              <div className="d-flex">
                <div className="input-group mt-4 me-2">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <UserCircle size={28} />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                  />
                </div>
                <div className="input-group mt-4 ms-2">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <UserCircle size={28} />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="fathername"
                    placeholder="Father Name"
                  />
                </div>
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <GitFork size={28} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="familyname"
                  placeholder="Family name"
                />
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Envelope size={28} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="familyname"
                  placeholder="Family name"
                />
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <LockOpen size={28} />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="createpassword"
                  placeholder="create password"
                />
              </div>
              <div className="input-group mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <LockOpen size={28} />
                  </span>
                </div>
                <input
                  type="confirmpassword"
                  className="form-control"
                  id="password"
                  placeholder="confirm password"
                />
              </div>
              <div className="d-flex justify-content-between mt-5">
                <Link to="/login" style={{ color: "#2196F3" }}>
                  <button className="btn btn-prime">
                    <span>
                      <CaretLeft size={28} />
                    </span>
                    Back
                  </button>
                </Link>
                <Link to="/login" style={{ color: "#fff" }}>
                  <button className="btn btn-verify">Continue</button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
