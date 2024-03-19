import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
import under from "../assets/images/Development.svg";
import "./Maintainence.css"
const Maintainence = () => {

  return (
    <div className="Maintain">
      <div className="card d-flex justify-content-between">
        <div className="text-container" >
          <h2
            className="text-center"
            style={{ fontSize: "30px", fontWeight: "500" }}
          >
            Welcome To
          </h2>
          <h2
            className="text-center text-kod"
            style={{ fontWeight: "800", color: "#1877F2" }}
          >
            Kodukku
          </h2>
          <p
            className="text-center"
            style={{ fontSize: "14px", fontWeight: "500" }}
          >
            Our Website is under Development
          </p>
        </div>
        <div className="img-under" style={{ margin:" 0 auto"}}>
          
            <img src={under} alt="" className="img-fluid" />
          
        </div>
      </div>
    </div>
  );
};

export default Maintainence;
