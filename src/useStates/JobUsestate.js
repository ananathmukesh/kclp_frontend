// ContactFormState.js

import { useState } from "react";

const Jobusestates = () => {
  const [ContactForm, setContactForm] = useState({
    userid: "",
    phoneNumber1: "99367763563",
    Street: "",
    place: "",
    taluk: "",
    district: "",
    zipcode: "",
    idproof: "",
    idnumber: "",
    issueDate: "",
    country: "",
    IssuingAuthority: "",
    plotname: "",
    plotnumber: "",
  });

  const [PersonalDetailsForm, setPersonalDetailsForm] = useState({
    userid: "",
    dob: "",
    age: "",
    gender: "",
    material_status: "",
    occupation: "",
    disability: "",
    description: "",
    relation_name: "",
    relation_dob: "",
    relation_age: "",
    relation: "",
  });

  const [EducationalDetailsForm, setEducationalDetailsForm] = useState({
    userid: "",
    clg_course: "",
    clg_specialization: "",
    start_year: "",
    end_year: "",
    university: "",
    collage: "",
    scl_qualification: "",
    scl_specialization: "",
    scl_start: "",
    scl_end: "",
    scl_name: "",
    scl_percentage:"",
    clg_percentage:""
  });


  const [personaldetails, setPersonaldetails] = useState("");
  const [EducationalDetails, setEducationalDetails] = useState("");
  const [personalformGender, setPersonalformGender] = useState("");
  const [ErrorValidYear, setValidYear] = useState('');


  return {
    ContactForm,
    setContactForm,
    personaldetails,
    setPersonaldetails,
    PersonalDetailsForm,
    setPersonalDetailsForm,
    personalformGender,
    setPersonalformGender,
    EducationalDetails,
    setEducationalDetails,
    EducationalDetailsForm,
     setEducationalDetailsForm,
     ErrorValidYear,
     setValidYear
  };
};

export default Jobusestates;
