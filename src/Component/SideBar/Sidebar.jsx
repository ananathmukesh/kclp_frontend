import React, { useState } from "react";
import logo from "../../assets/images/KodukkuLogo.svg";
import { IoHeartOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { IoPowerOutline } from "react-icons/io5";
import { TbCaretDownFilled, TbCaretUpFilled } from "react-icons/tb";
import { MdBusinessCenter } from "react-icons/md";
import { MdElectricRickshaw } from "react-icons/md";
import { FaLandmark } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Side.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  const handlelogout = () => {
    localStorage.removeItem('auth1');
    navigate('/');
  }

  return (
    <div className="Sidebar p-4">
      <div className="side">
        <div className="topside d-flex align-items-center justify-content-between">
          <img src={logo} className="logo" alt="logo" />
          <div className="ts-icons">
            <IoHeartOutline className="ts-icon" />
            <GoBell className="ts-icon" />
            <Link to="/main/jobs ">
              <FaRegUserCircle className="ts-icon text-white" />
            </Link>
            <IoPowerOutline className="ts-icon text-white" onClick={handlelogout}/>
          </div>
        </div>
        <div className="ts-middle mt-4">
          <ul className="p-0">
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
                <p className="mb-0 ms-4 cate-text">CATEGORIES</p>
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
                    <FaLandmark className="me-3 fs-5" /> Construction
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
        </div>
        <div
          className="ts-bottom"
          style={{ position: "absolute", bottom: "25" }}
        >
          {/* <ThemeToggleButton /> */}
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
