import React, { useState } from "react";
import { useEffect } from "react";
import {
    UpdateDetails,
    AddDetails,
    FetchDetails,
} from "../../routes/profileRoutes";
import Jobusestates from "../../useStates/JobUsestate";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { allDegrees,Specializations,allUniversities,schoolQualificationList,academicDisciplines } from "../../Data/JobJson";
import { style } from '../../Styles/Jobformstyle'
import CollageForm from "../AddEducationDetails/CollageForm";
import SchoolForm from "../AddEducationDetails/SchoolForm";
import axios from "axios";
import { Nodeapi } from "../../config/serverUrl";
import '../../Styles/HtmlTable.css'
import { format } from 'date-fns';

const EducationForm = () => {
  const authdata = useSelector((state) => state.auth.user?.user.user);
  console.log('authdata',authdata);
  const [Education, setEducation] = React.useState(false);
  const handleEducationOpen = () => setEducation(true);
  const handleEducationClose = () => setEducation(false);
  const [schooldetails,setSchooldetails] = React.useState([]);
  const [collagedetails,setCollagedetails] = React.useState([]);

  const {
    EducationalDetails,
    setEducationalDetails,
    EducationalDetailsForm,
    setEducationalDetailsForm,
  } = Jobusestates();

  
  

  const toast = useRef(null);

  const handleEducationalDetails = (e) => {
    const { name, value } = e.target;
    setEducationalDetailsForm({
      ...EducationalDetailsForm,
      [name]: value,
      userid: authdata?.id,
    });

    const isValidYear = /^\d{4}$/.test(value);

  
  };


 




  const [tableData, setTableData] = useState([
    // Initial table data
    {
      id: 1,
      scl_qualification: "",
      scl_specialization: "",
      scl_start: "",
      scl_end: "",
      scl_name: "",
      scl_percentage: "",
    },
  ]);



  const handleAddInputField = () => {
    // Add a new row with empty input fields
    setTableData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, scl_qualification: "",
      scl_specialization: "",
      scl_start: "",
      scl_end: "",
      scl_name: "",
      scl_percentage: "", },
    ]);
  };

  const handleRemoveRow = (index) => {
    // Remove the row at the specified index
    setTableData((prevData) => prevData.filter((row, i) => i !== index));
  };

  const handleInputChange = (index, fieldName, value) => {
    // Update the value of the input field in the specified row
    setTableData((prevData) =>
      prevData.map((row, i) =>
        i === index ? { ...row, [fieldName]: value } : row
      )
    );
    setTableData((prevData) =>
      prevData.map((row, i) =>
        i === index ? { ...row, [fieldName]: value } : row
      )
    );
  };




  



 

  useEffect(() => {
    const fetchInformation = async () => {
        const fetchSchoolDetails = await axios.post(`${Nodeapi}/fetch_Clg_Scl_details`,{ id:authdata?.id });
        setSchooldetails(fetchSchoolDetails.data.data.schooldata);
        setCollagedetails(fetchSchoolDetails.data.data.collagedata);

     
    };

    fetchInformation();
  }, []);


  const HandleAddEducationDetails = async (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value; 

    if(action.trim() == 'update'){
      const details = {
        "schoolDetails" : tableData,
        "collageDetails" : clgtableData,
        "authid":authdata?.id,
      }
      const headers = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
      };
      const updateEducationaldetailsdata = await axios.post(`${Nodeapi}/UpdateclgSclDeatils`,details,{headers});
      console.log('update query',updateEducationaldetailsdata.data.data.schooldata);
      setSchooldetails(updateEducationaldetailsdata.data.data.schooldata);
      setCollagedetails(updateEducationaldetailsdata.data.data.collagedata);
      setEducation(false);
      if(updateEducationaldetailsdata){
          
      
        // setCollagedetails([updateEducationaldetailsdata.data.data.schooldata]);
          toast.current.show({severity:'success', summary: 'Success', detail:updateEducationaldetailsdata.data.data.message, life: 3000});
      }else{
        toast.current.show({severity:'error', summary: 'Error', detail:updateEducationaldetailsdata.data.data.message, life: 3000});
    }
    }else{
      const details = {
        "schoolDetails" : tableData,
        "collageDetails" : clgtableData,
        "authid":authdata?.id,
      }
      const headers = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
      };
      const addEducationaldetailsdata = await axios.post(`${Nodeapi}/addsclClg`,details,{headers});
      console.log(addEducationaldetailsdata.data.data);
      if(addEducationaldetailsdata){
        setEducation(false);
        setEducationalDetails(addEducationaldetailsdata.data.data.response);
        toast.current.show({severity:'success', summary: 'Success', detail:addEducationaldetailsdata.data.data.message, life: 3000});
      }else{
        toast.current.show({severity:'error', summary: 'Error', detail:addEducationaldetailsdata, life: 3000});
    }
    }
    
  }

  const [educationDetails, setEducationDetails] = useState([
    {
      highestQualification: true,
      course: "",
      specialization: "",
      year: "",
      university: "",
    },
  ]);


  const [clgtableData, setclgTableData] = useState([
    // Initial table data
    {
      id: 1,
      clg_course: "",
      clg_specialization: "",
      start_year: "",
      end_year: "",
      university: "",
      collage: "",
      clg_percentage: "",
    },
  ]);

  const handleAddclgInputField = () => {
    // Add a new row with empty input fields
    setclgTableData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        clg_course: "",
        clg_specialization: "",
        start_year: "",
        end_year: "",
        university: "",
        collage: "",
        clg_percentage: "",
      },
    ]);
  };
  const handleRemoveclgRow = (index) => {
    // Remove the row at the specified index
    setclgTableData((prevData) => prevData.filter((row, i) => i !== index));
  };


  const clghandleInputChange = (index, fieldName, value) => {
    // Update the value of the input field in the specified row
    setclgTableData((prevData) =>
      prevData.map((row, i) =>
        i === index ? { ...row, [fieldName]: value } : row
      )
    );
  
  };

  const educational_edutvalue = async (e,table) => {
    e.preventDefault();
    const fetchSchoolDetails = await axios.post(`${Nodeapi}/fetch_Clg_Scl_details`,{ id:authdata?.id });
    setTableData(fetchSchoolDetails.data.data.schooldata);
    setclgTableData(fetchSchoolDetails.data.data.collagedata);

  }

  console.log('insert after the data',schooldetails);
  return (
    <div>
      <Toast ref={toast} />
      <div className="card mt-4" style={{border:'3px solid #1877f2'}} >
        <div className="d-flex justify-content-between align-items-center">
          <h5>Education Details</h5>
          <p>
            <Button
              onClick={(e) => {
                handleEducationOpen();
                educational_edutvalue(e, "EducationalDetails");
              }}
            >
              {schooldetails || collagedetails ? (
                <i className="fi fi-rr-file-edit ms-2"></i>
              ) : (
                <i className="fi fi-rr-layer-plus"></i>
              )}
            </Button>
            <Modal
              open={Education}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={style}
                style={{
                  overflowY: "scroll",
                  height: "90vh",
                  width:"95%"
                }}
              >
                 <form onSubmit={HandleAddEducationDetails}>
                 <div> 
                  <h2>School Details</h2>
                  <SchoolForm 
                  setSchooldetails={setSchooldetails}
                  handleAddInputField={handleAddInputField}
                  handleRemoveRow={handleRemoveRow}
                  handleInputChange={handleInputChange}
                  tableData={tableData}
                  />
                  </div>

                  <div style={{
                    marginTop:"30px"
                  }}> 
                  <h2>Collage Details</h2>
                  <CollageForm
                  setCollagedetails={setCollagedetails}
                  clgtableData={clgtableData}
                  handleAddclgInputField={handleAddclgInputField}
                  handleRemoveclgRow={handleRemoveclgRow}
                  clghandleInputChange={clghandleInputChange}
                   />
                  </div>
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      class="btn btn-danger me-2"
                      onClick={() => setEducation(false)}
                    >
                      Cancel
                    </button>

                    {schooldetails || collagedetails ? (
                      <button
                        type="submit"
                        value="update"
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        type="submit"
                        value="add"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                 </form>
                
                  
               
              </Box>
            </Modal>
          </p>
        </div>
        <div className="row">
        {
          schooldetails && (
            <table className="GeneratedTable">
      <thead style={{
        color:"white"
      }}>
        <tr>
          <th>Id</th>
          <th>School Qualification</th>
          <th>School specialization</th>
          <th>School Start Year</th>
          <th>School End Year</th>
          <th>School Percentage</th>
          <th>School Name</th>
          <th 
          style={{
            width:"10%"
          }}
          >Created At</th>
        </tr>
      </thead>
      <tbody>
        {
          schooldetails.map((data)=>(
            <tr>
              <td>{data.id}</td>
              <td>{data.scl_qualification}</td>
              <td>{data.scl_specialization}</td>
              <td>{data.scl_start}</td>
              <td>{data.scl_end}</td>
              <td>{data.scl_percentage}</td>
              <td>{data.scl_name}</td>
              <td>{format(data.created_at, 'yyyy-MM-dd')}</td>
              
            </tr>
          ))
        }
      </tbody>
    </table>
          )
        }
      
        </div>


        <div className="row" style={{
          marginTop:"20px"
        }}>
        {
          collagedetails && (
            <table className="GeneratedTable">
      <thead style={{
        color:"white"
      }}>
        <tr>
          <th>Id</th>
          <th>Collage Course</th>
          <th>Collage specialization</th>
          <th>Collage Start Year</th>
          <th>Collage End Year</th>
          <th>Collage Percentage</th>
          <th>Collage Name</th>
          <th>University</th>
          <th 
          style={{
            width:"10%"
          }}
          >Created At</th>
        </tr>
      </thead>
      <tbody>
        {
          collagedetails.map((data)=>(
            <tr>
              <td>{data.id}</td>
              <td>{data.clg_course}</td>
              <td>{data.clg_specialization}</td>
              <td>{data.start_year}</td>
              <td>{data.end_year}</td>
              <td>{data.clg_percentage}</td>
              <td>{data.collage}</td>
              <td>{data.university}</td>
              <td>{format(data.created_at, 'yyyy-MM-dd')}</td>
              
            </tr>
          ))
        }
      </tbody>
    </table>
          )
        }
      
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
