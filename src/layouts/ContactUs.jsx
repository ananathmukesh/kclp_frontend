import React from "react";
import call from "../assets/images/peoplework.jpg";
import Grid from "@mui/material/Grid";

const ContactUs = () => {
  return (
    <div>
      <div className="card">
        {/* <div className="card" style={{ margin: "40px 20px" }}> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img src={call} alt="" className="img-fluid" />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="">
              <h3 className="text-center mt-md-0 mt-3">Contact Us</h3>
              <div className="ms-md-5 mt-md-5">
                <p
                  className=""
                  style={{ fontSize: "1.5rem", marginTop: "30px" }}
                >
                  Customer Care
                </p>
                <p style={{ color: "#646464", fontSize: "16px" }}>
                  CustomerCare@kodukku.com
                </p>
                <p style={{ fontSize: "1.5rem", marginTop: "30px" }}>
                  Address:
                </p>
                <p className="" style={{ color: "#646464", fontSize: "16px" }}>
                  253 Thanthai Periyar Nagar,
                  <br />
                  Pallikaranai,
                  <br /> Chennai,
                  <br /> Tamil Nadu - 600100
                </p>
                <p style={{ fontSize: "1.5rem", marginTop: "30px" }}>Email</p>
                <p className="" style={{ color: "#646464", fontSize: "16px" }}>
                  Hr@kodukku.com
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ContactUs;
