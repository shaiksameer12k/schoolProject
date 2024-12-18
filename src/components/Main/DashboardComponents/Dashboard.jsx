import React from "react";
import WebcamComponent from "../../WebCam/WebCam";
import ButtonComponent from "../../../reusable/Button/ButtonComponent";

import CameraComponent from "../../WebCam/Camera";
import DemoBar from "../../charts/DonuteChart";
import { Col, Row } from "antd";

const Dashboard = () => {
  let data02 = [
    { type: "SSC", value: 25 },
    { type: "PUC", value: 27 },
    { type: "Degree", value: 25 },
  ];
  let data01 = [
    { type: "Submited", value: 25 },
    { type: "Pending", value: 175 },
  ];
  // Calculate total value
  const totalValue = data01.reduce((acc, item) => acc + item.value, 0);

  // Calculate percentage for each type
  const dataWithPercentage = data01.map((item) => ({
    ...item,
    percentage: ((item.value / totalValue) * 100).toFixed(2), // Calculate percentage and round it to two decimal places
  }));
  console.log("dataWithPercentage", dataWithPercentage);
  return (
    <div className=" h-full bg-customlightGrayBgColor p-2">
      <Row gutter={[8, 8]}>
        <Col
          sm={12}
          md={12}
          lg={6}
          style={{ height: "200px" }}
          className="shadow-lg gutter-item"
        >
          <DemoBar data={data01} type="Pie" />
        </Col>
        <Col
          sm={12}
          md={12}
          lg={6}
          style={{ height: "200px" }}
          className="shadow-lg gutter-item"
        >
          <DemoBar data={data02} type="Pie" />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
