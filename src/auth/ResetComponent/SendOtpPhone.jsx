import React from "react";
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
import { useState } from "react";
import axios from "axios";
import { authapi } from "../../config/serverUrl";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import "./loader.css";
import MobileNumberTimer from "../../utils/MobileTimer";

const SendOtpPhone = ({ email, setMobile, mobile, MobileTimeHider,setformikMobileErrors,setTimerStatem }) => {
  const [showhider, setShowhider] = useState(null);

  const [showResendButtoon, setshowResendButtoon] = useState(null);
  const schema = yup.object().shape({
    mobileNumber: yup
      .string()
      .matches(/^\d{10}$/, "Invalid mobile number")
      .required("Mobile number is required"),
  });
  const toast = useRef(null);

  const [afterRes, setafterRes] = useState(0);
  const [hasLoader, setHasLoader] = useState(false);
  const initialValues = {
    mobileNumber: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (afterRes == 0) {
      setHasLoader(true);

      const res = await axios.post(`${authapi}/auth/update_otp`, {
        email: email,
        mobile: values.mobileNumber,
      });
      console.log("response phone otp", res);
      if (res.data) {
        if (res.data.code == 200) {
          setMobile(values.mobileNumber);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: res.data.data.message,
            life: 3000,
          });
          setTimerStatem(true);
          setshowResendButtoon(true);
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
  setformikMobileErrors(errors); // Update formikErrors state with the current errors
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
                  type="number"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  className={`form-control${
                    errors.mobileNumber && errors.mobileNumber
                      ? "  is-invalid"
                      : ""
                  }`}
                  {...(afterRes === 1 ? { readOnly: true } : {})}
                  maxLength={10}
                  onInput={(e) => {
                    if (e.target.value.length > 10) {
                      e.target.value = e.target.value.slice(0, 10); // Limit the input to 6 characters
                    }
                  }}
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
                    {afterRes == 0 ? (
                      <span>GET OTP</span>
                    ) : (
                      <IoMdCheckmarkCircle
                        style={{ width: "30px", height: "30px" }}
                      />
                    )}
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
                    <span class="loader"></span>
                  </button>
                )}
              </div>
              {/* <ErrorMessage
                style={{ color: "red" }}
                name="mobileNumber"
                component="div"
              /> */}
            </Form>
          </>
        );
      }}







          
        </Formik>
      </div>
      {!MobileTimeHider && (
        <MobileNumberTimer
          email={email}
          mobile={mobile}
          setShowhider={setShowhider}
          showhider={showhider}
          showResendButtoon={showResendButtoon}
          setshowResendButtoon={setshowResendButtoon}
        />
      )}
    </>
  );
};

export default SendOtpPhone;
