import React from "react";
import ButtonComponent from "../../../reusable/Button/ButtonComponent";
import InputField from "../../../reusable/InputField/InputField";
import { studentStartAssessmentDetails } from "../../../data/formData";
import { Col, Row, Grid } from "antd";
import WebcamComponent from "../../WebCam/WebCam";
import { useNavigate, useParams } from "react-router-dom";
const UserStartAssessment = () => {
  let screen = Grid.useBreakpoint();
  let navigate = useNavigate();
  let { subjectName } = useParams();
  console.log("screen", screen, subjectName);
  return (
    <div className="h-full ">
      <Row gutter={[8, 8]} className="h-full">
        {screen?.xs ? (
          <>
            <Col xs={24} sm={24} md={12} lg={14}>
              <WebcamComponent screen={screen} />
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
                        />
                      </Col>
                    )
                )}

                <Col xs={24} sm={6} md={6} lg={24} className="text-center">
                  <ButtonComponent
                    name="Start Assessment"
                    size="medium"
                    btnStyle={{ width: "50%", margin: 0 }}
                    onClick={() =>
                      navigate(`/layout/userLogin/${subjectName}/2}`)
                    }
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
                {studentStartAssessmentDetails.map(
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
                        />
                      </Col>
                    )
                )}

                <Col xs={24} sm={6} md={6} lg={24} className="text-center">
                  <ButtonComponent
                    name="Start Assessment"
                    size="medium"
                    btnStyle={{ width: "50%", margin: 0 }}
                    onClick={() =>
                      navigate(`/StudentLayout/userLogin/${subjectName}/2}`)
                    }
                  />
                </Col>
              </Row>
            </Col>

            <Col xs={24} sm={24} md={12} lg={14} style={{ height: "100%" }}>
              <WebcamComponent />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default UserStartAssessment;
