import React from "react";
import WebcamComponent from "../../WebCam/WebCam";
import ButtonComponent from "../../../reusable/Button/ButtonComponent";

import CameraComponent from "../../WebCam/Camera";
import DonuteChart from "../../charts/DonuteChart";
import { Col, Row } from "antd";

const Dashboard = () => {
  let dashboardData = JSON.parse(localStorage.getItem("dashboard"));
  let { CourseWise, OverAll } = dashboardData;

  console.log("dashboardData", dashboardData);

  return (
    <div className=" h-full p-2">
      <Row gutter={[8, 8]}>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={6}
          style={{
            height: "200px", // Fixed height
            display: "flex",
            justifyContent: "center", // Center content horizontally
            alignItems: "center", // Center content vertically
          }}
        >
          <DonuteChart data={OverAll} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}  style={{
            height: "200px", // Fixed height
            display: "flex",
            justifyContent: "center", // Center content horizontally
            alignItems: "center", // Center content vertically
          }}>
          <DonuteChart data={CourseWise} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
