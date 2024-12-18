import React from "react";
import { Row, Col, Card, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import PageNotFoundSVG from "../../assets/PageNotFound.svg";
import ButtonComponent from "../../reusable/Button/ButtonComponent";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="site-card-wrapper">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <Col xs={24} sm={18} md={12} lg={8}>
          <Card
            hoverable
            cover={
              <img
                alt="Page Not Found"
                src={PageNotFoundSVG}
                style={{ width: "100%", height: "auto" }}
              />
            }
          >
            <div style={{ textAlign: "center" }}>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                We can't find that page
              </h1>
              <p className="mt-4 text-gray-500">
                Sorry, the page you are looking for doesn't exist or has been
                moved.
              </p>
              <div className="mt-6 flex items-center space-x-3">
                <ButtonComponent
                  name={`Go To
                    ${location.pathname.includes("layout") ? "Home" : "Login"}
                    Page`}
                  size="large"
                  onClick={() =>
                    navigate(
                      location.pathname.includes("layout")
                        ? "/layout/dashboard"
                        : "/loginPage"
                    )
                  }
                  btnStyle={{ width: "100%", margin: 0 }}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NotFoundPage;
