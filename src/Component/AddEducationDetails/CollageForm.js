import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

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
import {
  allDegrees,
  Specializations,
  allUniversities,
  schoolQualificationList,
  academicDisciplines,
} from "../../Data/JobJson";
import { style } from "../../Styles/Jobformstyle";

function CollageForm({
  setCollagedetails,
  handleAddclgInputField,
  handleRemoveclgRow,
  clgtableData,
  clghandleInputChange
}) {
 



  
  console.log('clgtableData loop details',clgtableData);
  

  

  const authdata = useSelector((state) => state.auth.user?.user.user);

  const [Education, setEducation] = React.useState(false);
  const handleEducationOpen = () => setEducation(true);
  const handleEducationClose = () => setEducation(false);

  const {
    EducationalDetails,
    setEducationalDetails,
    EducationalDetailsForm,
    setEducationalDetailsForm,
  } = Jobusestates();

  const [validStartYear, setValidStartYear] = useState("");
  const [validEndYear, setValidEndYear] = useState("");
  const [validSclStart, setValidSclStart] = useState("");
  const [validSclEnd, setValidSclEnd] = useState("");

  const toast = useRef(null);

  const handleEducationalDetails = (e) => {
    const { name, value } = e.target;
    setEducationalDetailsForm({
      ...EducationalDetailsForm,
      [name]: value,
      userid: authdata?.id,
    });

    const isValidYear = /^\d{4}$/.test(value);

    if (name.trim() === "start_year") {
      isValidYear
        ? setValidStartYear("")
        : setValidStartYear("Please enter a valid four-digit year.");
    } else if (name.trim() === "end_year") {
      isValidYear
        ? setValidEndYear("")
        : setValidEndYear("Please enter a valid four-digit year.");
    } else if (name.trim() === "scl_start") {
      isValidYear
        ? setValidSclStart("")
        : setValidSclStart("Please enter a valid four-digit year.");
    } else if (name.trim() === "scl_end") {
      isValidYear
        ? setValidSclEnd("")
        : setValidSclEnd("Please enter a valid four-digit year.");
    }
  };

  const educational_edutvalue = async (e, table) => {
    e.preventDefault();
    const fetchDetails = await FetchDetails(authdata?.id, table);

    if (fetchDetails) {
      setEducationalDetailsForm(fetchDetails);
    } else {
      setEducationalDetailsForm(null);
    }
  };

  useEffect(() => {
    const fetchEducationalInformation = async () => {
      const fetchEducationalDetails = await FetchDetails(
        authdata?.id,
        "EducationalDetails"
      );
      setEducationalDetails(fetchEducationalDetails);
    };

    fetchEducationalInformation();
  }, []);

  const HandleAddEducationDetails = async (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value;

    if (action.trim() == "update") {
      const educationalUpdatedetails = {
        insertdata: EducationalDetailsForm,
        table: "EducationalDetails",
        insertMessage: "Educational Details Updated Successfully",
      };
      const EducationalDetails = await UpdateDetails(educationalUpdatedetails);
      if (EducationalDetails) {
        setEducation(false);
        setEducationalDetails(EducationalDetails.data.data.response[0]);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: EducationalDetails.data.data.message,
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: EducationalDetails.data.data.message,
          life: 3000,
        });
      }
    } else {
      const educationaldetails = {
        insertdata: EducationalDetailsForm,
        table: "EducationalDetails",
        insertMessage: "Educational Details Inserted Successfully",
      };
      const addEducationaldetailsdata = await AddDetails(educationaldetails);

      if (addEducationaldetailsdata) {
        setEducation(false);
        setEducationalDetails(addEducationaldetailsdata.data.data.response);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: addEducationaldetailsdata.data.data.message,
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: addEducationaldetailsdata,
          life: 3000,
        });
      }
    }
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

  return (
    <div style={{
      marginTop:"20px"
    }}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Select Course</th>
            <th>Select Specialization</th>
            <th>Start Year</th>
            <th>End Year</th>
            <th style={{
                width:"16%"
            }}>Select University</th>
            <th>Enter College Name</th>
            <th>College Section</th>
            <th>Enter Collage Percentage</th>
            <th>
              <AddCircleIcon
                onClick={handleAddclgInputField
}
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
              />
            </th>{" "}
            {/* Add Action column */}
          </tr>
        </thead>
        <tbody>
          {clgtableData && clgtableData.map((row, index) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <select
                  className="form-control"
                  value={clgtableData[index].clg_course}
                  name="clg_course"
                  id="clg_course"
                  onChange={(e) =>
                    clghandleInputChange(index, "clg_course", e.target.value)
                  }
                >
                  <option value="">Select Degree</option>
                  {allDegrees.map((degree, index) => (
                    <option
                     
                      key={index}
                      value={degree}
                    >
                      {degree}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  className="form-control"
                  onChange={(e) =>
                    clghandleInputChange(index, "clg_specialization", e.target.value)
                  }
                  value={clgtableData[index]?.clg_specialization}
                  name="clg_specialization"
                  id="clg_specialization"
                >
                  <option value="">Select Specialization</option>
                  {Specializations.map((course, index) => (
                    <option
                      
                      key={index}
                      value={course}
                    >
                      {course}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  placeholder="start year"
                  name="start_year"
                  id="start_year"
                  value={clgtableData[index]?.start_year}
                  onChange={(e) =>
                    clghandleInputChange(index, "start_year", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  className="form-control"
                  placeholder="end year"
                  name="end_year"
                  id="end_year"
                  value={clgtableData[index]?.end_year}
                  onChange={(e) =>
                    clghandleInputChange(index, "end_year", e.target.value)
                  }
                />
              </td>

              <td>
                <select
                  className="form-control"
                  onChange={(e) =>
                    clghandleInputChange(index, "university", e.target.value)
                  }
                  name="university"
                  id="university"
                  value={clgtableData[index]?.university}
                >
                  <option value="">Select University</option>
                  {allUniversities.map((university, index) => (
                    <option
                     
                      key={index}
                      value={university}
                    >
                      {university}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <input
                  type="text"
                  className="form-control"
                  name="collage"
                  id="collage"
                  value={clgtableData[index]?.collage}
                  onChange={(e) =>
                    clghandleInputChange(index, "collage", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="clg_section"
                  id="clg_section"
                  value={clgtableData[index]?.clg_section}
                  onChange={(e) =>
                    clghandleInputChange(index, "clg_section", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="clg_percentage"
                  id="clg_percentage"
                  value={clgtableData[index]?.clg_percentage}
                  onChange={(e) =>
                    clghandleInputChange(index, "clg_percentage", e.target.value)
                  }
                />
              </td>
              <td>
                <CancelIcon
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => handleRemoveclgRow(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CollageForm;
