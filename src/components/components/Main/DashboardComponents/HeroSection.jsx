import React, { useEffect, useRef, useState } from "react";
import "../../../styles/HeroSection.css";
import { Col, Image, Row } from "antd";
import Search from "antd/es/input/Search";
import DynamicIcon from "../../../reusable/IconComponent/IconComponent";
const HeroSection = () => {
  let heroSectionRef = useRef();
  const [mouseAxis, setMouseAxis] = useState({ x: "", y: "" });

  // Effect to handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseAxis({
        x: (event.clientX * -0.3) / 8,
        y: (event.clientY * -0.3) / 8,
      });
    };
    const currentRef = heroSectionRef.current;

    // Check if the ref is defined and attach the event listener
    if (currentRef) {
      currentRef.addEventListener("mousemove", handleMouseMove);
    }

    // Cleanup the event listener on unmount
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);
  const onSearch = (value) => {
    console.log("Hello", value);
  };
  return (
    <section
      id="hero_section"
      ref={heroSectionRef}
      className="p-0 max-sm:pt-10 px-10 max-sm:px-4"
      style={{ background: "#F5F3F6" }}
    >
      <div className="h-full">
        <Row>
          <Col
            sm={24}
            md={12}
            lg={11}
            className="flex flex-col justify-center gap-2"
          >
            <h2 id="hero_section_title">
              Build Skills with Online Courses from expert instructor
            </h2>
            <p className="hero_section_content">
              Start streaming on-demand video lectures today from top level
              instructors Attention heatmaps.
            </p>
            <div className="w-2/3 max-sm:w-full my-3">
              <Search
                placeholder="What Do You Want To Learn?"
                onSearch={onSearch}
                enterButton
                size="large"
                className="custom-search"
              />
            </div>
            <div className="flex  gap-10 text-sm">
              <span className="flex gap-2 ">
                <DynamicIcon iconName="FaCheckCircle" color="#a3c07c" /> Get
                Certified{" "}
              </span>
              <span className="flex gap-2">
                <DynamicIcon iconName="FaCheckCircle" color="#a3c07c" /> Gain
                Job-ready Skills{" "}
              </span>
            </div>
          </Col>
          <Col
            sm={24}
            md={12}
            lg={13}
            className="flex items-center py-10"
            id="hero_image_container"
          >
            <div className="hero_image">
              <Image
                src="https://raistheme.com/html/gostudy/gostudy/assets/images/hero-img.png"
                preview={false}
              />
            </div>
            <div
              className="shape-1 "
              style={{
                transform: `translate(${mouseAxis?.x}px , ${mouseAxis?.y}px)`,
              }}
            >
              <Image
                src="https://raistheme.com/html/gostudy/gostudy/assets/images/shape/shape-2.png"
                preview={false}
              />
            </div>
            <div
              className="shape-2 "
              style={{
                transform: `translate(${mouseAxis?.x}px , ${mouseAxis?.y}px)`,
              }}
            >
              <Image
                src="https://raistheme.com/html/gostudy/gostudy/assets/images/shape/shape-1.png"
                preview={false}
              />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default HeroSection;
