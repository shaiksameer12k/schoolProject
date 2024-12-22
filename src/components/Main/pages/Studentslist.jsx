import React, { useEffect, useState } from "react";
import DynamicDataTable from "../../../reusable/DynamicDataTable/DynamicDataTable";
import InputField from "../../../reusable/InputField/InputField";
import { catagoryFieldsData } from "../../../data/formData";
import { Col, Grid, message, Row } from "antd";
import ButtonComponent from "../../../reusable/Button/ButtonComponent";
import { dataToExcelExport } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";

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
  const [columnData, setColumnData] = useState([]);
  const orgColumns = [
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name", // Unique key for each column
      is_visible: true,
    },
    {
      title: "Science",
      dataIndex: "science",
      key: "science",
      is_visible: true,
    },
    {
      title: "English",
      dataIndex: "english",
      key: "english",
      is_visible: true,
    },
    {
      title: "Hindi",
      dataIndex: "hindi",
      key: "hindi",
      is_visible: true,
    },
  ];
  const [selectedData, setSelectedData] = useState([]);
  const data = [
    { id: 1, student_name: "test01", science: 30, english: 40, hindi: 50 },
    { id: 2, student_name: "test02", science: 20, english: 60, hindi: 10 },
    { id: 3, student_name: "test03", science: 40, english: 20, hindi: 80 },
  ];
  let navegate = useNavigate();

  useEffect(() => {
    let columns = orgColumns.map((item) => ({
      ...item,
      sorter: (a, b) => {
        const aValue = a[item?.dataIndex];
        const bValue = b[item?.dataIndex];

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
      },
      render: (text, record) => {
        console.log("render*", text, record);
        // If you want to apply specific render behavior to "student_name" or other columns, you can conditionally check
        if (item.dataIndex === "student_name") {
          return (
            <span
              onClick={() => navegate(`/layout/studentsList/${record?.id}`)} // You can access the entire record if needed
              className="text-linkColor cursor-pointer"
            >
              {text}
            </span>
          );
        }

        // Default rendering for other columns
        return <span>{text}</span>;
      },
    }));
    setColumnData(columns); // Update state with the new column definitions
  }, []);

  const exportEmployeeListReport = () => {
    if (!selectedData.length > 0) {
      return message.error("need to select one employee");
    }
    return dataToExcelExport(data, "EmployeeList");
  };

  console.log("columnData", columnData);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  console.log("screens", screens);
  return (
    <div className="">
      <div>
        <Row gutter={[8, 8]} align="top" style={{ margin: "5px 0px" }}>
          {catagoryFieldsData.map(
            (field) =>
              field.isFieldVisible && (
                <Col xs={8} sm={6} md={6} lg={4} key={field?.name}>
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
                  />
                </Col>
              )
          )}

          <Col xs={24} sm={6} md={6} lg={4}>
            <ButtonComponent
              name="Export"
              icon="PiExportFill"
              size="medium"
              onClick={exportEmployeeListReport}
              btnStyle={{ width: "100%", margin: 0 }}
            />
          </Col>
        </Row>
      </div>
      <DynamicDataTable
        columnsData={columnData}
        data={data}
        customid={"id"}
        getSelectdRowData={setSelectedData}
      />
    </div>
  );
};

export default Studentslist;
