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
import { useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import "./loader.css";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import axios from "axios";
import { authapi } from "../../config/serverUrl";

const SendOtpMobile = ({ email, setTimeHider,setFormikmailOtpErrors }) => {
  const toast = useRef(null);
  const schema = yup.object().shape({
    otp: yup
      .string()
      .matches(/^[0-9]{6}$/, "Invalid OTP. Must be 6 digits.")
      .required("OTP is required"),
  });

  const [otpresponse, setOtpresponse] = useState(0);
  const [afterRes, setafterRes] = useState(0);
  const [hasLoader, setHasLoader] = useState(false);

  const initialValues = {
    otp: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (afterRes == 0) {
      setHasLoader(true);
      const res = await axios.post(`${authapi}/auth/validate_email`, {
        otp: values.otp,
        email: email,
      });
      console.log(res, email, values.otp);
      if (res.data) {
        if (res.data.code == 200) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: res.data.data.message,
            life: 3000,
          });
          setHasLoader(false);
          setTimeHider(true);
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
  setFormikmailOtpErrors(errors); // Update formikErrors state with the current errors
        return (
          <>
          <Form>
              <div className="row align-items-center mt-2">
                <div className="col-lg-8 col-md-4">
                  <Field
                    type="number"
                    name="otp"
                    placeholder="Enter OTP"
                    style={{ borderLeft: "2px solid #e6e6e6", padding: "9px" }}
                    className={`form-control${
                      errors.otp && errors.otp
                        ? "  is-invalid"
                        : ""
                    }`}
                    {...(afterRes === 1 ? { readOnly: true } : {})}
                    maxLength={6}
                    onInput={(e) => {
                      if (e.target.value.length > 6) {
                        e.target.value = e.target.value.slice(0, 6); // Limit the input to 6 characters
                      }
                    }}
                  />
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="">
                    {!hasLoader ? (
                      <button
                        className="btn btn-verify px-4"
                        type="submit"
                        style={{
                          backgroundColor: "#2196f3",
                          color: "white",
                        }}
                      >
                        {afterRes == 0 ? (
                          "Verify"
                        ) : (
                          <IoMdCheckmarkCircle
                            style={{ width: "30px", height: "30px" }}
                          />
                        )}
                      </button>
                    ) : (
                      <button
                        className="btn btn-verify px-4"
                        type="submit"
                        style={{
                          backgroundColor: "#2196f3",
                          color: "white",
                        }}
                      >
                        {otpresponse == 1 ? (
                          <span class="loader"></span>
                        ) : (
                          "Verify"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* <ErrorMessage
                style={{ color: "red" }}
                name="otp"
                component="div"
              /> */}
            </Form>
          </>
        );
      }}









         
        </Formik>
      </div>
    </>
  );
};

export default SendOtpMobile;
