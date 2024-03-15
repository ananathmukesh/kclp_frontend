import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  CaretLeft,
  CaretRight,
  Phone,
  UserCircle,
  GitFork,
  Envelope,
  LockOpen,
} from "@phosphor-icons/react";
import SendOtpMobile from "./SendOtpMobile";
import "./loader.css";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import axios from "axios";
import { authapi } from "../../config/serverUrl";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useEffect } from "react";
import TimerNew from "../../utils/Timmernew";
import Timer from "../../utils/Timer";

const SendOtpMail = ({setEmail,setTimer,email,TimeHider,setFormikErrors,formikErrors,setTimerState}) => {

  

  const [timerOn, setTimerOn] = useState(false); // Initially, timer is not running

   const [showhider,setShowhider] = useState(null);
    // State to store Formik errors
       console.log('formikErrors',formikErrors);

   const [showResendButtoon,setshowResendButtoon] = useState(null);
  
  const toast = useRef(null);
  const [otpresponse, setOtpresponse] = useState(0);
  const [afterRes, setafterRes] = useState(0);
  const [hasLoader, setHasLoader] = useState(false);


  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const initialValues = {
    email: "",
  };



  const handleSubmit = async(values, { setSubmitting }) => {
    if(afterRes == 0){
      setHasLoader(true);
      console.log(values.email);
      const res = await axios.post(`${authapi}/auth/updatemailotp`, {
        email: values.email,
      });
      console.log('response',res);
      if (res.data) {
        if (res.data.code == 200) {
          setEmail(values.email);
          setshowResendButtoon(true);
        
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: res.data.data.message,
            life: 3000,
          });
          setTimerState(true);
          setHasLoader(false);
          setafterRes(1);
        } else {
          setHasLoader(false);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: res.data.data.message,
            life: 3000,
          });
        }
      }
    }
  
  };

  return (
    <>
      <Toast ref={toast} />
      <div>
      <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ errors }) => {
        setFormikErrors(errors); // Update formikErrors state with the current errors
        return (
          <>
            <Form>
              <div className="input-group d-flex">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Envelope size={28} />
                  </span>
                </div>
                <Field
                  type="text"
                  name="email"
                  placeholder="E-Mail"
                  className={`form-control${
                    errors.email ? "  is-invalid" : ""
                  }`}
                />
                {!hasLoader ? (
                  <button
                    className="btn btn-verify btn-verify"
                    value="sendmailotp"
                    type="submit"
                    style={{
                      backgroundColor: "#2196f3",
                      color: "white",
                      width: "113px",
                    }}
                  >
                    {afterRes === 0 ? (<span>GET OTP</span>) : (<IoMdCheckmarkCircle style={{ width: "30px", height: "30px" }} />)}
                  </button>
                ) : (
                  <button
                    className="btn btn-verify btn-verify"
                    value="sendmailotp"
                    type="submit"
                    style={{
                      backgroundColor: "#2196f3",
                      color: "white",
                      width: "113px",
                      height: "43px",
                    }}
                  >
                    <span className="loader"></span>
                  </button>
                )}
              </div>
            </Form>
            {/* <div>
              <ErrorMessage
                style={{ color: "red" }}
                name="email"
                component="div"
              />
            </div> */}
          </>
        );
      }}
    </Formik>
      </div>
      
      {/* {
        !TimeHider && (
          <Timer email={email} setShowhider={setShowhider} showhider={showhider} showResendButtoon={showResendButtoon} setshowResendButtoon={setshowResendButtoon} />
        )
      } */}
   
      
      
    </>
  );
};

export default SendOtpMail;
