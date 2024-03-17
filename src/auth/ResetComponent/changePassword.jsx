import React from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';
   import axios from 'axios';
  import { authapi } from '../../config/serverUrl';
  import { Toast } from "primereact/toast";
  import { useRef } from 'react';
  import { IoMdCheckmarkCircle } from "react-icons/io";
  import './loader.css'
  import { useNavigate } from 'react-router';
import Calendars from '../../utils/Calender';

const ChangePassword = ({
    mobile,
    email
}) => {
    const navigate = useNavigate();
  const schema = yup.object().shape({
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
 // Ensuring that date of birth is required
  });
  const toast = useRef(null);
  const [hasLoader, setHasLoader] = useState(false);

  const [date, setDate] = useState(new Date());
  const [DateError, setDateError] = useState('');
  const initialValues = {
    password: '',
    confirmPassword: '',
   
  };
  
  
  const formattedDob = date ? date.toISOString().split('T')[0] : '';

  
   console.log('date',formattedDob);

  const onchageDate = async(e) => {
    setDateError('');
    setDate(e.value);
  }

  const handleSubmit = async(values, { setSubmitting }) => {
    // Handle form submission here
    if(date == null){
        setDateError('Date of Birth is required');
    }else{
        
        setHasLoader(true);
        
        const res = await axios.post(`${authapi}/auth/reset_password`,{
            email:email,
            mobile:mobile,
            password:values.password,
            dob:formattedDob
        });
        console.log('response final phone otp',res);
        if (res.data) {
          if (res.data.code == 200) {
           
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: res.data.data.message,
              life: 3000,
            });
            setHasLoader(false);
            
            navigate('/login', { state: { reset: 'success' } });
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
        {({ errors }) => (
          <Form>
            <p className="mt-3" style={{ color: "#8b8b8b" }}>
              Date Of Birth
            </p>
            <div className="row">
              <div className="col-6">
           
              <Calendar
        id="buttondisplay"
        value={date}
        onChange={(e)=>setDate(e.value)}
        showIcon
        name="dateOfBirth"
        // Adjust the month index by adding 1
        monthNavigator
        yearNavigator
        yearRange="1990:2024"
        dateFormat="dd/mm/yy"
        inputId="in"
      />
                {/* Display error message for date of birth */}
                 {
                    DateError ? (<div style={{ color: 'red' }}>{DateError}</div>) : null
                 }
                
              </div>
              <div className="col-6"></div>
            </div>

            <div className="row">
              <div className="col-6">
                <Field
                  className={`form-control${errors.password ? '  is-invalid' : ''}`}
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  style={{ borderLeft: "2px solid #e6e6e6", padding: "9px",borderLeft:errors.password?'2px solid red' :'2px solid #d1d5db' }}
                />
                <ErrorMessage style={{ color: 'red' }} name="password" component="div" />
              </div>
              <div className="col-6">
                <Field
                  className={`form-control${errors.confirmPassword ? '  is-invalid' : ''}`}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  style={{ borderLeft: "2px solid #e6e6e6", padding: "9px",borderLeft:errors.password?'2px solid red' :'2px solid #d1d5db' }}
                />
                <ErrorMessage style={{ color: 'red' }} name="confirmPassword" component="div" />
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <p></p>
             


              {!hasLoader ? (
                <button 
                style={{
                    backgroundColor: "#2196f3",
                    color:"white"
                }}
                disabled={!mobile || !email} type="submit" className="btn btn-verify mt-3">
                {" "}
                Continue
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
          </Form>
        )}
      </Formik>
    </div>
    </>
  );
};

export default ChangePassword;
