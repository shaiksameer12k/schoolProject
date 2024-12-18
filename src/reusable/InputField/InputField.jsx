// import React from "react";
// import {
//   Button,
//   Checkbox,
//   DatePicker,
//   Form,
//   Input,
//   Radio,
//   Select,
//   Upload,
// } from "antd";

// import FileUpload from "../FileUpload/FileUpload";
// import { runes } from "runes2";
// const { RangePicker } = DatePicker;
// const InputField = ({ formItemProps, onChange, onSearch }) => {
//   const {
//     label,
//     name,
//     value,
//     type,
//     placeholder,
//     isMandatory,
//     idDisabled,
//     isFieldVisible,
//     style,
//     wrapperCol,
//     layout,
//     hasFeedback,
//     validateStatus,
//     isError,
//     options,
//     maxLength,
//     mode,
//   } = formItemProps;
//   if (name == "fullName")
//     console.log("updatedFields&", type, value.length, value, options, name);
//   return (
//     <Form.Item
//       label={type == "checkbox" || type == "radio" ? "" : label} // Dynamic label for the form item
//       name={name} // Unique identifier for the form item
//       required={isMandatory} // Whether the field is required
//       style={style} // Custom styling for the form item
//       wrapperCol={wrapperCol} // Layout configuration for content of the form itemsss
//       layout={layout} // virtecal horizontal
//       hasFeedback={hasFeedback} // true , false
//       validateStatus={
//         value.length > 0 || !value ? (isError.length === 0 ? "" : "error") : ""
//       } // 'success', 'warning', 'error', 'validating'.
//       help={isError} // message
//       hidden={!isFieldVisible}
//     >
//       {type == "checkbox" ? (
//         <Checkbox
//           name={name}
//           onChange={onChange}
//           checked={value}
//           disabled={idDisabled}
//         >
//           <span className="mandatory">*</span>
//           {label}
//         </Checkbox>
//       ) : type == "radio" ? (
//         <>
//           {/* <Radio.Group
//             block
//             options={options}
//             name={name}
//             onChange={onChange}
//             value={value}
//           /> */}
//           <Radio.Group name="radio-group" onChange={onChange} value={1}>
//             {options?.map((item) => (
//               <Radio value={item?.value} disabled={idDisabled}>
//                 {item?.label}
//               </Radio>
//             ))}
//           </Radio.Group>
//         </>
//       ) : type == "date" ? (
//         <DatePicker name={name} onChange={onChange} disabled={idDisabled} />
//       ) : type == "dateTime" ? (
//         <RangePicker name={name} onChange={onChange} disabled={idDisabled} />
//       ) : type == "file" ? (
//         <FileUpload />
//       ) : type == "select" ? (
//         <Select
//           mode={mode}
//           placeholder={`Select a ${label}`}
//           optionFilterProp="label"
//           onChange={onChange}
//           onSearch={onSearch}
//           options={options}
//           value={value}
//           name={name}
//           allowClear
//           disabled={idDisabled}
//         />
//       ) : (
//         <>
//           <Input
//             placeholder={placeholder}
//             value={formItemProps[name]}
//             type={type}
//             name={name}
//             style={style}
//             disabled={idDisabled}
//             allowClear
//             onChange={onChange}
//             count={{
//               show: maxLength,
//               max: maxLength,
//               strategy: (txt) => runes(txt).length,
//               exceedFormatter: (txt, { max }) =>
//                 runes(txt).slice(0, max).join(""),
//             }}
//           />
//         </>
//       )}
//     </Form.Item>
//   );
// };

// export default InputField;

import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
} from "antd";
import FileUpload from "../FileUpload/FileUpload";
import { runes } from "runes2";
const { RangePicker } = DatePicker;

// The main InputField component where props are directly destructured
const InputField = ({
  label,
  id = "",
  name,
  value = null,
  type,

  placeholder,
  isMandatory,
  idDisabled,
  isFieldVisible,
  style,
  wrapperCol,
  layout,
  hasFeedback,
  validateStatus,
  isError,
  options,
  maxLength,
  mode,
  onChange,
  onSearch,
  prefix,
  suffix,
  variant = "outlined",
  size = "middle",
}) => {
  // console.log("select", name, value.length);
  // Handle different field types dynamically
  const renderField = () => {
    switch (type) {
      case "checkbox":
        return (
          <Checkbox
            name={name}
            onChange={onChange}
            checked={value}
            disabled={idDisabled}
          >
            {isMandatory && <span className="mandatory">*</span>}
            {label}
          </Checkbox>
        );
      case "radio":
        return (
          <Radio.Group
            name={name}
            onChange={onChange}
            value={value}
            disabled={idDisabled}
          >
            {options?.map((item) => (
              <Radio
                key={item?.value}
                value={item?.value}
                disabled={idDisabled}
              >
                {item?.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case "date":
        return (
          <DatePicker
            name={name}
            onChange={onChange}
            value={value}
            disabled={idDisabled}
            style={style}
          />
        );
      case "dateTime":
        return (
          <RangePicker
            name={name}
            value={value}
            onChange={onChange}
            disabled={idDisabled}
            style={style}
          />
        );
      case "file":
        return <FileUpload />;
      case "select":
        return (
          <>
            <Select
              mode={mode}
              placeholder={placeholder ? placeholder : `Select a ${label}`}
              showSearch
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={options}
              value={value}
              name={name}
              allowClear
              disabled={idDisabled}
              size={size}
              style={{ width: "100%" }}
            />
          </>
        );
      default:
        return (
          <Input
            placeholder={placeholder ? placeholder : `Select a ${label}`}
            value={value}
            type={type}
            name={name}
            style={style}
            disabled={idDisabled}
            allowClear
            onChange={onChange}
            maxLength={maxLength}
            count={{
              show: maxLength,
              max: maxLength,
              strategy: (txt) => runes(txt).length,
              exceedFormatter: (txt, { max }) =>
                runes(txt).slice(0, max).join(""),
            }}
            prefix={prefix}
            suffix={suffix}
            id={id}
            variant={variant}
            size={size}
          />
        );
    }
  };

  useEffect(() => {
    console.log("InputField rendered with value:", name, value); // Log value on render
  }, [value]); // Re-render when value changes
  // Form item rendering with dynamic field and validation
  return (
    <Form.Item
      label={type === "checkbox" || type === "radio" ? "" : label}
      key={name}
      name={name}
      placeholder={placeholder}
      required={isMandatory}
      style={style}
      wrapperCol={wrapperCol}
      layout={layout}
      hasFeedback={hasFeedback}
      validateStatus={
        value?.length > 0 || !value ? (isError.length === 0 ? "" : "error") : ""
      }
      help={isError}
      hidden={!isFieldVisible}
    >
      {renderField()}
    </Form.Item>
  );
};

export default InputField;
