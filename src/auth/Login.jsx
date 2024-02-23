import React from "react";
import "./login.css";
import logo from "../assets/images/KodukkuLogo.svg";
import { UserCircle, LockOpen } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();

  const handlesubmit = async() => {
    const myValue = {
      id: 1,
      name: "mukeshkanna",
      email: "mukesh55@gmail.com",
      phone: "7677886778",
    };
    
    const jsonString = JSON.stringify(myValue);
    localStorage.setItem('auth1', jsonString);
    Navigate('/main');
  }




  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <div className="head ">
            <h5 className="text-center" style={{ color: "#4A4A4A" }}>
              Log in or Sign up
            </h5>
          </div>
          <div className="content">
            <div className="title d-flex align-items-center justify-content-center">
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "4rem",
                  border: "2px solid #68BCFF",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              />
              <h3 style={{ color: "#2196F3", marginLeft: "10px" }}>Welcome!</h3>
            </div>
            <div className="input-group mt-5">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <UserCircle size={28} />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
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
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="reset-pass d-flex justify-content-between my-3">
              <div className="d-flex ">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <p className="ms-2">Remember me</p>
              </div>
              <p style={{ cursor: "pointer" }}>Reset Password</p>
            </div>
            <button type="button" className="btn continue btn-primary mt-4" onClick={handlesubmit}>Continue</button>
           
            <p className="mt-3">
              <Link to="/register" style={{ color: "#2196F3" }}>
                New user registration
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
