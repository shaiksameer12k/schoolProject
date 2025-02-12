import React, { useEffect, useState } from "react";
import FormLayout from "../../../reusable/FormLayout/FormLayout";

import { registerFormData } from "../../../data/formData";
import { useApiCalls } from "../../../api/apiCalls";
import {
  centrliseFieldsValidation,
  centrliseFileFieldsValidation,
  submitFunctionRegexValidationCheck,
} from "../../../utils/feildValidation";
import { useParams, useSearchParams } from "react-router-dom";
import { message } from "antd";

const StudentRegisterForm = () => {
  let { ApiCalls, loadingStates } = useApiCalls();
  const [fields, setFields] = useState(registerFormData);
  let loginUserData = JSON.parse(localStorage.getItem("loginUserData"));
  let selectedStudentData = JSON.parse(
    localStorage.getItem("selectedStudentData")
  );

  let [searchParams] = useSearchParams();

  console.log("loginUserData", loginUserData);

  const handleChange = async (e, fieldsArray, regexType, maxLength, field) => {
    const { name, value, type, checked } = e.target;

    // Centrlise Fields Validation
    let updatedFields = fieldsArray;

    if (field?.isDependentOnOtherColumn) {
      let data = [];
      if (field?.DependentColumnName !== "PresentSem") {
        data = await getCountry_State_City(field?.DependentColumnName, value);
      } else {
        data = await getSemesterData(value);
      }

      let options = data?.map((data) => ({
        label: data[field?.DependentColumnName] || data?.Semesters,
        value: data[field?.DependentColumnName] || String(data?.Semid),
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

    updatedFields =
      type !== "file"
        ? centrliseFieldsValidation(
            type,
            name,
            value,
            checked,
            updatedFields,
            regexType,
            maxLength
          )
        : await centrliseFileFieldsValidation(
            type,
            name,
            value,
            checked,
            updatedFields,
            regexType,
            maxLength,
            e
          );

    if (name === "FirstName" || name === "MiddleName" || name === "LastName") {
      console.log("full Name", name, value);
      const { FirstName, MiddleName, LastName } = updatedFields.reduce(
        (acc, field) => {
          if (field.name === "FirstName") acc.FirstName = field.value;
          if (field.name === "MiddleName") acc.MiddleName = field.value;
          if (field.name === "LastName") acc.LastName = field.value;
          console.log(acc);
          return acc;
        },
        {}
      );

      const fullName = `${FirstName ? FirstName + " " : ""}${
        MiddleName ? MiddleName + " " : ""
      }${LastName ? LastName : ""}`;

      let updateFullName = updatedFields.map((field) =>
        field.name === "FullName" ? { ...field, value: fullName } : field
      );
      console.log("updateFullName", updateFullName);
      return setFields(updateFullName);
    }

    console.log("updatedFields*&", updatedFields);

    setFields(updatedFields);
    // form.setFieldsValue({ [name]: value });
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("checkFeildsState", fields);
    // checking all the mandatory fields and regex validations
    let checkFeildsState = fields.map((field) => {
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

    let checkFeildsValues = checkFeildsState.every((field) =>
      field.isMandatory ? field.isError.length == 0 : true
    );

    let paramsData = checkFeildsState.reduce((acc, curr) => {
      acc[curr.name] =
        curr.type == "file"
          ? curr.base64
          : curr.type == "date"
          ? curr.value?.$d
          : curr.value;
      return acc;
    }, {});

    console.log("Submit", checkFeildsState, checkFeildsValues, fields);

    setFields(checkFeildsState);

    if (checkFeildsValues) {
      let params = JSON.stringify([
        {
          ...paramsData,
          Transaction:
            searchParams.has("formStatus") &&
            searchParams.get("formStatus") == "Edit"
              ? "update"
              : "insert",
          TransactionId:
            searchParams.has("formStatus") &&
            searchParams.get("formStatus") == "Edit"
              ? selectedStudentData?.Id
              : "",
          UpdatedBy: loginUserData[0]?.UserId,
        },
      ]);
      let result = await ApiCalls(
        "handleSubmit",
        "post",
        "Admin/AddOrUpdateStudents",
        params
      );

      if (result[0].Status > 0) {
        setFields(registerFormData);
      }
    } else {
      return message.error("Please Fill the Mandatory Fields");
    }
  };

  // remove selected file
  const removeSelectedFile = (fieldName, multiple, base64Id) => {
    let updatedFields;
    if (multiple) {
      let filterFileData = fields
        .find((field) => field.name == fieldName)
        ?.data?.filter((item) => item.base64Id != base64Id);

      updatedFields = fields.map((filed) =>
        filed.name == fieldName ? { ...filed, data: filterFileData } : filed
      );
    } else {
      updatedFields = fields.map((field) =>
        field.name === fieldName
          ? { ...field, value: "", base64: "", base64FileName: "" }
          : field
      );
    }
    setFields(updatedFields);
  };

  const getCountry_State_City = async (
    Transition = "",
    TransitionValue = ""
  ) => {
    loadingStates.getCountry_State_City = true;

    try {
      let params = JSON.stringify([
        {
          Transition: Transition,
          TransitionValue: TransitionValue,
        },
      ]);

      let result = await ApiCalls(
        "getCountry_State_City",
        "post",
        "Admin/getCityStateCountry",
        params
      );

      console.log("getCountry_State_City", result);
      return result; // return the result from the API
    } catch (error) {
      console.log(`while getCountry_State_City ${error}`);
    } finally {
      loadingStates.getCountry_State_City = false;
    }
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

  useEffect(() => {
    const fetchData = async () => {
      let updateArr = [];
      let data = await getCountry_State_City("country", "");
      console.log("data", data);

      let countryOptions = data?.map((data) => ({
        label: data.Country,
        value: data.Country,
      }));

      updateArr = registerFormData.map((item) =>
        item?.name === "country" ? { ...item, options: countryOptions } : item
      );

      let getCourse = await getCourseData();

      let courseOptions = getCourse?.map((data) => ({
        label: data.CourseName,
        value: String(data.Coursid),
      }));

      updateArr = updateArr.map((item) =>
        item?.name === "PresentCourse"
          ? { ...item, options: courseOptions }
          : item
      );
      console.log("getCourseData", getCourse);

      if (
        searchParams.has("formStatus") &&
        searchParams.get("formStatus") == "Edit"
      ) {
        console.log("selectedStudentData", selectedStudentData, updateArr);

        for (let [key, value] of Object.entries(selectedStudentData)) {
          if (key == "DateOfBirth") {
            console.log(
              "selectedStudentData**",
              key == "DateOfBirth",
              key,
              value
            );
          }
          updateArr = updateArr.map((field) =>
            field.name == key ? { ...field, value: value } : field
          );
        }

        updateArr.map((field) =>
          console.log("selectedStudentData", field.name)
        );
      }

      setFields(updateArr);
    };

    fetchData();
  }, []);

  console.log("fields", fields);

  return (
    <div className="p-5 h-full ">
      <FormLayout
        fieldsData={fields}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        removeSelectedFile={removeSelectedFile}
      />
    </div>
  );
};

export default StudentRegisterForm;
