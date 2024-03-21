import React, { useState } from "react";
import logo from "../../assets/images/KodukkuLogo.svg";
import { IoHeartOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { IoPowerOutline } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from "../../react-redux/actions";
import { RiLoginCircleLine } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";


import "./Side.css";

const Sidebar = ({ setSidebarOpen , toggleDrawer }) => {
  // const authdata = useSelector(state => {
  //   const user = state.auth.user;
  //   if (user && user.user) {
  //     return user.user.user;
  //   } else {
  //     return user;
  //   }
  // });   console.log('authdata',authdata);
  const authdata = useSelector((state) => state.auth.user);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const dispatch = useDispatch();

  const logout = async() => {
    dispatch(loginUser(null));
    window.location.reload(true);
  }

  return (
    <div className="Sidebar p-4">
      <div
        className="side d-flex  flex-column justify-content-between"
        style={{ position: "relative", height: "100%" }}
      >
        <div className="">
          <div className="topside d-flex align-items-center justify-content-between">
            <img src={logo} className="logo" alt="logo" />
            <div className="ts-icons">
              {/* <IoHeartOutline className="ts-icon" /> */}
              <GoBell className="ts-icon" />
              {/* <Link to="/main/jobs"> */}
              <Link to="/main/jobs">
              
              <FaRegUserCircle className="ts-icon text-white" onClick={toggleDrawer(false)}/>
              </Link>
              <Link to="/main/jobs">
              
              <IoCloseSharp className="ts-icon text-white d-md-none" onClick={toggleDrawer(false)}/>
              </Link>
              {/* </Link> */}
            
                {/* <IoCloseSharp className="ts-icon text-white d-md-none d-block"/> */}
            
            </div>
          </div>
          {/* <div className="ts-middle mt-4">
            <ul className="p-0 mb-0">
              <li
                className="d-flex justify-content-between align-items-center category"
                style={{
                  padding: "5px 8px 5px 8px",
                  borderRadius: "8px",
                }}
                onClick={toggleDropdown}
              >
                <div className="d-flex align-items-center">
                  <BiCategory className="icon" />
                  <p className="mb-0 ms-4 cate-text">Categories</p>
                </div>
                {isDropdownOpen ? (
                  <TbCaretDownFilled className="open-caret" />
                ) : (
                  <TbCaretUpFilled className="open-caret" />
                )}
              </li>
              {isDropdownOpen && (
                <div className="d-flex align-items-center">
                  <ul className="p-0 w-100" style={{ listStyleType: "none" }}>
                    <li
                      className="mb-0 category-type text-white"
                      style={{
                        listStyleType: "none",
                        padding: "9px 0px 9px 57px",
                        borderRadius: "8px",
                      }}
                    >
                      <MdBusinessCenter className="me-3 fs-5" />
                      Jobs
                    </li>

                    <li
                      className="mb-0 category-type"
                      style={{
                        listStyleType: "none",
                        padding: "9px 0px 9px 57px",
                        borderRadius: "8px",
                      }}
                    >
                      <FaLandmark className="me-3 fs-5" /> Property
                    </li>
                    <Link to="/main/vehicle">
                      <li
                        className="mb-0 category-type text-white"
                        style={{
                          listStyleType: "none",
                          padding: "9px 0px 9px 57px",
                          borderRadius: "8px",
                          textDecoration: "none",
                        }}
                      >
                        <MdElectricRickshaw className="me-3 fs-5" />
                        Vehicles
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </ul>
          </div> */}
        </div>
        {/* <div
          className="ts-bottom"
          style={{ position: "absolute", bottom: "25" }}
        >
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
            />
          </div>
        </div> */}
        <div
          className="terms"
          // style={{ position: "absolute", top: "31rem" }}
        >
          <ul className="p-0 mb-0">
            <li
              className="d-flex justify-content-between align-items-center category"
              style={{
                padding: "5px 8px 5px 8px",
                borderRadius: "8px",
              }}
            >
            
            </li>
            <li
              className="d-flex justify-content-between align-items-center category"
              style={{
                padding: "5px 8px 5px 8px",
                borderRadius: "8px",
              }}
            >
            
            </li>
            <li
              className="d-flex mt-2 justify-content-between align-items-center category"
              style={{
                padding: "5px 8px 5px 8px",
                borderRadius: "8px",
              }}
            >
              <Link
                to="/main/ContactUs"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <div className="d-flex align-items-center">
                  <FiPhoneCall className="icon" />
                  <p
                    onClick={toggleDrawer(false) }
                    className="mb-0 ms-4 cate-text"
                  >
                    Contact Us
                  </p>
                </div>
              </Link>
            </li>
            <li
              className="d-flex mt-2 justify-content-between align-items-center category"
              style={{
                padding: "5px 8px 5px 8px",
                borderRadius: "8px",
              }}
            >
             {
              authdata ? (
                <Link
                style={{ color: "#fff", textDecoration: "none" }}
                onClick={logout}
              >
                <div className="d-flex align-items-center">
                  <BiLogOutCircle className="icon"/>
                  <p className="mb-0 ms-4 cate-text">Logout</p>
                </div>
              </Link>
              ) : (
                <Link
                style={{ color: "#fff", textDecoration: "none" }}
                to="/login"
              >
                <div className="d-flex align-items-center">
                  <RiLoginCircleLine className="icon"/>
                  <p className="mb-0 ms-4 cate-text">Login</p>
                </div>
              </Link>
              )
            }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
