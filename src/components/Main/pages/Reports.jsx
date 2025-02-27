import React, { useEffect, useState } from "react";
import DynamicDataTable from "../../../reusable/DynamicDataTable/DynamicDataTable";

import { catagoryFieldsData } from "../../../data/formData";
import { Col, Grid, message, Row } from "antd";
import ButtonComponent from "../../../reusable/Button/ButtonComponent";
import { dataToExcelExport, handleDownload } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useApiCalls } from "../../../api/apiCalls";
import InputField from "../../../reusable/InputField/InputField";
import { centrliseFieldsValidation } from "../../../utils/feildValidation";
import FormLayout from "../../../reusable/FormLayout/FormLayout";
import ModalComponent from "../../../reusable/ModelComponent/ModelComponent";
import DynamicIcon from "../../../reusable/IconComponent/IconComponent";

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

const Reports = () => {
  let { ApiCalls, loadingStates } = useApiCalls();
  let navigate = useNavigate();
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedStudentData, setSelectedStudentData] = useState({});
  const [selectedStudentSubjectList, setSelectedStudentSubjectList] = useState(
    []
  );
  const [previewStudentData, setPreviewStudentData] = useState(false);
  let loginUserData = JSON.parse(localStorage.getItem("loginUserData"));

  const exportEmployeeListReport = () => {
    if (!selectedData.length > 0) {
      return message.error("need to select one employee");
    }

    console.log("selectedData", selectedData);

    return dataToExcelExport(rowData, "studentList");
  };

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const getStudentsReportList = async (CourseId, SemesterId) => {
    console.log("getStudentsReportList", CourseId, SemesterId);
    loadingStates.getStudentsReportList = true;
    try {
      let params = JSON.stringify([]);
      let result = await ApiCalls(
        "getStudentsReportList",
        "post",
        `Admin/GetReportsOfStudent?UpdatedBy=${loginUserData[0]?.UserId}&CoursId=${CourseId}&Semids=${SemesterId}`,
        params
      );

      console.log("getStudentsReportList", result);

      if (result) {
        let editCol = {
          SlNo: 0,
          title: "Preview",
          dataIndex: "Preview",
          key: "Preview",
          is_visible: true,
          render: (text, record) => {
            return (
              <span
                className="text-linkColor cursor-pointer"
                onClick={() => {
                  setPreviewStudentData(true);
                  setSelectedStudentData(record);
                  setSelectedStudentSubjectList(record?.subjectlist);
                  console.log("record", record);
                }} // You can access the entire record if needed
              >
                Preview
              </span>
            );
          },
        };

        let updateColData = result[0]?.Columns.filter(
          (item) => item?.is_visible
        );

        setColumnData([...updateColData, editCol]);
        setRowData(result[0]?.Data);
      }

      return;
    } catch (error) {
    } finally {
      loadingStates.getStudentsReportList = false;
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
      getStudentsReportList(value, data?.Semester);
      return;
    } else if (name == "Semester") {
      getStudentsReportList(data?.Course, value);
      return;
    }

    return;
  };

  console.log(
    "selectedStudentData",
    selectedStudentData,
    selectedStudentSubjectList
  );

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
        customid={"SlNo"}
        getSelectdRowData={setSelectedData}
      />

      <ModalComponent
        isModalOpen={previewStudentData}
        title={
          <div className="flex items-center gap-2">
            {" "}
            Preview Student Data{" "}
            <DynamicIcon
              iconName="FaDownload"
              size={20}
              onClickHandel={() => handleDownload("previewStudentData")}
              iconTooltipTitle="Click to Download strudent Marks"
            />{" "}
          </div>
        }
        content={
          <div id="previewStudentData">
            <div className="border rounded-md bg-[#f7f7f7] px-2 py-1">
              <div className=" flex justify-between">
                <div>
                  <label className="font-sans font-semibold text-xs text-[#707070]">
                    Student Name :
                  </label>
                  <span className="font-sans font-semibold text-xs text-[#5c5c5c]">
                    {selectedStudentData?.Name}
                  </span>
                </div>
                <div>
                  <label className="font-sans font-semibold text-xs text-[#707070]">
                    Student Register No :
                  </label>
                  <span className="font-sans font-semibold text-xs text-[#5c5c5c]">
                    {selectedStudentData?.Reg_Number}
                  </span>
                </div>
              </div>
              <div className=" flex justify-between">
                <div>
                  <label className="font-sans font-semibold text-xs text-[#707070]">
                    Course :
                  </label>
                  <span className="font-sans font-semibold text-xs text-[#5c5c5c]">
                    {selectedStudentData?.Course} (Sem{" "}
                    {selectedStudentData?.Semester})
                  </span>
                </div>
              </div>
            </div>

            <div className="py-2 ">
              <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden ">
                <thead className="bg-gradient-to-r from-blue-400 to-blue-400 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold">
                      Subject
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedStudentSubjectList?.map((item) => {
                    return (
                      <tr
                        className="hover:bg-gray-50 transition duration-150 ease-in-out"
                        // key={item?.SlNo}
                      >
                        <td className="py-3 px-4">{item?.subjects}</td>
                        <td className="py-3 px-4">{item?.marks}</td>
                      </tr>
                    );
                  })}

                  <tr className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="py-3 px-4 font-semibold text-right">
                      Total:
                    </td>
                    <td className="py-3 px-4 font-semibold ">
                      {selectedStudentSubjectList?.reduce((total, current) => {
                        total += Number(current?.marks);
                        return total;
                      }, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }
        cancelButtonProps={() => setPreviewStudentData(false)}
        handleCancel={() => setPreviewStudentData(false)}
      />
    </div>
  );
};

export default Reports;
