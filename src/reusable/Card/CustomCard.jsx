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
  selectedData,
  cardId,
  cardsData,
  isDisabled,
}) => {
  return (
    <Card
      style={{
        // width: 200,
        background: isDisabled ? "#c3c3c3" : cardColor,
        color: "#ffffff",
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
      onClick={isDisabled ? () => {} : () => onClickHandel(cardId, cardsData)}
      className="hover:shadow-lg hover:scale-105 transition-all  duration-1000 "
    >
      <Row gutter={16} className="relative w-full">
        <div className="absolute flex justify-center items-center opacity-20 rotate-45">
          <DynamicIcon iconName={cardIcon} color="#ffffff" size={"30%"} />
        </div>
        {cardIcon && (
          <Col xs={8} sx={8} lg={8} className="gutter-row">
            <DynamicIcon
              iconName={cardIcon}
              color="#ffffff"
              size={"100%"}
              className="rotate-45"
            />
          </Col>
        )}
        <Col xs={16} sx={16} lg={16} className="gutter-row">
          <div>
            <h3
              className={
                cardColor !== "#ffffff"
                  ? "text-xl font-bold text-white"
                  : "text-xl font-bold text-gray-500 "
              }
            >
              {cardName.length > 15 ? `${cardName.slice(0, 15)}...` : cardName}
            </h3>
            {totalCount && (
              <span
                className={
                  cardColor !== "#ffffff"
                    ? "text-sm font-semibold text-white"
                    : "text-sm font-semibold text-gray-400 "
                }
              >
                Qns : {complitedCount}/{totalCount}
              </span>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CustomCard;
