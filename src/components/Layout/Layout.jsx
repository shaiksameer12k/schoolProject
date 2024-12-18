import React, { useEffect, useRef, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Router from "../../Router.jsx";
import { FloatButton } from "antd";
import DynamicIcon from "../../reusable/IconComponent/IconComponent.jsx";
import { Outlet } from "react-router-dom";
import InputField from "../../reusable/InputField/InputField.jsx";
import {
  centrliseFieldsValidation,
  centrliseFileFieldsValidation,
} from "../../utils/feildValidation.js";
import fieldsData from "../../data/formData.js";
import FormLayout from "../../reusable/FormLayout/FormLayout.jsx";
import { Content } from "antd/es/layout/layout.js";

const Layout = () => {
  const [scrollY, setScrollY] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      let scrollY = window.scrollY;
      setScrollY(scrollY);
      console.log("scrollY:", scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log("scrollY:", scrollY);

  let containerRef = useRef();

  return (
    <div className="w-full" ref={containerRef}>
      <Header scrollY={scrollY} />
      <div
        className=" px-3 py-2 "
        style={{
          background: "#FFFFFF",
          minHeight: "100vh",
          height: "auto",
          maxHeight: "auto",
        }}
      >
        <Outlet />
      </div>
      <Footer />

      <FloatButton
        icon={<DynamicIcon iconName="FaArrowUp" color="#ffffff" size={20} />}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "red",
          transform: scrollY > 200 ? "translateX(0%)" : "translateX(200%)",
          transition: "all .5s",
          zIndex: 1,
        }}
        onClick={scrollToTop}
      />
    </div>
  );
};
export default Layout;
