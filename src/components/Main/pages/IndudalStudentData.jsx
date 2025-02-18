import React, { useEffect } from "react";
import { Card, Button, Row, Col, Typography } from "antd";
import { CameraOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import Title from "antd/es/skeleton/Title";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useApiCalls } from "../../../api/apiCalls";

// OMR Answer Sheet Component
const OMRAnswerSheet = ({ questionsWithOptions, subjectId, studentId }) => {
  console.log("questionsWithOptions", questionsWithOptions);
  let { ApiCalls, loadingStates } = useApiCalls();
  const [studentSubData, setStudentSubData] = useState([]);
  let navigate = useNavigate()

  const onChangeHandel = (e, questionId, optionId) => {
    let { name, value, checked } = e.target;
    console.log("onChangeHandel", e, name, value, checked);
    let obj = {
      Qid: questionId,
      OptionId: optionId,
      SubjectId: subjectId,
      StudentId: studentId,
    };

    let updateArr = studentSubData.some((item) => item.Qid === questionId)
      ? studentSubData.map((item) =>
          item.Qid === questionId ? { ...item, OptionId: optionId } : item
        )
      : [...studentSubData, obj];

    setStudentSubData(updateArr);
  };

  const submitAssessment = async () => {
    loadingStates.submitAssessment = false;
    try {
      let params = JSON.stringify(studentSubData);
      let result = await ApiCalls(
        "submitAssessment",
        "post",
        "Student/AnswerSubmit",
        params
      );
      console.log("submitAssessment", result);

      if(result){
        navigate("/StudentLayout")
      }

      loadingStates.submitAssessment = false;
    } catch (error) {
      console.log(`Error Student/AnswerSubmit : ${error}`);
    } finally {
      loadingStates.submitAssessment = false;
    }
  };

  console.log("studentSubData", studentSubData);

  return (
    <div>
      <div className="bg-white my-2 p-1 rounded-md">
        <Typography.Title level={3} style={{ margin: 0 }}>
          OMR Answer Sheet
        </Typography.Title>
      </div>
      <div className="custom-scrollbar-container py-2 max-h-96  overflow-y-auto bg-white rounded-lg  ">
        <div className="flex flex-col space-y-5">
          {questionsWithOptions.map((item, index) => (
            <div key={item?.Qid} className="flex flex-col">
              <p className="font-semibold">{`Q${index + 1}: ${
                item.Question
              }`}</p>
              <div className="flex space-x-4">
                {item.Options.map((option, optionIndex) => (
                  <div key={option?.OptionId} className="flex items-center">
                    <input
                      type="radio"
                      id={`question${option?.QId}-option${option?.OptionId}`}
                      name={`question${option?.QId}`}
                      value={option?.value}
                      className="mr-2"
                      onChange={(e) =>
                        onChangeHandel(e, item?.Qid, option?.OptionId)
                      }
                    />
                    <label
                      htmlFor={`question${option?.QId}-option${option?.OptionId}`}
                      className="text-lg xs:text-sm my-1"
                    >
                      {option?.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className=" my-2 flex justify-end space-x-4">
        <Button
          type="primary"
          size="large"
          onClick={submitAssessment}
          loading={loadingStates.submitAssessment}
        >
          Submit Answers
        </Button>
      </div>
    </div>
  );
};

const IndudalStudentData = () => {
  let { ApiCalls, loadingStates } = useApiCalls();
  let loginStudentData = JSON.parse(localStorage.getItem("loginUserData"));
  let { subjectId, studentId } = useParams();

  const [studentInfo, setStudentInfo] = useState({});
  const [questionsWithOptions, setQuestionsWithOptions] = useState([]);

  const fetchQuestions = async () => {
    loadingStates.fetchQuestions = true;

    try {
      let params = JSON.stringify([]);

      let result = await ApiCalls(
        "fetchQuestions",
        "post",

        `Student/getSubjectQuetionswithoptions?SubjectId=${subjectId}&Studentid=${studentId}`,
        params
      );

      console.log("fetchQuestions", result);
      if (result) {
        setStudentInfo(result[0]?.StudentInfo[0]);
        setQuestionsWithOptions(result[0]?.QustionsWithOptionss);
      }
      return result; // return the result from the API
    } catch (error) {
      console.log(`while fetchQuestions ${error}`);
    } finally {
      loadingStates.fetchQuestions = false;
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-8 xs:p-0">
        <Row className="bg-white p-2 rounded-md min-h-36">
          <Col xs={24} sm={4} md={4} lg={4}>
            <img
              alt="student-avatar"
              src={`data:image/png;base64,${studentInfo?.Photo}`} // Your base64 image data here
              className="w-full h-full"
              style={{ borderRadius: "0.5rem" }}
            />
          </Col>
          <Col xs={24} sm={20} md={20} lg={20} className=" flex items-center ">
            <Row gutter={[16, 16]}>
              {/* First Row */}
              <Col span={8}>
                <div>
                  <strong>Name:</strong> {studentInfo?.StudentName}
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <strong>Email:</strong> {studentInfo?.Email}
                </div>
              </Col>

              {/* Second Row */}
              <Col span={8}>
                <div>
                  <strong>Date Of Birth:</strong>{" "}
                  {moment(studentInfo?.Dob).format("DD-MMM-YYYY")}
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <strong>Course:</strong> {studentInfo?.SubjectName}
                </div>
              </Col>

              <Col span={8}>
                <div>
                  <strong>Semester:</strong> {studentInfo?.Sem}
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <strong>Course:</strong> {studentInfo?.Course}
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <strong>Mobile No:</strong> {studentInfo?.MobileNo}
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <strong>Register number:</strong> {studentInfo?.Reg_number}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Right side content (student data) */}

        {/* OMR Answer Sheet Section */}
        <OMRAnswerSheet
          questionsWithOptions={questionsWithOptions}
          subjectId={subjectId}
          studentId={studentId}
        />
      </div>
    </div>
  );
};

export default IndudalStudentData;
