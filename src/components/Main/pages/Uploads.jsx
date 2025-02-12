import React, { useEffect, useState } from "react";
import CustomCard from "../../../reusable/Card/CustomCard";
import { Col, Divider, Grid, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../../reusable/Button/ButtonComponent";
import DynamicIcon from "../../../reusable/IconComponent/IconComponent";
import ModalComponent from "../../../reusable/ModelComponent/ModelComponent";
import InputField from "../../../reusable/InputField/InputField";
import FileUpload from "../../../reusable/FileUpload/FileUpload";
import {
  adminOMRQuestionsAndAnswersUploadForm,
  adminQuestionsUploadForm,
} from "../../../data/formData";
import FormLayout from "../../../reusable/FormLayout/FormLayout";
import { useApiCalls } from "../../../api/apiCalls";
import { centrliseFieldsValidation } from "../../../utils/feildValidation";
const { useBreakpoint } = Grid;

const OMRAnswerSheet = ({
  selectedData,
  openModelHandel,
  openEditQuestionModelHandel,
}) => {
  const [questionsList, setQuestionsList] = useState([]);
  const screen = useBreakpoint();

  console.log(
    "selectedData",
    selectedData,
    selectedData[0]?.QustionsWithOptions,
    questionsList
  );

  useEffect(() => {
    setQuestionsList(selectedData[0]?.QustionsWithOptions);
  }, [selectedData]);

  return (
    <div className="mt-1">
      <div className="flex justify-between items-center ">
        <Typography.Title level={screen.xs ? 5 : 4}>
          OMR Answer Sheet Of{" "}
          <span className="text-red-700 text-3xl xs:text-2xl">
            {" "}
            {selectedData[0]?.Subject}{" "}
          </span>
        </Typography.Title>

        <ButtonComponent
          name="Upload"
          size="middle"
          btnStyle={{ width: "auto" }}
          icon="FaCloudUploadAlt"
          onClick={openModelHandel}
        />
      </div>
      <div className="flex flex-col space-y-5">
        {questionsList?.map((item, index) => (
          <div key={item?.Qid} className="flex flex-col">
            <p className="font-semibold flex items-center gap-2">
              {`Q${index + 1}: ${item.Question}`}{" "}
              <DynamicIcon
                iconName="FaEdit"
                color="#1ca0dc"
                size={18}
                className="cursor-pointer"
                iconTooltipTitle="Click To Edit"
                onClickHandel={() =>
                  openEditQuestionModelHandel(item, selectedData, "update")
                }
              />
            </p>
            <div className="flex space-x-4">
              {item.Options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  <input
                    type="radio"
                    id={`question${index + 1}-option${optionIndex}`}
                    name={option?.name}
                    value={option?.value}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`question${index + 1}-option${optionIndex}`}
                    className="text-lg xs:text-sm my-1"
                  >
                    {option?.value}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Uploads = () => {
  const navigate = useNavigate();
  let { ApiCalls, loadingStates } = useApiCalls();

  let loginUserData = JSON.parse(localStorage.getItem("loginUserData"));

  const [selectedData, setSelectedData] = useState("");
  const [cardsData, setCardsData] = useState([]);
  const [isUploadModel, setIsUploadModel] = useState(false);
  const [isEditUploadModel, setIsEditUploadModel] = useState(false);
  const [isAddNewQuestionModel, setIsAddNewQuestionModel] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({
    question: "",
    A: "",
    B: "",
    C: "",
    D: "",
  });
  const [fields, setFields] = useState(adminQuestionsUploadForm);
  const [questionsList, setQuestionsList] = useState([]);

  // new question add
  const [addNewFormFieldsData, setAddNewFormFieldsData] = useState(
    adminOMRQuestionsAndAnswersUploadForm
  );
  const [editFormFieldsData, setEditFormFieldsData] = useState(
    adminOMRQuestionsAndAnswersUploadForm
  );
  const [isApplicationType, setIsApplicationType] = useState("insert");

  const onClickHandel = (cardId, cardsData) => {
    setSelectedData(cardId);

    let updateArr = cardsData.map((item) =>
      item?.SubjectId === cardId
        ? { ...item, cardColor: "#fb7f7f" }
        : { ...item, cardColor: "#ffffff" }
    );
    let filterSubjectData = cardsData.filter(
      (item) => item?.SubjectId === cardId
    );

    setCardsData(updateArr);
    setQuestionsList(filterSubjectData);
  };

  const openModelHandel = () => {
    setIsUploadModel(true);
  };

  const closeModelHandel = () => {
    setIsUploadModel(false);
  };
  //   edit

  const openEditQuestionModelHandel = (
    data,
    selectedData,
    isApplicationType
  ) => {
    setIsAddNewQuestionModel(true);
    setIsApplicationType(isApplicationType);
    let { Options, Qid, Question } = data;

    let updatedFields = adminOMRQuestionsAndAnswersUploadForm
      .filter(
        (item) =>
          item.name !== "Semester" &&
          item.name !== "Course" &&
          item.name !== "Subject"
      )
      .map((item) =>
        item.name === "Question"
          ? { ...item, value: Question, Qid: Qid }
          : item.name.includes("Option")
          ? {
              ...item,
              value: Options.find((opt) => opt.name === item.name)?.value || "",
              Qid: Qid,
            }
          : { ...item, Qid: Qid }
      );

    setEditFormFieldsData(updatedFields);

    console.log("updatedFields", updatedFields, addNewFormFieldsData);
    console.log("openEditQuestionModelHandel", data);
  };

  const openAddNewQuestion = (isApplicationType) => {
    setIsAddNewQuestionModel(true);
    setIsApplicationType(isApplicationType);
  };

  const closeAddNewQuestion = () => {
    setIsAddNewQuestionModel(false);
  };

  const handleChange = async (e, fieldsArray, regexType, maxLength, field) => {
    const { name, value, type, checked } = e.target;

    // Centrlise Fields Validation
    let updatedFields = fieldsArray;

    if (field?.isDependentOnOtherColumn) {
      let data = [];
      if (field?.DependentColumnName == "Semester") {
        data = await getSemesterData(value);
      } else if (field?.DependentColumnName == "Subject") {
        let Courseid = fieldsArray.find(
          (item) => item?.name == "Course"
        )?.value;
        data = await getSubjectData(Courseid, value);
      }

      let options = data?.map((data) => ({
        label:
          field?.DependentColumnName == "Semester"
            ? data?.Semesters
            : field?.DependentColumnName == "Subject"
            ? data?.SubjectName
            : data[field?.DependentColumnName],
        value:
          field?.DependentColumnName == "Semester"
            ? String(data?.Semid)
            : field?.DependentColumnName == "Subject"
            ? String(data?.subId)
            : data[field?.DependentColumnName],
      }));

      console.log("options", options);

      updatedFields = updatedFields.map((item) =>
        item.name == field?.DependentColumnName
          ? {
              ...item,
              options: options,
            }
          : item
      );

      console.log("updatedFields*", updatedFields);
    }

    updatedFields = centrliseFieldsValidation(
      type,
      name,
      value,
      checked,
      updatedFields,
      regexType,
      maxLength
    );

    setFields(updatedFields);
    // form.setFieldsValue({ [name]: value });
    return;
  };

  const getCourseData = async () => {
    loadingStates.getCourseData = true;

    try {
      let params = JSON.stringify([
        {
          CourseName: "string",
          Category: "string",
          semesters: "string",
          IsYearly: true,
          Transaction: "display",
          TransactionId: "string",
        },
      ]);

      let result = await ApiCalls(
        "getCourseData",
        "post",
        "Admin/AddOrupdateCourse",
        params
      );

      console.log("getCourseData", result);
      return result; // return the result from the API
    } catch (error) {
      console.log(`while getCourseData ${error}`);
    } finally {
      loadingStates.getCourseData = false;
    }
  };

  const getSemesterData = async (CourseId = "") => {
    loadingStates.getSemesterData = true;

    try {
      let params = JSON.stringify([
        {
          semester: "string",
          CourseId: CourseId,
          Transaction: "display",
          TransactionId: "string",
        },
      ]);

      let result = await ApiCalls(
        "getSemesterData",
        "post",
        "Admin/AddOrupdatecourseSemesters",
        params
      );

      console.log("getSemesterData", result);

      return result; // return the result from the API
    } catch (error) {
      console.log(`while getSemesterData ${error}`);
    } finally {
      loadingStates.getSemesterData = false;
    }
  };

  const getSubjectData = async (CourseId = "", semesterId = "") => {
    loadingStates.getSubjectData = true;

    try {
      let params = JSON.stringify([
        {
          SubjectName: "string",
          Semid: semesterId,
          coursename: CourseId,
          Transaction: "string",
          TransactionId: "string",
        },
      ]);

      let result = await ApiCalls(
        "getSubjectData",
        "post",
        "Admin/AddOrupdateSubjects",
        params
      );

      console.log("getSubjectData", result);

      return result; // return the result from the API
    } catch (error) {
      console.log(`while getSubjectData ${error}`);
    } finally {
      loadingStates.getSubjectData = false;
    }
  };

  const fetchQuestions = async () => {
    loadingStates.fetchQuestions = true;

    try {
      let paramsData = fields.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {});

      let params = JSON.stringify([]);

      let result = await ApiCalls(
        "fetchQuestions",
        "post",
        `Admin/getAllQuetionswithoptions?isAdmin=1&CourseId=${
          paramsData?.Course
        }&Semid=${paramsData?.Semester}&Studentid=${0}`,
        params
      );

      if (result.length > 0) {
        let filterSubjectList = result.map((item) => ({
          cardName: item?.Subject,
          cardId: item?.SubjectId,
        }));
        console.log("filterSubjectList", filterSubjectList);

        setCardsData(result);
        onClickHandel(filterSubjectList[0]?.cardId, result);
      }

      console.log("fetchQuestions", result);

      return result; // return the result from the API
    } catch (error) {
      console.log(`while fetchQuestions ${error}`);
    } finally {
      loadingStates.fetchQuestions = false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let getCourse = await getCourseData();

      let courseOptions = getCourse?.map((data) => ({
        label: data.CourseName,
        value: String(data.Coursid),
      }));

      let updateArr01 = adminQuestionsUploadForm.map((item) =>
        item?.name === "Course" ? { ...item, options: courseOptions } : item
      );

      let correctAnswerOptions = adminOMRQuestionsAndAnswersUploadForm
        .filter((item) => item.label.includes("Option"))
        ?.map((data) => ({
          label: data.label,
          value: data.label,
        }));

      let updateArr02 = adminOMRQuestionsAndAnswersUploadForm.map((item) =>
        item?.name === "Course"
          ? { ...item, options: courseOptions }
          : item?.name === "CorrectOption"
          ? { ...item, options: correctAnswerOptions }
          : item
      );

      setFields(updateArr01);
      setAddNewFormFieldsData(updateArr02);
    };
    fetchData();
  }, []);

  console.log("questionsList", questionsList);

  
  // addNewForm
  const addNewFormHandleChange = async (
    e,
    fieldsArray,
    regexType,
    maxLength,
    field
  ) => {
    const { name, value, type, checked } = e.target;

    // Centrlise Fields Validation
    let updatedFields = fieldsArray;

    if (field?.isDependentOnOtherColumn) {
      let data = [];
      if (field?.DependentColumnName == "Semester") {
        data = await getSemesterData(value);
      } else if (field?.DependentColumnName == "Subject") {
        let Courseid = fieldsArray.find(
          (item) => item?.name == "Course"
        )?.value;
        data = await getSubjectData(Courseid, value);
      }

      let options = data?.map((data) => ({
        label:
          field?.DependentColumnName == "Semester"
            ? data?.Semesters
            : field?.DependentColumnName == "Subject"
            ? data?.SubjectName
            : data[field?.DependentColumnName],
        value:
          field?.DependentColumnName == "Semester"
            ? String(data?.Semid)
            : field?.DependentColumnName == "Subject"
            ? String(data?.subId)
            : data[field?.DependentColumnName],
      }));

      console.log("options", options);

      updatedFields = updatedFields.map((item) =>
        item.name == field?.DependentColumnName
          ? {
              ...item,
              options: options,
            }
          : item
      );

      console.log("updatedFields*", updatedFields);
    }

    updatedFields = centrliseFieldsValidation(
      type,
      name,
      value,
      checked,
      updatedFields,
      regexType,
      maxLength
    );

    if (isApplicationType == "insert") {
      setAddNewFormFieldsData(updatedFields);
    } else {
      setEditFormFieldsData(updatedFields);
    }

    // form.setFieldsValue({ [name]: value });
    return;
  };

  const addNewQuestionHandleSubmit = async () => {
    console.log("addNewQuestionHandleSubmit", addNewFormFieldsData);
    loadingStates.addNewQuestionHandleSubmit = true;
    try {
      let paramsData;
      let QusId = "";
      if (isApplicationType == "insert") {
        paramsData = addNewFormFieldsData.reduce((acc, curr) => {
          acc[curr.name] = curr.value;
          return acc;
        }, {});
      } else {
        paramsData = editFormFieldsData.reduce((acc, curr) => {
          acc[curr.name] = curr.value;
          return acc;
        }, {});
        QusId = editFormFieldsData[0]?.Qid;
      }

      let params = JSON.stringify([
        {
          ...paramsData,
          SemesterId: paramsData?.Semester,
          SubjectId: paramsData?.Subject,
          CourseId: paramsData?.Course,
          UserId: loginUserData[0]?.UserId,
          Transaction: isApplicationType,
          TransactionId: isApplicationType == "insert" ? "" : QusId,
        },
      ]);
      let result = await ApiCalls(
        "addNewQuestionHandleSubmit",
        "post",
        "Admin/AddOrUpdateQuestionOptions",
        params
      );
      if (result) {
        setIsAddNewQuestionModel(false);
        fetchQuestions()
      }
      console.log("addNewQuestionHandleSubmit", result);
      return;
    } catch (error) {
      console.log(`Error addNewQuestionHandleSubmit ${error}`);
    } finally {
      loadingStates.addNewQuestionHandleSubmit = false;
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center px-2  p-0">
        <div className="flex-1">
          {
            <FormLayout
              fieldsData={fields}
              handleChange={handleChange}
              isButtonRequired={false}
            />
          }
        </div>
        <div className="flex gap-2">
          <ButtonComponent
            name="Fetch Questions"
            size="middle"
            btnStyle={{ width: "auto" }}
            icon="FaCloudUploadAlt"
            onClick={fetchQuestions}
            loading={loadingStates?.fetchQuestions}
          />
          <ButtonComponent
            name="Add New Questions"
            size="middle"
            btnStyle={{ width: "auto" }}
            icon="IoMdAdd"
            onClick={() => openAddNewQuestion("insert")}
          />
        </div>{" "}
      </div>

      <Row gutter={[8, 8]}>
        {cardsData?.map((card) => (
          <Col xs={8} sm={12} md={12} lg={4}>
            <CustomCard
              key={card?.SubjectId}
              cardName={card?.Subject}
              // cardIcon={card?.cardIcon}
              cardColor={card?.cardColor}
              // totalCount={card?.totalCount}
              // complitedCount={card?.complitedCount}
              onClickHandel={onClickHandel}
              // selectedData={selectedData}
              cardId={card?.SubjectId}
              cardsData={cardsData}
            />
          </Col>
        ))}
      </Row>

      <Divider className="mt-0" />

      <OMRAnswerSheet
        selectedData={questionsList}
        openModelHandel={openModelHandel}
        openEditQuestionModelHandel={openEditQuestionModelHandel}
      />

      <ModalComponent
        title="Bulk Upload"
        isModalOpen={isUploadModel}
        content={
          <div className="flex justify-center items-center">
            <FileUpload />
          </div>
        }
        okText="Submit"
        handleCancel={closeModelHandel}
        okButtonProps={{ style: { backgroundColor: "#FF8383" } }}
      />

      <ModalComponent
        title={
          isApplicationType == "insert"
            ? "Add New Questions"
            : "Edit Selected Question"
        }
        isModalOpen={isAddNewQuestionModel}
        content={
          <>
            <FormLayout
              fieldsData={
                isApplicationType == "insert"
                  ? addNewFormFieldsData
                  : editFormFieldsData
              }
              handleChange={addNewFormHandleChange}
              isButtonRequired={false}
            />
          </>
        }
        okText={isApplicationType == "insert" ? "Submit" : "Update"}
        handleCancel={closeAddNewQuestion}
        handleOk={addNewQuestionHandleSubmit}
        okButtonProps={{ style: { backgroundColor: "#FF8383" } }}
      />
    </div>
  );
};

export default Uploads;
