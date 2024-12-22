import React from "react";
import { Card, Col, Row } from "antd";
import styled from "styled-components";
import DynamicIcon from "../IconComponent/IconComponent";
const CustomCard = ({
  cardIcon,
  cardName,
  cardColor,
  totalCount,
  complitedCount,
  onClickHandel,
}) => {
  return (
    <Card
      style={{
        // width: 200,
        background: cardColor,
        color: "#ffffff",
        cursor: "pointer",
      }}
      onClick={() => onClickHandel(cardName)}
    >
      <Row gutter={16} className="relative w-full">
        <div className="absolute flex justify-center items-center opacity-20 rotate-45">
          <DynamicIcon iconName={cardIcon} color="#ffffff" size={"30%"} />
        </div>
        <Col xs={8} sx={8} lg={8} className="gutter-row">
          <DynamicIcon
            iconName={cardIcon}
            color="#ffffff"
            size={"100%"}
            className="rotate-45"
          />
        </Col>
        <Col xs={16} sx={16} lg={16} className="gutter-row">
          <div>
            <h3 className="text-xl font-bold">{cardName}</h3>
            <span className="text-sm font-semibold">
              Qns : {complitedCount}/{totalCount}
            </span>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CustomCard;
