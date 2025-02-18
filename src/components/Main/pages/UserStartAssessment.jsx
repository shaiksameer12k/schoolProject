import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../reusable/Button/ButtonComponent";
import InputField from "../../../reusable/InputField/InputField";
import { studentStartAssessmentDetails } from "../../../data/formData";
import { Col, Row, Grid, message } from "antd";
import WebcamComponent from "../../WebCam/WebCam";
import { useNavigate, useParams } from "react-router-dom";
import {
  centrliseFieldsValidation,
  centrliseFileFieldsValidation,
  submitFunctionRegexValidationCheck,
} from "../../../utils/feildValidation";
import moment from "moment";
import { useApiCalls } from "../../../api/apiCalls";
const UserStartAssessment = () => {
  let screen = Grid.useBreakpoint();
  let navigate = useNavigate();
  let { ApiCalls, loadingStates } = useApiCalls();
  let loginUserData = JSON.parse(localStorage.getItem("loginUserData"));
  console.log("loginUserData", loginUserData);
  let { subjectId } = useParams();
  console.log("subjectId",subjectId)
  const [fields, setFields] = useState([]);
  const [captureImgData, setCaptureImgData] = useState("");

  const onchange = (e) => {
    let { name, value } = e.target;

    let updatedArr = fields.map((field) =>
      field.name === name ? { ...field, value: value } : field
    );
    setFields(updatedArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captureImgData) {
      return message.error("Please Capture Your Image");
    }

    // checking all the mandatory fields and regex validations
    let checkFieldsState = fields.map((field) => {
      return field.isMandatory || field.regexType
        ? {
            ...field,
            isError: submitFunctionRegexValidationCheck(
              field.type,
              field.name,
              field.value,
              field.label,
              field.regexType,
              field.isMandatory
            ),
          }
        : field;
    });

    let checkFieldsValues = checkFieldsState.every((field) =>
      field.isMandatory ? field.isError.length == 0 : true
    );

    let paramsData = checkFieldsState.reduce((acc, curr) => {
      acc[curr.name] = curr.type == "file" ? curr.base64 : curr.value;
      return acc;
    }, {});

    setFields(checkFieldsState);

    if (checkFieldsValues) {
      // Here you can perform the login logic (API call, etc.)
      try {
        let params = JSON.stringify([
          {
            FatherName: paramsData?.fatherName,
            MotherName: paramsData?.motherName,
            startdate: paramsData?.dob,
            StudentPhoto: captureImgData,
            Reg_Number: loginUserData[0]?.Register_Number,
            Studentid: loginUserData[0]?.Id,
            SubjectId: subjectId,
          },
        ]);
        let result = await ApiCalls(
          "handleSubmit",
          "post",
          "Student/PostStudentSubjectWithimage",
          params
        );
        console.log("handleSubmit", result);

        if (result[0]?.Status > 0) {
          navigate(
            `/StudentLayout/studentDashboard/${subjectId}/${loginUserData[0]?.Id}`
          );
        }

        loadingStates.handleSubmit = false;
      } catch (error) {
        console.log(`Error Student/PostStudentSubjectWithimage : ${error}`);
      } finally {
        loadingStates.handleSubmit = false;
      }
    } else {
      return message.error("Please Fill Mandatory Fields");
    }
  };

  const getCaptureImgData = (captureImgData) => {
    setCaptureImgData(captureImgData);
    return;
  };

  useEffect(() => {
    let updatedArr = studentStartAssessmentDetails.map((field) =>
      field?.name == "fullName"
        ? { ...field, value: loginUserData[0]?.FullName }
        : field?.name == "fatherName"
        ? {
            ...field,
            value: loginUserData[0]?.FatherName,
          }
        : field?.name == "motherName"
        ? {
            ...field,
            value: loginUserData[0]?.MotherName,
          }
        : field?.name == "dob"
        ? {
            ...field,
            value: moment(loginUserData[0]?.DateOfBirth).format("YYYY-MMM-DD"),
          }
        : field
    );

    console.log("studentStartAssessmentDetails", studentStartAssessmentDetails);
    setFields(updatedArr);
  }, []);

  return (
    <div className="h-full ">
      <Row gutter={[8, 8]} className="h-full">
        {screen?.xs ? (
          <>
            <Col xs={24} sm={24} md={12} lg={14}>
              <WebcamComponent
                screen={screen}
                getCaptureImgHandel={getCaptureImgData}
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={10}
              className="p-3 flex"
              style={
                screen?.xs ? { alignItems: "start" } : { alignItems: "center" }
              }
            >
              <Row gutter={[8, 8]} align="top" style={{ margin: "5px 0px" }}>
                {studentStartAssessmentDetails.map(
                  (field) =>
                    field.isFieldVisible && (
                      <Col xs={24} sm={6} md={6} lg={24} key={field?.name}>
                        {" "}
                        {/* Adjust the span value to control width */}
                        <InputField
                          mode={field.mode}
                          // label={field?.label}
                          placeholder={field?.placeholder}
                          layout={"vertical"}
                          type={field?.type}
                          name={field?.name}
                          options={field?.options}
                          value={field?.value}
                          isError={field?.isError}
                          isFieldVisible={field?.isFieldVisible}
                          size="large"
                          onChange={onchange}
                        />
                      </Col>
                    )
                )}

                <Col xs={24} sm={6} md={6} lg={24} className="text-center">
                <ButtonComponent
                    name="Start Assessment"
                    size="medium"
                    btnStyle={{ width: "50%", margin: 0 }}
                    onClick={(e) => handleSubmit(e)}
                    loading={loadingStates?.handleSubmit}
                  />
                </Col>
              </Row>
            </Col>
          </>
        ) : (
          <>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={10}
              style={{ height: "100%" }}
              className="p-3 flex items-center "
            >
              <Row gutter={[8, 8]} align="top" style={{ margin: "5px 0px" }}>
                {fields.map(
                  (field) =>
                    field.isFieldVisible && (
                      <Col xs={8} sm={6} md={6} lg={24} key={field?.name}>
                        {" "}
                        {/* Adjust the span value to control width */}
                        <InputField
                          mode={field.mode}
                          // label={field?.label}
                          placeholder={field?.placeholder}
                          layout={"vertical"}
                          type={field?.type}
                          name={field?.name}
                          options={field?.options}
                          value={field?.value}
                          isError={field?.isError}
                          isFieldVisible={field?.isFieldVisible}
                          isDisabled={field?.isDisabled}
                          onChange={onchange}
                        />
                      </Col>
                    )
                )}

                <Col xs={24} sm={6} md={6} lg={24} className="text-center">
                  <ButtonComponent
                    name="Start Assessment"
                    size="medium"
                    btnStyle={{ width: "50%", margin: 0 }}
                    onClick={(e) => handleSubmit(e)}
                    loading={loadingStates?.handleSubmit}
                  />
                </Col>
              </Row>
            </Col>

            <Col xs={24} sm={24} md={12} lg={14} style={{ height: "100%" }}>
              <WebcamComponent
                screen={screen}
                getCaptureImgHandel={getCaptureImgData}
              />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default UserStartAssessment;
