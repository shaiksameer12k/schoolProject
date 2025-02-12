import React, { useEffect, useState } from "react";
import { Row, Col, Form, message, Button } from "antd";
import InputField from "../InputField/InputField";
import ButtonComponent from "../Button/ButtonComponent";

const FormLayout = ({
  fieldsData = [],
  handleChange,
  handleSubmit,
  removeSelectedFile,
  isButtonRequired = true,
  
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Initialize form values
    const initialValues = fieldsData.reduce((acc, field) => {
      acc[field.name] = field.value || null;
      return acc;
    }, {});
    form.setFieldsValue(initialValues);
  }, [fieldsData, form]);

  return (
    <>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          {fieldsData?.map((field) => (
            <Col
              key={field.name}
              xs={24}
              sm={12}
              md={8}
              lg={field?.columnSpace}
            >
              <InputField
                key={field.name}
                onChange={(e) =>
                  handleChange(
                    e,
                    fieldsData,
                    field.regexType,
                    field.maxLength,
                    field
                  )
                }
                field={field}
                fields={fieldsData}
                removeSelectedFileHandel={removeSelectedFile}
                {...field}
              />
            </Col>
          ))}
        </Row>

        {isButtonRequired && (
          <div className="flex justify-center gap-3">
            <ButtonComponent
              onClick={handleSubmit}
              name="Register"
              type="primary"
              size="medium"
            />
          </div>
        )}
        
      </Form>
    </>
  );
};

export default FormLayout;
