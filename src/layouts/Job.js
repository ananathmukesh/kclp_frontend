import React, { useState } from "react";
import "./job.css";
import bird from "../assets/images/bird_2.jpg";
import { Link } from "react-router-dom";

// Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRef } from "react";
// modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Work from "./work2";

import { Nodeapi } from '../config/serverUrl'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Toast } from 'primereact/toast';

import { useEffect } from "react";
import { ContactInformation } from "../routes/profileRoutes";
import Jobusestates from "../useStates/JobUsestate";
import { AddContactForm,UpdateContactForm,FetchDetails,AddDetails,UpdateDetails } from "../routes/profileRoutes";


const validationSchema = Yup.object().shape({
  phoneNumber1: Yup.number().required('Phone Number is required'),
  street: Yup.string().required('Street is required'),
  placeVillage: Yup.string().required('Place/Village is required'),
  taluk: Yup.string().required('Taluk is required'),
  selectedDistrict: Yup.string().required('District is required'),
  zipCode: Yup.number().required('Zip Code is required'),
  idProof: Yup.string().required('ID Proof is required'),
  idNumber: Yup.string().required('ID Number is required'),
  issueDate: Yup.date().required('Issue Date is required'),
  selectedCountry: Yup.string().required('Country is required'),
  issuingAuthority: Yup.string().required('Issuing Authority is required'),
});



function createData(name, calories, fat, carbs, Description) {
  return { name, calories, fat, carbs, Description };
}

const rows = [
  createData(
    "Fan",
    "USHA",
    "1 month",
    " 20-10-12",
    "Minor scratches on the fan blades.Excellent working condition."
  ),
  createData(
    "Sofa",
    "Furtniture ",
    "1 montnh",
    " 20-10-12",
    "Minor scratches on the fan blades.Excellent working condition."
  ),
];

// Vehicle

function vehicleData(model, type, vehicleNo, dealerAgency, description) {
  return { model, type, vehicleNo, dealerAgency, description };
}

const vehiclerows = [
  vehicleData(
    "Toyota Camry",
    "Sedan",
    "ABC123",
    "Toyota Dealership",
    "Reliable sedan with advanced safety features"
  ),
  vehicleData(
    "Ford Explorer",
    "SUV",
    "XYZ789",
    "Ford Dealership",
    "Versatile SUV with spacious interior and modern technology"
  ),
  vehicleData(
    "Chevrolet Corvette",
    "Sports Car",
    "DEF456",
    "Chevrolet Dealership",
    "High-performance sports car known for speed and style"
  ),
];

// Gadget

function gadgetData(gadget, brand, warranty, purchaseDate, description) {
  return { gadget, brand, warranty, purchaseDate, description };
}

const gadgetrows = [
  gadgetData(
    "Smartphone",
    "ABC Brand",
    "1 year",
    "2023-01-15",
    "High-end smartphone with advanced features"
  ),
  gadgetData(
    "Laptop",
    "XYZ Brand",
    "2 years",
    "2022-09-28",
    "Powerful laptop for gaming and productivity"
  ),
  gadgetData(
    "Smartwatch",
    "PQR Brand",
    "1.5 years",
    "2023-05-10",
    "Fitness tracking and notifications"
  ),
  gadgetData(
    "Tablet",
    "LMN Brand",
    "1 year",
    "2022-11-20",
    "Portable tablet for entertainment and work"
  ),
  gadgetData(
    "Camera",
    "DEF Brand",
    "3 years",
    "2022-07-05",
    "Professional-grade camera for photography"
  ),
];

//property
function createDatas(
  type,
  availability,
  property,
  location,
  description,
  land
) {
  return { type, availability, property, location, description, land };
}

const propertys = [
  createDatas(
    "House - 2BHK",
    "RENT",
    "Residential",
    "2500Sqft",
    "Chennai",
    "Charming 2-bed, 1-bath in Cityville. Cozy living space, updated kitchen. Close to amenities. Ideal for couples or singles. Check it out!"
  ),
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0px",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
};

const modaljob = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "0px",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
};

function Job() {

  const { 
    ContactForm, setContactForm,
     personaldetails,setPersonaldetails,
     PersonalDetailsForm, setPersonalDetailsForm,
     EducationalDetails, setEducationalDetails,
     EducationalDetailsForm, setEducationalDetailsForm,
  } = Jobusestates();

const [personalformGender,setPersonalformGender] = useState("");


const [validStartYear, setValidStartYear] = useState('');
const [validEndYear, setValidEndYear] = useState('');
const [validSclStart, setValidSclStart] = useState('');
const [validSclEnd, setValidSclEnd] = useState('');


console.log('Educational details data',EducationalDetails);

  const handlePersonalDetails = (e) => {
    const { name, value } = e.target;
    setPersonalDetailsForm({
      ...PersonalDetailsForm,
      [name]: value,
      userid: userState.id,
      gender:personalformGender
     
    });
  };

   const handleEducationalDetails = (e) => {
    const { name, value } = e.target;
    console.log(`${name}:${value}`);
    setEducationalDetailsForm({
      ...EducationalDetailsForm,
      [name]: value,
      userid: userState.id,
     
     
    });
   
    const isValidYear = /^\d{4}$/.test(value);

    if (name.trim() === 'start_year') {
      isValidYear ? setValidStartYear('') : setValidStartYear('Please enter a valid four-digit year.');
    } else if (name.trim() === 'end_year') {
      isValidYear ? setValidEndYear('') : setValidEndYear('Please enter a valid four-digit year.');
    } else if (name.trim() === 'scl_start') {
      isValidYear ? setValidSclStart('') : setValidSclStart('Please enter a valid four-digit year.');
    } else if (name.trim() === 'scl_end') {
      isValidYear ? setValidSclEnd('') : setValidSclEnd('Please enter a valid four-digit year.');
    }
    
  };


   console.log('educationsl details',EducationalDetailsForm);
  const toast = useRef(null);
  const [contactinf,setContactInformation] = useState('');
  

  const [profileData, setProfileData] = useState({
    gender: "",
  });


  const [Name, setName] = React.useState(false);
  const handleNameOpen = () => setName(true);
  const handleNameClose = () => setName(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [personal, setpersonal] = React.useState(false);
  const handlePersonalOpen = () => setpersonal(true);
  const handlePersonalClose = () => setpersonal(false);

  const [Education, setEducation] = React.useState(false);
  const handleEducationOpen = () => setEducation(true);
  const handleEducationClose = () => setEducation(false);

  const [Job, setJob] = React.useState(false);
  const handleJobOpen = () => setJob(true);
  const handleJobClose = () => setJob(false);

  const [Home, setHome] = React.useState(false);
  const handleHomeOpen = () => setHome(true);
  const handleHomeClose = () => setHome(false);

  const [Vehicle, setVehicle] = React.useState(false);
  const handleVehicleOpen = () => setVehicle(true);
  const handleVehicleClose = () => setVehicle(false);

  const [Gadget, setGadget] = React.useState(false);
  const handleGadgetOpen = () => setGadget(true);
  const handleGadgetClose = () => setGadget(false);

  const [Property, setProperty] = React.useState(false);
  const handlePropertyOpen = () => setProperty(true);
  const handlePropertyClose = () => setProperty(false);
  const [selectedSpecializations, setSelectedSpecializations] = useState("");

  const handleGenderClick = (selectedGender) => {
    setProfileData((prevData) => ({ ...prevData, gender: selectedGender }));
  };

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [commercialType, setCommercialType] = useState("");
  const [residentialType, setResidentialType] = useState("");
  const [bhkType, setBhkType] = useState("");
  const [furnishingOptions, setFurnishingOptions] = useState([]);
  const [saleDate, setSaleDate] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [saleDetails, setSaleDetails] = useState([]);
  const [agriculturalType, setAgriculturalType] = useState("");
  const [industrialType, setIndustrialType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [landSquarefit, setLandSquarefit] = useState("");
  const [propertyDescription, setPropertyDescription] = useState("");

  const handlePropertyTypeChange = (propertyType) => {
    // If the property type is commercial, unselect other types
    if (propertyType === "commercial") {
      setCommercialType("");
      setResidentialType("");
      setBhkType("");
      setAgriculturalType("");
      setIndustrialType("");
    } else if (propertyType === "house") {
      // If the property type is house, unselect other types
      setCommercialType("");
      setAgriculturalType("");
      setIndustrialType("");
    } else if (propertyType === "agricultural") {
      // If the property type is agricultural, unselect other types
      setCommercialType("");
      setResidentialType("");
      setBhkType("");
      setIndustrialType("");
    } else if (propertyType === "industrial") {
      // If the property type is industrial, unselect other types
      setCommercialType("");
      setResidentialType("");
      setBhkType("");
      setAgriculturalType("");
    }

    const updatedPropertyTypes = [propertyType];
    setPropertyTypes(updatedPropertyTypes);
  };

  const handleResidentialTypeChange = (event) => {
    setResidentialType(event.target.value);
  };
  const handlePropertyDescriptionChange = (event) => {
    setPropertyDescription(event.target.value);
  };

  const handleBhkTypeChange = (bhkType) => {
    setBhkType(bhkType);
  };
  const handleAgriculturalTypeChange = (e) => {
    setAgriculturalType(e.target.value);
  };

  const handleIndustrialTypeChange = (e) => {
    setIndustrialType(e.target.value);
  };
  const handleDeleteDetails = (index) => {
    const updatedSaleDetails = [...saleDetails];
    updatedSaleDetails.splice(index, 1);
    setSaleDetails(updatedSaleDetails);
  };
  const handleAddDetails = () => {
    const newSaleDetails = {
      propertyTypes,
      commercialType,
      residentialType,
      bhkType,
      furnishingOptions,
      saleDate,
      sellerName,
      propertyLocation,
      saleAmount,
      agriculturalType,
      industrialType,
      propertyStatus,
      landSquarefit,
    };

    setSaleDetails([newSaleDetails]);
    setPropertyTypes([]);
    setCommercialType("");
    setResidentialType("");
    setBhkType("");
    setFurnishingOptions([]);
    setSaleDate("");
    setSellerName("");
    setPropertyLocation("");
    setSaleAmount("");
    setAgriculturalType("");
    setIndustrialType("");
    setPropertyStatus("");
    setLandSquarefit("");
  };

  // education

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };
  const handleSpecializationsChange = (e) => {
    setSelectedSpecializations(e.target.value);
  };


  const [data,setData] = useState('');
  const Specializations = [
    // Engineering
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Aerospace Engineering",
    "Chemical Engineering",
    "Computer Engineering",
    "Software Engineering",

    // Computer Science
    "Computer Science",
    "Computer Application",
    "Data Science",
    "Information Technology",
    "Web Development",
    "Mobile App Development",
    "Cybersecurity",
    "Artificial Intelligence",

    // Health Sciences
    "Nursing",
    "Medicine",
    "Pharmacy",
    "Public Health",
    "Physical Therapy",
    "Occupational Therapy",
    "Radiology",

    // Business and Management
    "Finance",
    "Marketing",
    "Human Resources",
    "International Business",
    "Entrepreneurship",
    "Operations Management",
    "Supply Chain Management",

    // Social Sciences
    "Psychology",
    "Sociology",
    "Anthropology",
    "Political Science",
    "Economics",
    "International Relations",
    "Criminology",

    // Natural Sciences
    "Biology",
    "Chemistry",
    "Physics",
    "Environmental Science",
    "Geology",
    "Astronomy",
    "Mathematics",

    // Humanities
    "English Literature",
    "History",
    "Philosophy",
    "Fine Arts",
    "Linguistics",
    "Cultural Studies",
    "Music",

    // Education
    "Elementary Education",
    "Secondary Education",
    "Special Education",
    "Educational Leadership",
    "Curriculum and Instruction",
    "Counseling",

    // Media and Communication
    "Journalism",
    "Public Relations",
    "Media Studies",
    "Advertising",
    "Broadcasting",
    "Digital Media",

    // Information Technology
    "Network Administration",
    "Cloud Computing",
    "Digital Forensics",
    "IT Management",

    // Design
    "Graphic Design",
    "Industrial Design",
    "Interior Design",
    "Fashion Design",
    "UX/UI Design",
    "Game Design",

    // Agriculture and Environmental Science
    "Agronomy",
    "Horticulture",
    "Forestry",
    "Soil Science",
    "Environmental Management",
    "Wildlife Biology",
  ];
  const [selectedDegree, setSelectedDegree] = useState("");
  const allDegrees = [
    "Associate's",
    "Bachelor's",
    "Master's",
    "Ph.D.",
    "MD",
    "DMD",
    "DVM",
    "PharmD",
    "JD",
    "BSE",
    "MSE",
    "DEng",
    "BCA",
    "BSCS",
    "MSCS",
    "DCS",
    "BBA",
    "MBA",
    "DBA",
    "BSN",
    "MPH",
    "MD",
    "DMD",
    "PharmD",
    "BAP",
    "MAS",
    "PhD",
    "BS",
    "MS",
    "PhD",
    "BA",
    "MFA",
    "PhD",
    "BEd",
    "MEd",
    "EdD",
    "BA",
    "MA",
    "DC",
    "BSIT",
    "MSIS",
    "DIT",
    "BFA",
    "MDes",
    "DDes",
    "BSA",
    "MSES",
    "PhD",
  ];
  const handleUniversityChange = (e) => {
    setSelectedUniversity(e.target.value);
  };
  const [selectedUniversity, setSelectedUniversity] = useState("");

  const allUniversities = [
    "Research University",
    "Liberal Arts University",
    "Technical University",
    "Medical University",
    "Engineering University",
    "Business School",
    "Law School",
    "Art and Design School",
    "Agricultural University",
    "Music Conservatory",
    "Open University",
    "Online University",
    "Madras university",
    "Anna university",
    "Private University",
    "Public University",
    "Ivy League",
    "Historically Black College or University (HBCU)",
    "Community College",
    "State University",
    "International University",
    "Religious University",
    "Military Academy",
    "Women s University",
    "Men s University",
  ];
  const schoolQualificationList = [
    "SSLC (Secondary School Leaving Certificate)",
    "HSC (Higher Secondary Certificate)",
    "CBSE (Central Board of Secondary Education)",
    "ICSE (Indian Certificate of Secondary Education)",
    "ISC (Indian School Certificate)",
    "State Board",
    "Matriculation",
    "O-Level (Ordinary Level)",
    "A-Level (Advanced Level)",
    "GED (General Educational Development)",
    "High School Diploma",
    "National Certificate of Educational Achievement (NCEA)",
    "Brevet des Collèges",
    "Diploma di Maturità",
    "Abitur",
    "Eindexamen",
    "Leaving Certificate",
    "Matura",
    "Selectividad",
    "Vysvedčenie o maturitnej skúške",
    // Add more qualifications as needed
  ];
  const academicDisciplines = [
    "Computer Science",
    "Mathematics",
    "Biology",
    "Physics",
    "Chemistry",
    "Environmental Science",
    "Geology",
    "Astronomy",
    "Economics",
    "Political Science",
    "Psychology",
    "Sociology",
    "Anthropology",
    "History",
    "Philosophy",
    "Literature",
    "Languages and Linguistics",
    "Art History",
    "Music Theory",
    "Drama and Theater Arts",
    "Dance",
    "Film Studies",
    "Media Studies",
    "Communication Sciences",
    "Business Administration",
    "Marketing",
    "Finance",
    "Accounting",
    "Human Resource Management",
    "International Business",
    "Entrepreneurship",
    "Medical Science",
    "Nursing",
    "Pharmacy",
    "Dentistry",
    "Veterinary Science",
    "Physics Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    "Computer Engineering",
    // Add more disciplines as needed
  ];

  const handleDegreeChange = (e) => {
    setSelectedDegree(e.target.value);
  };
  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    description: "",
    highestQualification: "",
    specialization: "",
    collegeName: "",
    graduatedYear: "",
    educationType: "",
  });

  const handleEducationDetailsChange = (index, field, value) => {
    const updatedEducationDetails = [...educationDetails];
    updatedEducationDetails[index] = {
      ...updatedEducationDetails[index],
      [field]: value,
    };
    setEducationDetails(updatedEducationDetails);
  };
  const [educationDetails, setEducationDetails] = useState([
    {
      highestQualification: true,
      course: "",
      specialization: "",
      year: "",
      university: "",
    },
  ]);



  const formik = useFormik({
    initialValues: {
      phoneNumber1: '',
      street: '',
      placeVillage: '',
      taluk: '',
      selectedDistrict: '',
      zipCode: '',
      idProof: '',
      idNumber: '',
      issueDate: '',
      selectedCountry: '',
      issuingAuthority: '',
    },
    validationSchema,
    onSubmit: (values) => {
    
      console.log(values);
    },
  });


const [userState,setUsersate] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...ContactForm,
      [name]: value,
      userid: userState.id,
      
    });
  };

 

  
   console.log('education details',EducationalDetailsForm);

  const areAllFieldsEmpty = (formData) => {
    if (!formData || typeof formData !== 'object') {
      return true;
    }
    return Object.values(formData).every(value => value === null || value === undefined || String(value).trim() === '');
  };
  
  
  const isFormDataEmpty = areAllFieldsEmpty(ContactForm);
  
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth1"));
    if(authData){
      setUsersate(authData);
    }
    const fetchContactInformation = async () => {
      const contact = await ContactInformation(authData.id);
      if(contact){
        setData(contact);
      }

      const fetchPersonalDetails = await FetchDetails(authData.id,'PersonalDetails');
      if(fetchPersonalDetails){
        setPersonaldetails(fetchPersonalDetails);
      }

      const fetchEducationalDetails = await FetchDetails(authData.id,'EducationalDetails');
      if(fetchEducationalDetails){
        setEducationalDetails(fetchPersonalDetails);
      }

      
    } 
    fetchContactInformation();
  }, [])
  
  
  const handleContactForm = async (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value; 

    if(action.trim() == 'update'){
      const addcontact = await UpdateContactForm(ContactForm);
      if(addcontact){
        setOpen(false);
        toast.current.show({severity:'success', summary: 'Success', detail:addcontact.data.data.message, life: 3000});
        const contact = await ContactInformation(1);
        if(contact){
          setData(contact);
        }
      }else{
        toast.current.show({severity:'success', summary: 'Success', detail:addcontact.data.data.message, life: 3000});
    }
    }else{
      const addcontact = await AddContactForm(ContactForm);
      if(addcontact){
        setOpen(false);
        toast.current.show({severity:'success', summary: 'Success', detail:addcontact.data.data.message, life: 3000});
        const contact = await ContactInformation(1);
        if(contact){
          setData(contact);
        }
      }else{
        toast.current.show({severity:'success', summary: 'Success', detail:addcontact.data.data.message, life: 3000});
    }
    }
    
  }
  



  const HandleAddEducationDetails = async (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value; 

    if(action.trim() == 'update'){
      const educationalUpdatedetails = {
        insertdata : EducationalDetailsForm,
        "table":"EducationalDetails",
        "insertMessage":"Educational Details Updated Successfully"
      }
      const EducationalDetails = await UpdateDetails(educationalUpdatedetails);
      if(EducationalDetails){
        setEducation(false);
        const fetchDetails = await FetchDetails(userState.id,'EducationalDetails');
        if(fetchDetails){
          setEducationalDetails(fetchDetails);
         }
        toast.current.show({severity:'success', summary: 'Success', detail:EducationalDetails.data.data.message, life: 3000});
        
      }else{
        toast.current.show({severity:'success', summary: 'Success', detail:EducationalDetails.data.data.message, life: 3000});
    }
    }else{
      const educationaldetails = {
        insertdata : EducationalDetailsForm,
        "table":"EducationalDetails",
        "insertMessage":"Educational Details Inserted Successfully"
      }
      const addEducationaldetailsdata = await AddDetails(educationaldetails);
      if(addEducationaldetailsdata){
        setEducation(false);
        const fetchDetails = await FetchDetails(userState.id,'EducationalDetails');
        if(fetchDetails){
          setEducationalDetails(fetchDetails);
        }
        toast.current.show({severity:'success', summary: 'Success', detail:addEducationaldetailsdata.data.data.message, life: 3000});
      }else{
        toast.current.show({severity:'success', summary: 'Success', detail:addEducationaldetailsdata, life: 3000});
    }
    }
    
  }





  const HandleAddPersonalDetails = async (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value; 

    if(action.trim() == 'update'){
      const personalUpdatedetails = {
        insertdata : PersonalDetailsForm,
        "table":"PersonalDetails",
        "insertMessage":"Personal Details Updated Successfully"
      }
      const updateDetails = await UpdateDetails(personalUpdatedetails);
      if(updateDetails){
        setpersonal(false);
        const fetchPersonalDetails = await FetchDetails(userState.id,'PersonalDetails');

        if(fetchPersonalDetails){
        setPersonaldetails(fetchPersonalDetails);
         }
        toast.current.show({severity:'success', summary: 'Success', detail:updateDetails.data.data.message, life: 3000});
        
      }else{
        toast.current.show({severity:'success', summary: 'Success', detail:updateDetails.data.data.message, life: 3000});
    }
    }else{
      const personaldetails = {
        insertdata : PersonalDetailsForm,
        "table":"PersonalDetails",
        "insertMessage":"Personal Details Inserted Successfully"
      }
      const addPersonaldetailsdata = await AddDetails(personaldetails);
      if(addPersonaldetailsdata){
        setpersonal(false);
        const fetchPersonalDetails = await FetchDetails(userState.id,'PersonalDetails');
        if(fetchPersonalDetails){
          setPersonaldetails(fetchPersonalDetails);
        }
        toast.current.show({severity:'success', summary: 'Success', detail:addPersonaldetailsdata.data.data.message, life: 3000});
      }else{
        toast.current.show({severity:'success', summary: 'Success', detail:addPersonaldetailsdata, life: 3000});
    }
    }
    
  }

    const addContactValue = async (e) => {
      e.preventDefault();
      const contact = await ContactInformation(1);
      if(contact){
        setContactForm(contact);
      }else{
        setContactForm(null);
      }
    }

    const addEditValues = async (e,table) => {
      e.preventDefault();
      const fetchPersonalDetails = await FetchDetails(userState.id,table);
        if(fetchPersonalDetails){
          console.log(fetchPersonalDetails);
          setPersonalDetailsForm(fetchPersonalDetails);
        }else{
          setPersonalDetailsForm(null);
        }
    }


    const educational_edutvalue = async (e,table) => {
      e.preventDefault();
      const fetchDetails = await FetchDetails(userState.id,table);
      console.log('fetch the log details',fetchDetails);
        if(fetchDetails){  
          setEducationalDetailsForm(fetchDetails);
        }else{
          setEducationalDetailsForm(null);
        }
    }

  return (
   <>
     <Toast ref={toast} />
    <div className="job">
      <div className="card mt-4" style={{ position: "relative" }}>
        <div className="profile">
          <div className="pro-img text-center">
            <img
              src={bird}
              alt=""
              className="img-fluid"
              style={{
                width: "110px",
                borderRadius: "50%",
                boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.09)",
              }}
            />
          </div>
          <h5 className=" text-center mt-2">
            Tovino Thomas
            <sup>
              <Button
                onClick={handleNameOpen}
                style={{ position: "absolute", top: "-7rem", right: " -33rem" }}
              >
                <Link to="/main/demo">
                  <i class="fi fi-rr-file-edit ms-2"></i>
                </Link>
              </Button>
              <Modal
                open={Name}
                onClose={handleNameClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <p>NAme</p>
                  <button onClick={handleNameClose}>Close</button>
                </Box>
              </Modal>
            </sup>
          </h5>
        </div>
      </div>


      {/* start contact information */}
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Contact Information</h5>
          <p>
          <Button onClick={(e) => { handleOpen(); addContactValue(e); }}>
           {data.userid ? (
           <i className="fi fi-rr-file-edit ms-2"></i>
          ) : (
           <i className="fi fi-rr-layer-plus"></i>
           )}
    </Button>
          </p>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
          >
            <Box sx={style} style={{
              overflowY:"scroll",
              height:"90vh"
            }}>
            <form onSubmit={handleContactForm}>
            <div className="row" >
          
                <div className="col-6 my-2">
                  <label className="mb-1" htmlFor="">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Enter your mobile no"
                    name="phoneNumber1"
                   value='99367763563'
                   readOnly
                   onChange={handleInputChange}

                  />
                </div>
                 {formik.touched.phoneNumber1 && formik.errors.phoneNumber1 && (
                 <div className="error text-danger">{formik.errors.phoneNumber1}</div>
                 )}
                <div className="col-6"></div>
                <label className="mt-3">Address</label>
                <div className="col-6 my-2">
                <input
                type="text"
                className="form-control col-12 col-md-3"
                placeholder="Plot Number/Door Number"
                name="plotnumber"
                onChange={handleInputChange}
                  value={ContactForm ? ContactForm.plotnumber : ''}
                 />
              </div>

                <div className="col-6 my-2">
                  <input
                    type="text"
                    className="form-control col-12 col-md-3"
                    placeholder="Plot Name/House Name"
                    name="plotname"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.plotname : ''}

                  />
                </div>
                <div className="col-6 my-2">
                  <input
                    type="text"
                    className="form-control col-12 col-md-3"
                    placeholder="Street"
                    name="Street"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.Street :''}

                  />
                </div>
                <div className="col-6 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Place/Village"
                    name="place"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.place : ''}

                  />
                </div>
                <div className="col-6 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Taluk"
                    name="taluk"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.taluk : ''}

                  />
                </div>
                <div className="col-6 my-2">
                  <select
                    className="header_company form-control"
                    name="district"
                    id="district"
                    onChange={handleInputChange}
                   
                  >
                    <option value="">Select District</option>
                    <option value="kanchepuram">kanchepuram</option>
                    <option value="chengalpattu">chengalpattu</option>
                    <option value="tirunelveli">tirunelveli</option>
                   
                  </select>
                </div>
                <div className="col-6 my-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Zip Code"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.zipcode : ''}
                    name="zipcode"
                 
                  />
                </div>
                <div className="col-6 my-2"></div>
                {/* <label className="mt-3">Id Proof</label> */}
                <div className="col-6 my-2">
                  <label className="form-label" htmlFor="idNumber">
                    ID Prof:
                  </label>
                  <select
                    id="idproof"
                    className="form-select col-md-4 form-control"
                    onChange={handleInputChange}
                    name="idproof"
                  >
                  <option value="">Select ID Proof</option>
                 <option selected={data && data.idproof === 'passport'} value="passport">Passport</option>
                 <option selected={data && data.idproof === 'drivingLicense'} value="drivingLicense">Driving License</option>
                 <option selected={data && data.idproof === 'aadharCard'} value="aadharCard">Aadhar Card</option>
                 <option selected={data && data.idproof === 'nationalIdCard'} value="nationalIdCard">National ID Card</option>

                  </select>
                </div>
                <div className="col-6 my-2">
                  <label className="form-label" htmlFor="idNumber">
                    ID Number:
                  </label>
                  <input
                    type="text"
                    id="idnumber"
                    className="form-control"
                    value={ContactForm ? ContactForm.idnumber : ''}
                    onChange={handleInputChange}
                    name="idnumber"
                  />
                </div>
                <div className="col-6 my-2">
                  <label className="form-label" htmlFor="issueDate">
                    Issue Date:
                  </label>
                  <input
                    type="date"
                    id="issueDate"
                    className="form-control"
                    value={ContactForm ? ContactForm.issueDate : ''}
                    onChange={handleInputChange}
                    name="issueDate"
                  />
                </div>
                <div className="col-6 my-2">
                  <label className="form-label" htmlFor="idNumber">
                    Country:
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="form-control"
                    onChange={handleInputChange}
                   name='country'
                   value={ContactForm ? ContactForm.country : ''}
                  />
                </div>
                <div className="col-6 my-2">
                  <label className="form-label" htmlFor="issuingAuthority">
                    Issuing Authority:
                  </label>
                  <input
                    type="text"
                    id="IssuingAuthority"
                    name="IssuingAuthority"
                    className="form-control"
                    onChange={handleInputChange}
                    value={ContactForm ? ContactForm.IssuingAuthority : ''}
                  />
                </div>
              </div>
              <div className="text-center mt-2">
                <button className="btn btn-danger me-2" onClick={handleClose}>Cancel</button>
                {
                data.userid ? (
                  <button type="submit" value='update' className="btn btn-primary">Update</button>
                ) : (
                  <button type="submit" value='add' disabled={isFormDataEmpty}  className="btn btn-primary">Submit</button>
                )
              }
               
              </div>
            </form>
             
            </Box>
          </Modal>


        </div>
        <div className="expand">
          <div className="row" >
            <div className="col-md-4">
              <p>
                Email : <span> { userState ? userState.email : "" } </span>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                Mobile No : <span>{ userState ? userState.phone : "" }</span>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                Address :
                <span>
                  { data ? `${data.Street},${data.place},${data.taluk},${data.district}` : '' }
                </span>
              </p>
            </div>
          </div>
          <h6 className="">ID Proof</h6>
          <div className="row">
            <div className="col-md-3">
              {
                data ? (
                  <p className="mb-0">
                {data.idproof} <span> {data.idnumber}</span>
              </p>
                ) : '-'
              }
            </div>
            <div className="col-md-2">
              <p className="mb-0">
                Issue : <span> { data ? new Date(data.issueDate).toLocaleDateString() : '' }</span>
              </p>
            </div>
            
            <div className="col-md-2">
              <p className="mb-0">
                Country : <span> { data ? data.country : '' }</span>
              </p>
            </div>
            <div className="col-md-3">
              <p className="mb-0">
                Issuing Authority : <span> {data ? data.IssuingAuthority : ''}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* end contact information */}



      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Personal Details</h5>
          <p>
            <Button onClick={(e)=>{handlePersonalOpen();addEditValues(e,'PersonalDetails')}}>
            {personaldetails ? (
           <i className="fi fi-rr-file-edit ms-2"></i>
          ) : (
           <i className="fi fi-rr-layer-plus"></i>
           )}
            </Button>
            <Modal
              open={personal}  
              onClose={()=>{handlePersonalClose(); }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}  style={{
              overflowY:"scroll",
              height:"90vh"
            }}>
              
                <form onSubmit={HandleAddPersonalDetails}>
                <div className="row">
                  <div className="col-6 my-2">
                    <label className="labels mb-2 ">DOB</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date of birth"
                      name="dob"
                      onChange={handlePersonalDetails}
                      value={PersonalDetailsForm ? PersonalDetailsForm.dob : ''}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label className="labels mb-2">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Age"
                      name="age"
                      onChange={handlePersonalDetails}
                      value={PersonalDetailsForm ? PersonalDetailsForm.age : ''}
                    />
                  </div>
                  <div className="col-7 my-2">
                    <label className="labels mb-2">Gender:</label>
                    <div className="flex">
                      <button
                        type="button"
                        className={`btn btn-outline-primary ${
                          profileData.gender === "Male" && "active"
                        }`}
                        onClick={() => setPersonalformGender("Male")}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        className={`btn btn-outline-primary mx-3 ${
                          profileData.gender === "Female" && "active"
                        }`}
                        onClick={() => setPersonalformGender("Female")}
                      >
                        Female
                      </button>
                      <button
                        type="button"
                        className={`btn btn-outline-primary ${
                          profileData.gender === "Transgender" && "active"
                        }`}
                        onClick={() => setPersonalformGender("Transgender")}
                      >
                        Transgender
                      </button>
                    </div>
                  </div>
                  <div className="col-5 my-2">
                    <label className="mb-1" htmlFor="mb-2">
                      Marital status
                    </label>
                       <select
                         className="form-control mt-2"
                         id="countryDropdown"
                         name="material_status"
                         onChange={handlePersonalDetails}
                       >
                      <option  value="">Select Country</option>
                      <option selected={personaldetails && personaldetails.material_status ==='Single'} value='Single'>Single</option>
                      <option selected={personaldetails && personaldetails.material_status ==='Married'} value='Married'>Married</option>
                    </select>
                  </div>
                  <div className="col-6 my-2">
                    <label className="labels mb-2">Occupation</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Occupation"
                     name="occupation"
                     onChange={handlePersonalDetails}
                      value={PersonalDetailsForm ? PersonalDetailsForm.occupation : ''}
                    />
                  </div>
                  <h6 className="mt-2">Disability Details :</h6>
                  <div className="col-6 my-2">
                    <label htmlFor="">Disability</label>
                    <div className="d-flex my-2">
                      <div className="d-flex align-items-center">
                        <input type="radio" 
                        name="disability"
                         id="" value='true'
                          onChange={handlePersonalDetails}
                          checked={PersonalDetailsForm && PersonalDetailsForm === "true"}

                          />
                        <label htmlFor="" className="ms-1">
                          Yes
                        </label>
                      </div>
                      <div className="d-flex align-items-center ms-3">
                      <input type="radio" name="disability" id="" value='false'
                      onChange={handlePersonalDetails}
                      checked={PersonalDetailsForm && PersonalDetailsForm === "true"}

                      />
                        <label htmlFor="" className="ms-1">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 my-2">
                    <label className="labels mb-2">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      name="description"
                      onChange={handlePersonalDetails}
                      value={PersonalDetailsForm ? PersonalDetailsForm.description : ''}
                    />
                  </div>
                  <h6 htmlFor="">Relationship Details :</h6>
                  <div className="col-6 my-2">
                    <label htmlFor="" className="mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="relation_name"
                      className="form-control"
                      placeholder="Name"
                      id="relation_name"
                      onChange={handlePersonalDetails}
                      value={PersonalDetailsForm ? PersonalDetailsForm.relation_name : ''}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label htmlFor="" className="mb-1">
                      Dob
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date of birth"
                      name="relation_dob"
                      onChange={handlePersonalDetails}
                      value={PersonalDetailsForm ? PersonalDetailsForm.relation_dob : ''}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label htmlFor="" className="mb-1">
                      Relation
                    </label>
                    <input
                      type="text"
                      name="relation"
                      className="form-control"
                      placeholder="Relation"
                      id="relation"
                      onChange={handlePersonalDetails}
                      value={PersonalDetailsForm ? PersonalDetailsForm.relation : ''}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label htmlFor="" className="mb-1">
                      Age
                    </label>
                    <input
                      type="text"
                      name="relation_age"
                      className="form-control"
                      placeholder="Age"
                      id="relation_age"
                      onChange={handlePersonalDetails}
                      value={PersonalDetailsForm ? PersonalDetailsForm.relation_age : ''}
                    />
                  </div>
                  <div className="text-center mt-2">
                  <button className="btn btn-danger me-2" onClick={handleClose}>Cancel</button>
                {
                  personaldetails ? (
                  <button type="submit" value='update' className="btn btn-primary">Update</button>
                ) : (
                  <button type="submit" value='add'  className="btn btn-primary">Submit</button>
                )
              }

                  </div>
                </div>
                </form>
              </Box>
            </Modal>
          </p>
        </div>
        <div className="expand">
          <div className="row">
            <div className="col-md-2">
              <p>
                DOB : <span> { personaldetails ? personaldetails.dob : '' }</span>
              </p>
            </div>
            <div className="col-md-2">
              <p>
                Age : <span>  { personaldetails ? personaldetails.age : '' }</span>
              </p>
            </div>
            <div className="col-md-2">
              <p>
                Gender : <span>  { personaldetails ? personaldetails.gender : '' }</span>
              </p>
            </div>
            <div className="col-md-3">
              <p>
                Material Status : <span>  { personaldetails ? personaldetails.material_status : '' }</span>
              </p>
            </div>
            <div className="col-md-3">
              <p>
                Occupation : <span>  { personaldetails ? personaldetails.occupation : '' }</span>
              </p>
            </div>
          </div>
        </div>
        <h6 className="mt-3">Disability Details</h6>
        <div className="row">
          <div className="col-md-2">
            <p>
              Disability : <span>{ personaldetails ? personaldetails.occupation==true  ? 'Yes' : 'No': '' }</span>
            </p>
          </div>
          <div className="col-md-3">
            <p>
              Description : <span> { personaldetails ? personaldetails.description : '' }</span>
            </p>
          </div>
        </div>
        <h6 className="mt-3">Relationship Details</h6>
        <div className="row">
          <div className="col-md-3">
            <p className="mb-0">
              Name : <span>  { personaldetails ? personaldetails.relation_name : '' }</span>
            </p>
          </div>
          <div className="col-md-3">
            <p className="mb-0">
              Dob : <span>  { personaldetails ? personaldetails.relation_dob : '' }</span>
            </p>
          </div>
          <div className="col-md-3">
            <p className="mb-0">
              Relation : <span>  { personaldetails ? personaldetails.relation : '' }</span>
            </p>
          </div>
          <div className="col-md-3">
            <p className="mb-0">
              Age : <span>  { personaldetails ? personaldetails.relation_age : '' }</span>
            </p>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Education</h5>
          <p>
            <Button onClick={(e)=>{handleEducationOpen();educational_edutvalue(e,'EducationalDetails');}}>
            {EducationalDetails ? (
           <i className="fi fi-rr-file-edit ms-2"></i>
          ) : (
           <i className="fi fi-rr-layer-plus"></i>
           )}
            </Button>
            <Modal
              open={Education}
              onClose={handleEducationClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}
              style={{
              overflowY:"scroll",
              height:"90vh"
            }}
              >
                <form onSubmit={HandleAddEducationDetails}>
                <div className="row">
                  {educationDetails.map((education, index) => (
                    <div key={index}>
                      {education.highestQualification && (
                        <div>
                          <h5 className="labels mb-2">Education Details:</h5>
                          <div className="row pb-4">
                            <h2 className="labels px-3">College Details:</h2>
                            <div className="col-6 my-2">
                              <label className="form-label">
                                Select Course:
                              </label>
                              <select
                              className="form-control"  
                              onChange={handleEducationalDetails}
                              name="clg_course"
                              id="clg_course"
                              value={EducationalDetailsForm.clg_course} // Make sure to use the value attribute here
                              >
                              <option value="">Select Degree</option>
                              {allDegrees.map((degree, index) => (
                                <option selected={EducationalDetailsForm.clg_course == degree} key={index} value={degree}>
                                  {degree}
                                </option>
                              ))}
                           </select>

                            </div>
                            <div className="col-6 my-2">
                              <label className="form-label">
                                Select Specialization:
                              </label>
                              <select
                                className="form-control"
                                onChange={handleEducationalDetails}
                                name="clg_specialization"
                                id="clg_specialization"
                                value={EducationalDetailsForm.clg_specialization}
                              >
                                <option value="">Select Specialization</option>
                                {Specializations.map((course, index) => (
                                  <option
                                  selected={EducationalDetailsForm.clg_specialization == course}
                                   key={index} value={course}>
                                    {course}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-6 my-2">
                            <label className="form-label">Start Year:</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="start year"
                              name="start_year"
                              id="start_year"
                              value={EducationalDetailsForm.start_year}
                              onChange={handleEducationalDetails}
                            />
                            {/** Conditionally render the error message */}
                            {validStartYear && (
                              <p style={{ color: 'red', marginTop: '5px' }}>
                               {validStartYear}
                              </p>
                            )}
                         </div>
                           
                            <div className="col-6 my-2">
                              <label className="form-label">End Year:</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="end year"
                                name="end_year"
                                id="end_year" 
                                value={EducationalDetailsForm.end_year}
                                onChange={handleEducationalDetails}
                              />
                                      
                            {validEndYear && (
                              <p style={{ color: 'red', marginTop: '5px' }}>
                               {validEndYear}
                              </p>
                            )}

                            </div>
                            <div className="col-6 my-2">
                              <label className="form-label">
                                Select University:
                              </label>
                              <select
                                className="form-control"
                                onChange={handleEducationalDetails}
                                name="university"
                                id="university"
                                value={EducationalDetailsForm.university}
                              >
                                <option value="">Select University</option>
                                {allUniversities.map((university, index) => (
                                  <option
                                   selected={EducationalDetailsForm.university == university}
                                   key={index} value={university}>
                                    {university}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-6 my-2">
                              <label className="form-label">
                                Enter College Name:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="collage"
                                id="collage"
                                value={EducationalDetailsForm.collage}
                                onChange={handleEducationalDetails}
                              />
                            </div>
                            <div className="col-6 my-2">
                              <label className="form-label">
                                Enter Collage Percentage:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="scl_percentage"
                                id="scl_percentage"
                                value={EducationalDetailsForm.scl_percentage}
                                onChange={handleEducationalDetails}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <h5 className="labels">School Details:</h5>
                            <div className="col-6 my-2">
                              <label className="form-label">
                                Qualification:
                              </label>
                              <select className="form-select"
                              name="scl_qualification"
                              id="scl_qualification"
                              onChange={handleEducationalDetails}
                              value={EducationalDetailsForm.scl_qualification}
                              >
                                <option value="">
                                  Select School Qualification
                                </option>
                                {schoolQualificationList.map(
                                  (qualification, index) => (
                                    <option 
                                      selected={EducationalDetailsForm.scl_qualification == qualification}
                                    key={index} value={qualification}>
                                      {qualification}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                            <div className="col-6 my-2">
                              <label className="form-label"
                              
                              >
                                Specialization:
                              </label>
                              <select className="form-select"
                              name="scl_specialization"
                              id="scl_specialization"
                              onChange={handleEducationalDetails}
                              value={EducationalDetailsForm.scl_specialization}
                              >
                                <option value="">Select Specialization</option>
                                {academicDisciplines.map(
                                  (discipline, index) => (
                                    <option 
                                    selected={EducationalDetailsForm.scl_specialization == discipline}
                                    key={index} value={discipline}>
                                      {discipline}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                            <div className="col-6 my-2">
                              <label className="form-label">Start Year:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Start Year"
                                name="scl_start"
                                id="scl_start"
                                value={EducationalDetailsForm.scl_start}
                                onChange={handleEducationalDetails}
                              />
                              {validSclStart && (
                              <p style={{ color: 'red', marginTop: '5px' }}>
                               {validSclStart}
                              </p>
                            )}
                            </div>
                            <div className="col-6 my-2">
                              <label className="form-label">End Year:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter End Year"
                                name="scl_end"
                                id="scl_end"
                                value={EducationalDetailsForm.scl_end}
                                onChange={handleEducationalDetails}
                              />
                                {validSclEnd && (
                              <p style={{ color: 'red', marginTop: '5px' }}>
                               {validSclEnd}
                              </p>
                            )}
                            </div>
                            <div className="col-6 my-2">
                              <label className="form-label">
                                Enter School Name:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="scl_name"
                                id="scl_name"
                                value={EducationalDetailsForm.scl_name}
                                onChange={handleEducationalDetails}
                              />
                            </div>

                            <div className="col-6 my-2">
                              <label className="form-label">
                                Enter School Percentage:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="scl_percentage"
                                id="scl_percentage"
                                value={EducationalDetailsForm.scl_percentage}
                                onChange={handleEducationalDetails}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-center">
                  <button type="button" class="btn btn-danger me-2" onClick={()=>setEducation(false)}>
                    Cancel
                  </button>
                 
                  {
                    EducationalDetails ? (
                  <button type="submit" value='update' className="btn btn-primary">Update</button>
                ) : (
                  <button type="submit" value='add'  className="btn btn-primary">Submit</button>
                )
              }
                 
                </div>
                </form>
              </Box>
            </Modal>
          </p>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>
              School -
              <span>
                Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit
                amet.
              </span>
            </p>
            <p>
              B.com Accounts - <span> 98%</span>
            </p>
            <p>
              <span>2018 - 2021</span>
            </p>
          </div>
          <div className="col-md-6">
            <p>
              Collage -
              <span>
                Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit
                amet.
              </span>
            </p>
            <p>
              B.com Accounts - <span> 98%</span>
            </p>
            <p>
              <span>2018 - 2021</span>
            </p>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Job Details</h5>
          <p>
            <Button onClick={handleJobOpen}>
              <i class="fi fi-rr-file-edit ms-2"></i>
            </Button>
            <Modal
              open={Job}
              onClose={handleJobClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modaljob}>
                <div className="">
                  <Work></Work>
                  <div className="text-center mt-2">
                    <button
                      className="btn btn-danger me-2"
                      onClick={handleJobClose}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </Box>
            </Modal>
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p>
            Are you a working Professional or Fresher : <span>Experience</span>
          </p>
          <p>
            Resume : <span> Shetal resume.pdf</span>
          </p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <p>
              Designation : <span> WebDesigner</span>
            </p>
          </div>
          <div className="col-md-4">
            <p>
              Years : <span>1 years</span>
            </p>
          </div>
        </div>
        <p>
          Skills : <span> Html ,CSS ,Javascript , React , Figma .</span>
        </p>
        <p>
          Previous Company : <span> Sanjai rama IT park .</span>
        </p>
      </div>
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Home Appliance Details</h5>
          <p>
            <Button onClick={handleHomeOpen}>
              <i class="fi fi-rr-file-edit ms-2"></i>
            </Button>
            <Modal
              open={Home}
              onClose={handleHomeClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="row">
                  <div className="col-6 my-2 my-2">
                    <label htmlFor="applianceType" className="pb-2">
                      Select Appliance Type:
                    </label>
                    <select
                      // value={selectedAppliance}
                      // onChange={handleApplianceChange}
                      className="form-control"
                    >
                      <option value="">Select an Appliance</option>
                      {/* {homeAppliances.map((appliance, index) => (
                        <option key={index} value={appliance}>
                          {appliance}
                        </option>
                      ))} */}
                    </select>
                  </div>
                  <div className="col-6 my-2">
                    <label htmlFor="gadgetBrand" className="pb-2">
                      Brand:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="gadgetBrand"
                      // value={gadgetBrand}
                      // onChange={handleGadgetBrandChange}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label htmlFor="model" className="pb-2">
                      Model:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="model"
                      // value={model}
                      // onChange={handleModelChange}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label htmlFor="purchaseDate" className="pb-2">
                      Date of Purchase:
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      id="purchaseDate"
                      // value={purchaseDate}
                      // onChange={handlePurchaseDateChange}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label htmlFor="warrantyPeriod" className="pb-2">
                      Warranty Period:
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      id="warrantyPeriod"
                      // value={warrantyPeriod}
                      // onChange={handleWarrantyPeriodChange}
                    />
                  </div>
                  <div className="col-12 my-2">
                    <label htmlFor="agencyOrCompany" className="pb-2">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      type="text"
                      id="Description"
                      // value={agencyOrCompany}
                      // onChange={handleAgencyOrCompanyChange}
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <button
                    className="btn btn-danger me-2"
                    onClick={handleHomeClose}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary">Submit</button>
                </div>
              </Box>
            </Modal>
          </p>
        </div>
        <TableContainer component={Paper} sx={{ border: "none", boxShadow: 0 }}>
          <Table sx={{ border: "none" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
                <TableCell
                  sx={{
                    border: "none",
                    borderRadius: "8px 0px 0px 8px",
                    width: "15%",
                  }}
                >
                  Appliance Type
                </TableCell>
                <TableCell sx={{ border: "none", width: "15%" }} align="left">
                  Brand
                </TableCell>
                <TableCell sx={{ border: "none", width: "15%" }} align="left">
                  Warranty
                </TableCell>
                <TableCell sx={{ border: "none", width: "15%" }} align="left">
                  Purchase Date
                </TableCell>
                <TableCell
                  sx={{
                    border: "none",
                    borderRadius: "0px 8px 8px 0px",
                    width: "50%",
                  }}
                  align="left"
                >
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: "0" },
                    borderRadius: "10px",
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f4f4f4",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: "0", borderRadius: "8px 0px 0px 8px" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ border: "0" }} align="left">
                    {row.calories}
                  </TableCell>
                  <TableCell sx={{ border: "0" }} align="left">
                    {row.fat}
                  </TableCell>
                  <TableCell sx={{ border: "0" }} align="left">
                    {row.carbs}
                  </TableCell>
                  <TableCell
                    sx={{ border: "0", borderRadius: "0px 8px 8px 0px" }}
                    align="left"
                  >
                    {row.Description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Vehicle Details</h5>
          <p>
            <Button onClick={handleVehicleOpen}>
              <i class="fi fi-rr-file-edit ms-2"></i>
            </Button>
            <Modal
              open={Vehicle}
              onClose={handleVehicleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="row">
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="vehicleType">
                      Vehicle type:
                    </label>
                    <div>
                      <select
                        className="form-select"
                        id="vehicleType"
                        // value={selectedVehicle}
                        // onChange={handleVehicleChange}
                      >
                        <option value="">Select Vehicle</option>
                        {/* {vehicleTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))} */}
                      </select>
                    </div>
                  </div>
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="vehicleNumber">
                      Vehicle Number:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="vehicleNumber"
                      // value={vehicleNumber}
                      // onChange={handleVehicleNumberChange}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="brand">
                      Brand:
                    </label>
                  </div>
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="model">
                      Model:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="model"
                      // value={model}
                      // onChange={handleModelChange}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="purchaseDate">
                      Date of Purchase:
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      id="purchaseDate"
                      // value={purchaseDate}
                      // onChange={handlePurchaseDateChange}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="warrantyPeriod">
                      Warranty Period:
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      id="warrantyPeriod"
                      // value={warrantyPeriod}
                      // onChange={handleWarrantyPeriodChange}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label className="mb-1" htmlFor="model">
                      Agency:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="agency"
                      // value={model}
                      // onChange={handleModelChange}
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <button
                    className="btn btn-danger me-2"
                    onClick={handleJobClose}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary">Submit</button>
                </div>
              </Box>
            </Modal>
          </p>
        </div>
        <TableContainer component={Paper} sx={{ border: "none", boxShadow: 0 }}>
          <Table sx={{ border: "none" }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#f4f4f4" }}>
              <TableRow>
                <TableCell
                  sx={{
                    border: "none",
                    borderRadius: "8px 0px 0px 8px",
                    width: "15%",
                  }}
                >
                  Model
                </TableCell>
                <TableCell sx={{ border: "0", width: "15%" }}>Type</TableCell>
                <TableCell sx={{ border: "0", width: "15%" }}>
                  Vehicle NO
                </TableCell>
                <TableCell sx={{ border: "0", width: "15%" }}>
                  Dealer/Agency
                </TableCell>
                <TableCell
                  sx={{
                    border: "none",
                    borderRadius: "0px 8px 8px 0px",
                    width: "50%",
                  }}
                >
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehiclerows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: "0" },
                    borderRadius: "10px",
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f4f4f4",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: "0", borderRadius: "8px 0px 0px 8px" }}
                  >
                    {row.model}
                  </TableCell>
                  <TableCell sx={{ border: "0" }}>{row.type}</TableCell>
                  <TableCell sx={{ border: "0" }}>{row.vehicleNo}</TableCell>
                  <TableCell sx={{ border: "0" }}>{row.dealerAgency}</TableCell>
                  <TableCell
                    sx={{ border: "0", borderRadius: "0px 8px 8px 0px" }}
                  >
                    {row.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Gadget Details</h5>
          <p>
            <Button onClick={handleGadgetOpen}>
              <i class="fi fi-rr-file-edit ms-2"></i>
            </Button>
            <Modal
              open={Gadget}
              onClose={handleGadgetClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="row">
                  <div className="col-6 my-2">
                    <label htmlFor="gadgetType" className="pb-2">
                      Select Gadget Type:
                    </label>
                    <select
                      id="gadgetType"
                      className="form-select"
                      // value={gadgetType}
                      // onChange={handleGadgetTypeChange}
                    >
                      <option value="">Select Gadget Type</option>
                      {/* {gadgetTypes.map((type, index) => (
                <option key={index} value={type.toLowerCase().replace(/\s/g, '')}>
                  {type}
                </option>
              ))} */}
                    </select>
                  </div>
                  <div className="col-6 my-2">
                    <label htmlFor="gadgetBrand" className="pb-2">
                      Brand:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="gadgetBrand"
                      // value={gadgetBrand}
                      // onChange={handleGadgetBrandChange}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label htmlFor="model" className="pb-2">
                      Model:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="model"
                      // value={model}
                      // onChange={handleModelChange}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label htmlFor="warranty" className="pb-2">
                      Warranty:
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      id="warranty"
                      // value={warranty}
                      // onChange={handleWarrantyChange}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <label htmlFor="model" className="pb-2">
                      Description
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="Description"
                      // value={model}
                      // onChange={handleModelChange}
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <button
                    className="btn btn-danger me-2"
                    onClick={handleJobClose}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary">Submit</button>
                </div>
              </Box>
            </Modal>
          </p>
        </div>
        <TableContainer component={Paper} sx={{ border: "none", boxShadow: 0 }}>
          <Table sx={{ border: "none" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
                <TableCell
                  sx={{
                    border: "none",
                    borderRadius: "8px 0px 0px 8px",
                    width: "15%",
                  }}
                >
                  Gadget
                </TableCell>
                <TableCell sx={{ border: "none", width: "15%" }} align="left">
                  Brand
                </TableCell>
                <TableCell sx={{ border: "none", width: "15%" }} align="left">
                  Warranty
                </TableCell>
                <TableCell sx={{ border: "none", width: "15%" }} align="left">
                  Purchase Date
                </TableCell>
                <TableCell
                  sx={{
                    border: "none",
                    borderRadius: "0px 8px 8px 0px",
                    width: "50%",
                  }}
                  align="left"
                >
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gadgetrows.map((gadgetRow, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: "0" },
                    borderRadius: "10px",
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f4f4f4",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="gadgetrows"
                    sx={{ border: "0", borderRadius: "8px 0px 0px 8px" }}
                  >
                    {gadgetRow.gadget}
                  </TableCell>
                  <TableCell sx={{ border: "0" }} align="left">
                    {gadgetRow.brand}
                  </TableCell>
                  <TableCell sx={{ border: "0" }} align="left">
                    {gadgetRow.warranty}
                  </TableCell>
                  <TableCell sx={{ border: "0" }} align="left">
                    {gadgetRow.purchaseDate}
                  </TableCell>
                  <TableCell
                    sx={{ border: "0", borderRadius: "0px 8px 8px 0px" }}
                    align="left"
                  >
                    {gadgetRow.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="card mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Property Details</h5>
          <p>
            <Button onClick={handlePropertyOpen}>
              <i class="fi fi-rr-file-edit ms-2"></i>
            </Button>
            <Modal
              open={Property}
              onClose={handlePropertyClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="row">
                  <h6 className="labels mb-2">Property Details:</h6>

                  <div className="col-6 my-2Feduca">
                    <label className="pb-2">Property Types:</label>
                    <div>
                      <input
                        type="checkbox"
                        value="commercial"
                        checked={propertyTypes.includes("commercial")}
                        onChange={() => handlePropertyTypeChange("commercial")}
                      />
                      <label className="px-2">Commercial</label>

                      {propertyTypes.includes("commercial") && (
                        <select
                          className="form-control"
                          value={commercialType}
                          onChange={(e) => setCommercialType(e.target.value)}
                        >
                          <option value="">Select Commercial Type</option>
                          <option value="hotel">Hotel</option>
                          <option value="officeSpace">Office Space</option>
                          <option value="warehouse">Warehouse</option>
                          <option value="showroom">Showroom</option>
                        </select>
                      )}
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="house"
                        checked={propertyTypes.includes("house")}
                        onChange={() => handlePropertyTypeChange("house")}
                      />
                      <label className="px-2">Residential</label>
                      {propertyTypes.includes("house") && (
                        <div>
                          <select
                            className="form-control"
                            value={residentialType}
                            onChange={handleResidentialTypeChange}
                          >
                            <option value="">Select Residential Type</option>
                            <option value="villa">Villa</option>
                            <option value="independentHouse">
                              Independent House
                            </option>
                            <option value="residentialPlot">
                              Residential Plot
                            </option>
                            <option value="farmHouse">Farm House</option>
                            <option value="bungalow">Bungalow</option>
                            <option value="payingGuest">Paying Guest</option>
                            <option value="rowhouse">Rowhouse</option>
                          </select>
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="agricultural"
                        checked={propertyTypes.includes("agricultural")}
                        onChange={() =>
                          handlePropertyTypeChange("agricultural")
                        }
                      />
                      <label className="px-2">Agricultural</label>
                      {propertyTypes.includes("agricultural") && (
                        <select
                          className="form-control"
                          value={agriculturalType}
                          onChange={handleAgriculturalTypeChange}
                        >
                          <option value="">Select Agricultural Type</option>
                          <option value="farmLand">Farm Land</option>
                          <option value="plantation">Plantation</option>
                          <option value="orchard">Orchard</option>
                          <option value="agriculturalLand">
                            Agricultural Land
                          </option>
                        </select>
                      )}
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="industrial"
                        checked={propertyTypes.includes("industrial")}
                        onChange={() => handlePropertyTypeChange("industrial")}
                      />
                      <label className="px-2">Industrial</label>
                      {propertyTypes.includes("industrial") && (
                        <select
                          className="form-control"
                          value={industrialType}
                          onChange={handleIndustrialTypeChange}
                        >
                          <option value="">Select Industrial Type</option>
                          <option value="factory">Factory</option>
                          <option value="warehouse">Warehouse</option>
                          <option value="industrialLand">
                            Industrial Land
                          </option>
                          <option value="manufacturingPlant">
                            Manufacturing Plant
                          </option>
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="col-6 my-2Feduca">
                    <label className="mb-1">BHK Type:</label>
                    <select
                      value={bhkType}
                      onChange={(e) => handleBhkTypeChange(e.target.value)}
                      className="form-control"
                    >
                      <option value="">BHK</option>
                      <option value="1bhk">1 BHK</option>
                      <option value="2bhk">2 BHK</option>
                      <option value="3bhk">3 BHK</option>
                      <option value="4bhk">4 BHK</option>
                      <option value="4+bhk">4+ BHK</option>
                    </select>
                  </div>
                  <div className="col-6 my-2Feduca">
                    <label className="mb-1">Property Description</label>
                    <textarea
                      className="form-control"
                      type="text"
                      value={propertyDescription}
                      onChange={(e) => handlePropertyDescriptionChange(e)}
                    />
                  </div>
                  <div className="col-6 my-2Feduca">
                    <label className="mb-1">Property Location:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={propertyLocation}
                      onChange={(e) => setPropertyLocation(e.target.value)}
                    />
                  </div>
                  <div className="col-6 my-2Feduca">
                    <label className="mb-1">property status</label>
                    <select
                      className="form-control"
                      value={propertyStatus}
                      onChange={(e) => setPropertyStatus(e.target.value)}
                    >
                      <option value="">select status</option>
                      <option value="rent">Rent</option>
                      <option value="sale">Sale</option>
                    </select>
                  </div>
                  <div className="col-6 my-2Feduca">
                    <label className="mb-1">Land Squarefit</label>
                    <input
                      className="form-control"
                      type="text"
                      value={landSquarefit}
                      onChange={(e) => setLandSquarefit(e.target.value)}
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <button type="button" class="btn btn-danger me-2">
                    Cancel
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save
                  </button>
                </div>
              </Box>
            </Modal>
          </p>
        </div>
        <TableContainer component={Paper} sx={{ border: "none", boxShadow: 0 }}>
          <Table sx={{ border: "none" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
                <TableCell
                  sx={{
                    border: "none",
                    borderRadius: "8px 0px 0px 8px",
                    width: "15%",
                  }}
                >
                  Type
                </TableCell>
                <TableCell sx={{ border: "none", width: "15%" }} align="left">
                  Availability
                </TableCell>
                <TableCell sx={{ border: "none", width: "15%" }} align="left">
                  House Types
                </TableCell>
                <TableCell sx={{ border: "none", width: "15%" }} align="left">
                  Land Sq.ft
                </TableCell>
                <TableCell sx={{ border: "none", width: "15%" }} align="left">
                  Location
                </TableCell>
                <TableCell
                  sx={{
                    border: "none",
                    borderRadius: "0px 8px 8px 0px",
                    width: "50%",
                  }}
                  align="left"
                >
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {propertys.map((row, index) => (
                <TableRow
                  key={row.type}
                  sx={{
                    "&:last-child td, &:last-child th": { border: "0" },
                    borderRadius: "10px",
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f4f4f4",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: "0", borderRadius: "8px 0px 0px 8px" }}
                  >
                    {row.type}
                  </TableCell>
                  <TableCell sx={{ border: "0" }} align="left">
                    {row.availability}
                  </TableCell>
                  <TableCell sx={{ border: "0" }} align="left">
                    {row.property}
                  </TableCell>
                  <TableCell sx={{ border: "0" }} align="left">
                    {row.location}
                  </TableCell>
                  <TableCell sx={{ border: "0" }} align="left">
                    {row.description}
                  </TableCell>
                  <TableCell
                    sx={{ border: "0", borderRadius: "0px 8px 8px 0px" }}
                    align="left"
                  >
                    {row.land}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
   </>
  );
}

export default Job;
