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

  // new test code
  const [fields, setFields] = useState(fieldsData);
  const handleChange = async (e, fieldsArray, regexType, maxLength) => {
    const { name, value, type, checked } = e.target;
    console.log("updatedFields", name, value, type, checked,fieldsArray,regexType,maxLength);
    // Centrlise Fields Validation
    let updatedFields;
    updatedFields =
      type !== "file"
        ? centrliseFieldsValidation(
            type,
            name,
            value,
            checked,
            fieldsArray,
            regexType,
            maxLength
          )
        : await centrliseFileFieldsValidation(
            type,
            name,
            value,
            checked,
            fieldsArray,
            regexType,
            maxLength
          );
    console.log("updatedFields", updatedFields);
    return setFields(updatedFields);
  };
  console.log("fieldsData", fields);
  return (
    <div className="w-full" ref={containerRef}>
      <Header scrollY={scrollY} />
      <div className="min-h-lvh">
        {fields.map((field) => (
          <InputField
            onChange={(e) =>
              handleChange(e, fields, field.regexType, field.maxLength)
            }
            formItemProps={field}
          />
        ))}
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
