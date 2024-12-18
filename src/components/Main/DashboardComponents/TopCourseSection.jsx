import React from "react";
import CourceCard from "../../../common/CourceCard";
import { Col, Row } from "antd";

const TopCourseSection = () => {
  return (
    <div className="py-10 bg-white px-10 max-sm:px-4">
      <h2 className="text-center text-3xl max-sm:text-2xl font-bold">
        Choose From Our Top Courses
      </h2>
      <div className="py-10 max-sm:py-2">
        <Row className="gap-4 max-sm:gap-0 justify-center">
          <Col sm={24} md={6} lg={5}>
            <CourceCard imgLink="https://raistheme.com/html/gostudy/gostudy/assets/images/courses/course-1.jpg" />
          </Col>
          <Col sm={24} md={6} lg={5}>
            <CourceCard imgLink="https://raistheme.com/html/gostudy/gostudy/assets/images/courses/course-2.jpeg" />
          </Col>
          <Col sm={24} md={6} lg={5}>
            <CourceCard imgLink="https://raistheme.com/html/gostudy/gostudy/assets/images/courses/course-3.jpg" />
          </Col>
          <Col sm={24} md={6} lg={5}>
            <CourceCard imgLink="https://raistheme.com/html/gostudy/gostudy/assets/images/courses/course-4.jpeg" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TopCourseSection;
