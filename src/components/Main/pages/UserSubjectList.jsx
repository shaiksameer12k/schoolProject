import React from "react";
import CustomCard from "../../../reusable/Card/CustomCard";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const UserSubjectList = () => {
  const navigate = useNavigate();
  let cardsData = [
    {
      cardId: 1,
      cardIcon: "RiTestTubeFill",
      cardName: "Chemestry",
      cardColor: "#fb7f7f",
      totalCount: "50",
      complitedCount: "0",
    },

    {
      cardId: 2,
      cardIcon: "PiMathOperationsBold",
      cardName: "Maths",
      cardColor: "#709cff",
      totalCount: "50",
      complitedCount: "0",
    },
    {
      cardId: 3,
      cardIcon: "FaBiohazard",
      cardName: "Biology",
      cardColor: "#21DC71",
      totalCount: "50",
      complitedCount: "0",
    },
  ];
  const onClickHandel = (CardName) => {
    navigate(`/layout/userLogin/${CardName}`);
  };
  return (
    <div>
      <Row gutter={[8,8]}>
        {cardsData?.map((card) => (
          <Col xs={24} sm={12} md={12} lg={4}>
            <CustomCard
              key={card?.cardId}
              cardName={card?.cardName}
              cardIcon={card?.cardIcon}
              cardColor={card?.cardColor}
              totalCount={card?.totalCount}
              complitedCount={card?.complitedCount}
              onClickHandel={onClickHandel}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserSubjectList;
