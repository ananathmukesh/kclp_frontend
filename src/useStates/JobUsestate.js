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




  const [JobDetailsForm, setJobDetailsForm] = useState({
    userid: "",
    user_role:"",
    work_experiance: "",
    current_role: "",
   
    current_job: "",
    current_company: "",
    previous_company: "",
    industry: "",
    
    currently_located:"",
    open_to_work:"",
    salary_expectation:"",
    notice_period:"",

    prefered_job:"",
    prefered_role:"",

    start_career_month:"",
    start_career_year:"",
    reason_career_break:"",

   
  });


  const [personaldetails, setPersonaldetails] = useState("");
  const [Jobdetails, setJobdetails] = useState("");
  const [EducationalDetails, setEducationalDetails] = useState("");
  const [personalformGender, setPersonalformGender] = useState("");
  const [ErrorValidYear, setValidYear] = useState('');
  const [PreferedRole, setPreferedRole] = useState('');
  const [UserRole, setUserrole] = useState('');
  const [FormType, setFormType] = useState('save');
  const [resumedata, setResumedata] = useState('');

  const [DBskills, setDBskills] = useState({
    yearsOfExperience: "",
    currentRole: "",
    skills: Array(1).fill({ name: "", level: "" }),
  });
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
     setValidYear,
     JobDetailsForm, setJobDetailsForm,
     Jobdetails, setJobdetails,
     PreferedRole, setPreferedRole,
     UserRole, setUserrole,
     DBskills, setDBskills,
     resumedata, setResumedata
  };
};

export default Jobusestates;
