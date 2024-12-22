import React from "react";
// import logo from "../../assets/smart-x_whiteBg.png";
import { Col, Row, Image } from "antd";
import DynamicIcon from "../../reusable/IconComponent/IconComponent";

const Footer = () => {
  let logo;
  const style = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    padding: "10px 70px 10px 10px",
  };

  const footerContent = {
    fontSize: "16px",
    fontWeight: 500,
    color: "#a3abb8",
    marginTop: "10px",
  };
  const footerHeaderContent = {
    fontSize: "18px",
    fontWeight: 700,
    color: "#ffffff",
  };

  return (
    <>
      <div className="px-10 xs:px-0 sm:px-0 py-2  bg-customDarkBgColor">
        <Row gutter={[5, 0]} style={{ marginLeft: 0, marginRight: 0 }}>
          <Col xs={24} sm={12} md={12} lg={6} className="gutter-row">
            <div style={style}>
              <Image src={logo} width={150} />
              <span style={footerContent}>
                We support programs that create advancement opportunities for
                people.
              </span>
              <div className="flex gap-2 my-3">
                <DynamicIcon iconName="FaFacebook" size={17} />
                <DynamicIcon iconName="FaGithub" size={17} />
                <DynamicIcon iconName="FaSquareInstagram" size={17} />
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} className="gutter-row">
            <div style={style}>
              <h3 style={footerHeaderContent}>Useful Links</h3>
              <ul>
                <li style={footerContent}>About Us</li>
                <li style={footerContent}>Privacy Policy</li>
                <li style={footerContent}>Terms & Condition</li>
                <li style={footerContent}>Student Spotlight</li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} className="gutter-row">
            <div style={style}>
              <h3 style={footerHeaderContent}>Learning</h3>
              <ul>
                <li style={footerContent}>Project Management</li>
                <li style={footerContent}>WordPress Development</li>
                <li style={footerContent}>Business Strategy</li>
                <li style={footerContent}>Software Development</li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} className="gutter-row">
            <div style={style}>
              <h3 style={footerHeaderContent}>Contact Us</h3>
              <ul>
                <li
                  style={footerContent}
                  className="flex justify-start items-start gap-2"
                >
                  <DynamicIcon
                    iconName="FaLocationDot"
                    color="#ff1f59"
                    size={28}
                  />
                  <li style={{ lineHeight: "25px" }}>
                    No. 11/2, KHR House, Palace Rd, Vasanth Nagar, Bengaluru,
                    Karnataka 560052
                  </li>
                </li>
                <li
                  style={{ ...footerContent, alignItems: "center" }}
                  className="flex justify-start  gap-2"
                >
                  <DynamicIcon
                    iconName="MdPhoneInTalk"
                    color="#ff1f59"
                    size={18}
                  />
                  <li>9100138472</li>
                </li>
                <li
                  style={{ ...footerContent, alignItems: "center" }}
                  className="flex justify-start  gap-2"
                >
                  <DynamicIcon iconName="IoMdMail" color="#ff1f59" size={18} />
                  <li>smartxtech@gmail.com</li>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <hr />
        <div className="flex justify-between max-sm:flex-col max-sm:justify-center  items-center">
          <span
            style={{
              ...footerContent,
              fontSize: "13px",
              margin: "5px 0px",
            }}
          >
            Designed & Developed by Mano & Sameer
          </span>
          <span
            style={{
              ...footerContent,
              fontSize: "13px",
              margin: "5px 0px",
            }}
          >
            © Copyright 2024 Smart-X All rights reserved.
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
