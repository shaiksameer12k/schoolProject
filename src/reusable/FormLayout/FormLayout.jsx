import React, { useEffect, useState } from "react";
import { Row, Col, Form, message, Button } from "antd";
import InputField from "../InputField/InputField";
import ButtonComponent from "../Button/ButtonComponent";
import {
  centrliseFieldsValidation,
  centrliseFileFieldsValidation,
  submitFunctionRegexValidationCheck,
} from "../../utils/feildValidation";

const FormLayout = ({ fieldsData = [], buttonsArr }) => {
  const [fields, setFields] = useState(fieldsData);
  const [buttonsData, setButtonsData] = useState(buttonsArr);
  const [form] = Form.useForm();
  const handleChange = async (e, fieldsArray, regexType, maxLength) => {
    const { name, value, type, checked } = e.target;
    console.log(
      "updatedFields**",
      name,
      value,
      type,
      checked,
      fieldsArray,
      regexType,
      maxLength
    );
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

    if (name === "firstName" || name === "middleName" || name === "lastName") {
      console.log("full Name", name, value);
      const { firstName, middleName, lastName } = updatedFields.reduce(
        (acc, field) => {
          if (field.name === "firstName") acc.firstName = field.value;
          if (field.name === "middleName") acc.middleName = field.value;
          if (field.name === "lastName") acc.lastName = field.value;
          console.log(acc);
          return acc;
        },
        {}
      );

      const fullName = `${firstName ? firstName + " " : ""}${
        middleName ? middleName + " " : ""
      }${lastName ? lastName : ""}`;

      let updateFullName = updatedFields.map((field) =>
        field.name === "fullName" ? { ...field, value: fullName } : field
      );
      console.log("updateFullName", updateFullName);
      return setFields(updateFullName);
    }
    console.log("updatedFields", updatedFields);

    setFields(updatedFields);
    form.setFieldsValue({ [name]: value });
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("checkFeildsState", fields);
    // checking all the mandatory fields and regex validations
    let checkFeildsState = fields.map((field) => {
      return field.isMandatory || field.regexType
        ? {
            ...field,
            isError: submitFunctionRegexValidationCheck(
              field.type,
              field.name,
              field.value,
              field.label,
              field.regexType,
              field.isMandatory
            ),
          }
        : field;
    });

    let checkFeildsValues = checkFeildsState.every((field) =>
      field.isMandatory ? field.isError.length == 0 : true
    );

    console.log(
      "checkFeildsState",
      checkFeildsState,
      checkFeildsValues,
      fields
    );
    setFields(checkFeildsState);

    if (checkFeildsValues) {
      return message.success("Succesfully Submited");
    } else {
      return message.error("Please Fill the Mandatory Fields");
    }
  };

  useState(() => {
    let updateBtnArr = buttonsArr.map((btn) =>
      btn.name === "Submit" ? { ...btn, onClickHandel: handleSubmit } : btn
    );
    console.log("before$", fieldsData);
    setFields(fieldsData);
    console.log("after$", fieldsData);
    setButtonsData(updateBtnArr);
  }, []);

  console.log("buttonsArr$", buttonsArr, fieldsData, fields, buttonsArr);

  console.log("checkFeildsState$", fields, form);
  useEffect(() => {
    // Initialize form values
    const initialValues = fields.reduce((acc, field) => {
      acc[field.name] = field.value || null;
      return acc;
    }, {});
    console.log("initialValues", initialValues);
    form.setFieldsValue(initialValues);
  }, [fields, form]);

  return (
    <>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          {fields?.map((field) => (
            <Col key={field.name} xs={24} sm={12} md={8} lg={6}>
              <InputField
                key={field.name}
                onChange={(e) =>
                  handleChange(
                    e,
                    fields,
                    field.regexType,
                    field.maxLength,
                    field
                  )
                }
                {...field}
              />
            </Col>
          ))}
        </Row>
        <div className="flex justify-center gap-3">
          {/* {buttonsData.map((button) => (
            <ButtonComponent
              key={button.name}
              onClick={button?.onClickHandel}
              name={button?.name}
              type={button?.type}
              size={button?.size}

              // {...button}
            />
          ))} */}
          <ButtonComponent
            onClick={handleSubmit}
            name="Register"
            type="primary"
            size="medium"
          />
        </div>
      </Form>
    </>
  );
};

export default FormLayout;
