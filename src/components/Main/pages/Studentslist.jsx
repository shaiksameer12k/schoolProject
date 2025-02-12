import React, { useEffect, useState } from "react";
import DynamicDataTable from "../../../reusable/DynamicDataTable/DynamicDataTable";

import { catagoryFieldsData } from "../../../data/formData";
import { Col, Grid, message, Row } from "antd";
import ButtonComponent from "../../../reusable/Button/ButtonComponent";
import { dataToExcelExport } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useApiCalls } from "../../../api/apiCalls";
import InputField from "../../../reusable/InputField/InputField";
import { centrliseFieldsValidation } from "../../../utils/feildValidation";
import FormLayout from "../../../reusable/FormLayout/FormLayout";

const sortFunciton = (a, b, field) => {
  const aValue = a[field];
  const bValue = b[field];

  // Check if the values are strings
  if (typeof aValue === "string" && typeof bValue === "string") {
    return aValue.localeCompare(bValue); // Compare strings
  }

  // Check if the values are numbers
  if (typeof aValue === "number" && typeof bValue === "number") {
    return aValue - bValue; // Compare numbers
  }

  // Fallback to string comparison if type is unknown or mixed
  return String(aValue).localeCompare(String(bValue));
};

const Studentslist = () => {
  let { ApiCalls, loadingStates } = useApiCalls();
  let navigate = useNavigate();
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [fields, setFields] = useState([]);

  const [selectedData, setSelectedData] = useState([]);

  const exportEmployeeListReport = () => {
    if (!selectedData.length > 0) {
      return message.error("need to select one employee");
    }

    console.log("selectedData", selectedData);

    return dataToExcelExport(rowData, "EmployeeList");
  };

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const getStudentsList = async (CourseId, SemesterId) => {
    console.log("getStudentsList", CourseId, SemesterId);
    loadingStates.getStudentsList = true;
    try {
      let params = JSON.stringify([
        {
          CourseId: CourseId,
          SemId: SemesterId,
        },
      ]);
      let result = await ApiCalls(
        "getStudentsList",
        "post",
        "Admin/getStudentDetails",
        params
      );

      console.log("getStudentsList", result);

      if (result) {
        let editCol = {
          SlNo: 0,
          title: "Edit",
          dataIndex: "Edit",
          key: "Edit",
          is_visible: true,
          render: (text, record) => {
            return (
              <span
                className="text-linkColor cursor-pointer"
                onClick={() => {
                  navigate(`/layout/userMaster?formStatus=Edit`);
                  localStorage.setItem(
                    "selectedStudentData",
                    JSON.stringify(record)
                  );
                }} // You can access the entire record if needed
              >
                Edit
              </span>
            );
          },
        };

        let updateColData = result[0]?.columndata.filter(
          (item) => item?.is_visible
        );

        setColumnData([...updateColData, editCol]);
        setRowData(result[0]?.Data);
      }

      return;
    } catch (error) {
    } finally {
      loadingStates.getStudentsList = false;
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
      let getCourse = await getCourseData();

      let courseOptions = getCourse?.map((data) => ({
        label: data.CourseName,
        value: String(data.Coursid),
      }));

      let updateArr = catagoryFieldsData?.map((item) =>
        item.name == "Course" ? { ...item, options: courseOptions } : item
      );

      setFields(updateArr);
    };
    fetchData();
    getStudentsList();
  }, []);

  const handleChange = async (e, fieldsArray, regexType, maxLength, field) => {
    const { name, value, type, checked } = e.target;

    // Centrlise Fields Validation
    let updatedFields = fieldsArray;

    if (field?.isDependentOnOtherColumn) {
      let data = [];
      if (field?.DependentColumnName == "Semester") {
        data = await getSemesterData(value);
      }

      let options = data?.map((data) => ({
        label: data[field?.DependentColumnName] || data?.Semesters,
        value: data[field?.DependentColumnName] || String(data?.Semid),
      }));

      console.log("options", options, updatedFields);

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

    console.log("updatedFields*&", updatedFields);

    setFields(updatedFields);

    let data = updatedFields.reduce((acc, curr) => {
      acc[curr.name] = curr.value;
      return acc;
    }, {});

    console.log("data****", data);

    if (name == "Course") {
      getStudentsList(value, data?.Semester);
      return;
    } else if (name == "Semester") {
      getStudentsList(data?.Course, value);
      return;
    }

    return;
  };

  return (
    <div className="">
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
        <ButtonComponent
          name="Export"
          icon="PiExportFill"
          size="medium"
          onClick={exportEmployeeListReport}
          btnStyle={{ margin: 0 }}
        />
      </div>

      <DynamicDataTable
        columnsData={columnData}
        data={rowData}
        customid={"Id"}
        getSelectdRowData={setSelectedData}
      />
    </div>
  );
};

export default Studentslist;
