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
//     isDisabled,
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
//           disabled={isDisabled}
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
//               <Radio value={item?.value} disabled={isDisabled}>
//                 {item?.label}
//               </Radio>
//             ))}
//           </Radio.Group>
//         </>
//       ) : type == "date" ? (
//         <DatePicker name={name} onChange={onChange} disabled={isDisabled} />
//       ) : type == "dateTime" ? (
//         <RangePicker name={name} onChange={onChange} disabled={isDisabled} />
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
//           disabled={isDisabled}
//         />
//       ) : (
//         <>
//           <Input
//             placeholder={placeholder}
//             value={formItemProps[name]}
//             type={type}
//             name={name}
//             style={style}
//             disabled={isDisabled}
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
import { CustomTooltip } from "../CustomToolTip/CustomToolTip";
import DynamicIcon from "../IconComponent/IconComponent";
import moment from "moment";
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
  isDisabled,
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
  regexType,
  variant = "outlined",
  size = "middle",
  fields = [],
  field = {},
  data = [],
  removeSelectedFileHandel,
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
            disabled={isDisabled}
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
            disabled={isDisabled}
          >
            {options?.map((item) => (
              <Radio
                key={item?.value}
                value={item?.value}
                disabled={isDisabled}
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
            onChange={(value) => {
              console.log(value);
              return onChange(
                {
                  target: {
                    name: name, // the name of the input field
                    value: value, // the new value after change
                    type: type, // the type of the input (e.g., 'text', 'checkbox')
                  },
                },

                fields,
                regexType,
                maxLength,
                field
              );
            }}
            value={value ? moment(value) : ""}
            disabled={isDisabled}
            style={style}
            placeholder={placeholder}
          />
        );
      case "dateTime":
        return (
          <RangePicker
            name={name}
            value={value}
            // onChange={onChange}
            onChange={(value) => {
              console.log(value);
              return onChange(
                {
                  target: {
                    name: name, // the name of the input field
                    value: value, // the new value after change
                    type: type, // the type of the input (e.g., 'text', 'checkbox')
                  },
                },

                fields,
                regexType,
                maxLength,
                field
              );
            }}
            disabled={isDisabled}
            style={style}
          />
        );
      case "file":
        return (
          <>
            <div className="mt-1">
              {data?.length > 0 || value?.length > 0 ? (
                data?.length > 0 ? (
                  <div className="flex gap-2">
                    {data?.map((file) => (
                      <div className="flex">
                        <span className="text-linkColor text-xs">
                          {file?.base64FileName}
                        </span>
                        <CustomTooltip
                          tooltipTitle="Click To Remove Selected File"
                          tooltipPlacement="bottom-start"
                        >
                          <div className="cursor-pointer">
                            <DynamicIcon
                              iconName="IoIosCloseCircle"
                              color="#B43F3F"
                              onClickHandel={() =>
                                removeSelectedFileHandel(
                                  name,
                                  field?.multiple,
                                  file?.base64Id
                                )
                              }
                            />
                          </div>
                        </CustomTooltip>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex">
                    <span className="text-linkColor text-xs">{value}</span>
                    <CustomTooltip
                      tooltipTitle="Click To Remove Selected File"
                      tooltipPlacement="bottom-start"
                    >
                      <div className="cursor-pointer">
                        <DynamicIcon
                          iconName="IoIosCloseCircle"
                          color="#B43F3F"
                          onClickHandel={() =>
                            removeSelectedFileHandel(name, field?.multiple)
                          }
                        />
                      </div>
                    </CustomTooltip>
                  </div>
                )
              ) : (
                <>
                  <div className="border-gray-300 h-8 rounded-sm w-full border flex items-center px-2">
                    <input
                      style={{ ...style, width: "100%" }}
                      type={type}
                      placeholder={placeholder}
                      name={name}
                      onChange={onChange}
                      value={value}
                      multiple={field?.multiple}
                    ></input>
                  </div>
                </>
              )}
            </div>
          </>
        );
      case "select":
        return (
          <>
            <Select
              mode={mode}
              placeholder={placeholder ? placeholder : `Select a ${label}`}
              showSearch
              optionFilterProp="label"
              onChange={(value) =>
                onChange(
                  {
                    target: {
                      name: name, // the name of the input field
                      value: value, // the new value after change
                      type: type, // the type of the input (e.g., 'text', 'checkbox')
                    },
                  },

                  fields,
                  regexType,
                  maxLength,
                  field
                )
              }
              onSearch={onSearch}
              options={options}
              value={!value ? null : value}
              name={name}
              allowClear
              disabled={isDisabled}
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
            disabled={isDisabled}
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
      // name={name}
      placeholder={placeholder}
      required={isMandatory}
      style={style}
      wrapperCol={wrapperCol}
      layout={layout}
      hasFeedback={hasFeedback}
      validateStatus={
        value?.length > 0 || !value ? (isError?.length === 0 ? "" : "error") : ""
      }
      help={isError}
      hidden={!isFieldVisible}
    >
      {renderField()}
    </Form.Item>
  );
};

export default InputField;
