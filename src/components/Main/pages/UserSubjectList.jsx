import React, { useEffect, useState } from "react";
import CustomCard from "../../../reusable/Card/CustomCard";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import BarChart from "../../charts/BarChart";
import { useApiCalls } from "../../../api/apiCalls";

const UserSubjectList = () => {
  let { ApiCalls, loadingStates } = useApiCalls();
  let loginUserData = JSON.parse(localStorage.getItem("loginUserData"));
  console.log("loginUserData", loginUserData);
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);
  const onClickHandel = (cardId) => {
    navigate(`/StudentLayout/studentDashboard/${cardId}`);
  };

  const getSubjectsList = async () => {
    loadingStates.getSubjectsList = true;
    try {
      let params = JSON.stringify([]);
      let result = await ApiCalls(
        "getSubjectsList",
        "post",
        `Student/getStudentSubjects?Studid=${loginUserData[0]?.Id}&Semid=${loginUserData[0]?.PresentSem}&Courseid=${loginUserData[0]?.PresentCourse}`,
        params
      );
      console.log("getSubjectsList", result);

      if (result) {
        setCardsData(result);
      }

      loadingStates.getSubjectsList = false;
    } catch (error) {
      console.log(`Error getSubjectsList : ${error}`);
    } finally {
      loadingStates.getSubjectsList = false;
    }
  };

  useEffect(() => {
    getSubjectsList();
  }, [localStorage.getItem("loginUserData")]);

  console.log("cardsData", cardsData);

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={12} md={12} lg={12} className="border">
          <BarChart />
        </Col>

        <Col xs={24} sm={12} md={12} lg={12} className="border">
          <Row gutter={[8, 8]}>
            {cardsData?.map((card) => (
              <Col xs={24} sm={12} md={12} lg={8}>
                <CustomCard
                  key={card?.cardId}
                  cardName={card?.cardName}
                  cardIcon={card?.cardIcon}
                  cardColor={"#ffffff"}
                  totalCount={card?.totalCount}
                  complitedCount={card?.complitedCount}
                  onClickHandel={onClickHandel}
                  cardId={card?.cardId}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserSubjectList;
