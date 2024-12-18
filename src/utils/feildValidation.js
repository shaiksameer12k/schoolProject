import { useState } from "react";

import imageCompression from "browser-image-compression";
import { message } from "antd";
// common field validation
export const fieldValidate = (value, type) => {
  console.log("fieldValidate", value, type);
  let updateValue = "";
  if (type === "text") {
    // Remove extra spaces, dots, and commas and trim the input value
    updateValue = value.replace(/[,.'"]{1,}/g, "").trimStart();
  } else {
    // Remove extra spaces,  and trim the input value
    updateValue = value.replace(/['"]{1,}/g, "").trimStart();
  }

  updateValue = updateValue.replace(/^[^\w]+/, "");
  return updateValue;
};

// remarks , comment field validation
export function commentsFieldValidate(comments) {
  // should not allow multiple given charters
  comments = comments.replace(/([.,'!?|"/\\_-]){2,}/g, "$1");

  // SHOULD NOT ALLOW  ($#&)
  // comments = comments.replace(/([$#&^]){1,}/g, "");
  comments = comments.replace(/[^\w\s!,.()-_]+/g, "");

  // should not allow multiple white spaces
  comments = comments.replace(/\s\s\s+/g, " ");

  // starting of sentence don't allow special charters
  comments = comments.replace(/^[^\w]+/, "");

  return comments;
}

// address field validation
export function addressFieldValidate(address) {
  // Allow letters, numbers, spaces, and common punctuation
  address = address.replace(/[^a-zA-Z0-9\s.,'&\/#-]/g, "");

  // Collapse multiple spaces into a single space
  address = address.replace(/\s\s+/g, " ");

  return address;
}

// regex codes
const regexCode = {
  contactNumber: /^[0-9]{10}$/,
  email: /^[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}$/,
  panNumber: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  passportNumber: /^[A-Z0-9]{8,9}$/,
  aadharNumber: /^[0-9]{12}$/,
  pfUanNumber: "",
  pinCode: /^[0-9]{6}$/,
  onlyText: /[a-zA-Z]$/,
  textWithSpaces: /[a-zA-Z/s]$/,
  onlyNumber: /[0-9]$/,
  amount: /^\d{1,3}(,\d{3})*(\.\d{2})?$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$/,

  // allowAll: /^[a-zA-Z0-9!@#$%^&*+\\-?]+$/,
  allowAll: /[\\a-zA-Z0-9!@#$%^&*+-\\?]$/,

  route: /[\\a-zA-Z0-9!@#$%^&*?]$/,
};

// regex field onchange validations
export function regexValidationCheck(name, value, data, regexType = "") {
  console.log("regexValidationCheckedArray", data, regexType);
  let regex = regexCode[regexType];
  console.log(regex);
  if (regex) {
    let updatedValue =
      name === "panNumber" || name === "passportNumber"
        ? value.toUpperCase()
        : value;

    let testRegex = regex.test(updatedValue);

    let checkRegexValidation = data?.map((field) =>
      field.name === name
        ? {
            ...field,
            isError:
              !testRegex && field.isMandatory
                ? `Please ${value.length > 0 ? "Enter Valid" : "Fill the"} ${
                    field.label
                  }`
                : "",
            value: updatedValue,
          }
        : field
    );
    return checkRegexValidation;
  } else {
    let checkMandatoryDropdowns = data?.map((field) =>
      field.name === name
        ? {
            ...field,
            isError:
              value.length == 0 ? `Please Select the ${field.label}` : "",
            value: value,
          }
        : field
    );
    return checkMandatoryDropdowns;
  }
}

// regex submit validations
export function submitFunctionRegexValidationCheck(
  type,
  name,
  value,
  label,
  regexType,
  isMandatory
) {
  let regex = regexCode[regexType];
  let error = "";
  if ((!value || value.length <= 0) && isMandatory) {
    error = `Please ${
      type === "checkbox" || type === "dropdown" ? "Select" : "Fill"
    } the ${type === "checkbox" ? "Checkbox" : label}`;
    return error;
  }
  if (regex && isMandatory) {
    let testRegex = regex.test(
      name === "panNumber" ? value.toUpperCase() : value
    );

    error = !testRegex ? `Please Enter Valid ${label}` : "";

    return error;
  }
  return error;
}

// calculate Age
export function calculateAge(name, value, data) {
  let currentDate = new Date();
  const birthYear = new Date(value).getFullYear();
  const birthMonth = new Date(value).getMonth();
  const birthDay = new Date(value).getDate();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  let age = currentYear - birthYear;
  let months = currentMonth - birthMonth;
  let days = currentDay - birthDay;

  if (months < 0 || (months === 0 && days < 0)) {
    age--;
    months = 12 + currentMonth - birthMonth;
  }

  if (days < 0) {
    const lastMonth = new Date(currentYear, currentMonth - 1, 0);
    days = lastMonth.getDate() + days;
  }

  let updateAgeField = data.map((field) =>
    field.name === "double_age" && name === "date_dob"
      ? {
          ...field,
          value: age,
          isError:
            age < field.minAmount ? `Age Should be > ${field.minAmount}` : "",
        }
      : field
  );

  return updateAgeField;
}

// check object isEmpty or Not
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export function checkFieldMaxLimit(
  name,
  regexValidationCheckedArray,
  maxLength = 100
) {
  console.log("regexValidationCheckedArray", regexValidationCheckedArray);

  let updatedArray = regexValidationCheckedArray.map((field) =>
    field.name === name
      ? {
          ...field,
          value: String(field?.value)?.slice(0, maxLength + 1),
          isError:
            field?.isError.length === 0
              ? field.value.length > maxLength
                ? `Max character ${maxLength}`
                : ""
              : field.isError,
        }
      : field
  );
  return updatedArray;
}

export function checkMaxAndMinAmount(name, regexValidationCheckedArray, value) {
  let changedValue = value.replace(/,/g, "");
  console.log("changedValue", changedValue > 0, regexValidationCheckedArray);
  let updatedArray = regexValidationCheckedArray.map((field) =>
    field.name === name
      ? {
          ...field,
          isError:
            field.isError.length === 0
              ? Number(changedValue) < Number(field.minAmount)
                ? `Min Amount should be > ${field.minAmount}`
                : Number(changedValue) < Number(field.maxAmount)
                ? `Max Amount should be > ${field.maxAmount}`
                : ""
              : field.isError,
        }
      : field
  );
  return updatedArray;
}
//  take a string and convert to funciton
export function stringToFunction(arrayOfData) {
  let updatedArray = arrayOfData.map((field) => {
    field.extraValidations = field.extraValidations?.map((validation) => {
      console.log("validation.validationsMethod", validation.validationsMethod);
      let fun;
      fun = new Function(`return ${validation.validationsMethod}`)();
      return {
        ...validation,
        validationsMethod: fun,
      };
    });
    return field;
  });
  console.log("updatedArray", updatedArray);
  return updatedArray;
}
// take file and return base64 and file name

export const fileToBase64 = async (
  imageFile,
  fieldName,
  fileTypeArray = ["jpg", "jpeg", "png", "zip", "pdf", "svg"],
  fileSize = 2
) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  const fileType = imageFile.name.split(".").pop().toLowerCase();
  const file =
    fileType === "jpg" ||
    fileType === "svg" ||
    fileType === "jpeg" ||
    fileType === "png"
      ? await imageCompression(imageFile, options)
      : imageFile;

  console.log(`originalFile size** ${imageFile.size / 1024 / 1024} MB`);
  console.log(`compressedFile size** ${file.size / 1024 / 1024} MB`);

  return new Promise((resolve, reject) => {
    const allowedTypes =
      fieldName === "employeProfile"
        ? ["jpg", "jpeg", "png", "svg"]
        : fileTypeArray;

    const maxSize = fileSize * 1024 * 1024; // 2MB

    if (!file) {
      message.error("No file selected");
      // reject(new Error("No file selected"));
      return;
    }
    // Check file size
    if (file.size > maxSize) {
      message.error(`File size exceeds the allowed limit of ${fileSize}MB`);
      // reject(new Error("File size exceeds the allowed limit of 2MB"));
      return;
    }
    const fileType = file.name.split(".").pop().toLowerCase();

    if (!allowedTypes.includes(fileType)) {
      message.error(
        fieldName === "employeProfile"
          ? "Invalid File Type! File Formats Allowed: jpg, jpeg, png,svg"
          : `Invalid File Type! File Formats Allowed: ${JSON.stringify(
              fileTypeArray
            )}`
      );
      // reject(new Error("Invalid File Type!"));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      // Extract Base64 data from Data URL
      const base64Data = e.target.result.split(",")[1];
      console.log("base64Data", base64Data);

      resolve({
        base64: base64Data,
        base64FileName: file.name,
        base64FileSize: file.size,
        base64Id: Math.floor(Math.random() * 100) + 1,
      });
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

// Centrlise Fields Validation
export async function centrliseFileFieldsValidation(
  type,
  name,
  value,
  checked,
  feildsArray,
  regexType,
  maxLength,
  event,
  fileTypeArray = ["jpg", "jpeg", "png", "zip", "pdf", "svg"],
  fileSize = 2,
  fileUploadType = "single"
) {
  if (type === "file") {
    let data = [];
    if (fileUploadType == "multiple") {
      [...event.target.files].map(async (file, i) => {
        let fileData = await fileToBase64(file, name, fileTypeArray, fileSize);
        data = [...data, fileData];
        console.log("fileData", i, fileData);
      });
    }
    let fileData = await fileToBase64(
      event.target.files[0],
      name,
      fileTypeArray,
      fileSize
    );

    let updatedArray = feildsArray.map((field) =>
      field.name === name
        ? {
            ...field,
            value: fileUploadType == "multiple" ? "" : fileData.base64FileName,

            base64FileName:
              fileUploadType == "multiple" ? "" : fileData.base64FileName,

            base64: fileUploadType == "multiple" ? "" : fileData.base64,

            data: data,
          }
        : field
    );

    return updatedArray;
  }
}
export function centrliseFieldsValidation(
  type,
  name,
  value,
  checked,
  feildsArray,
  regexType,
  maxLength,
  event
) {
  if (type === "checkbox") {
    let updatedArray = feildsArray.map((field) =>
      field.name === name
        ? {
            ...field,

            value: checked,
            isError: field.isMandatory
              ? !checked
                ? `Please Select the Checkbox`
                : ""
              : "",
          }
        : field
    );
    return updatedArray;
  }
  if (
    type === "radio" ||
    type === "time" ||
    type === "datetime-local" ||
    type === "date"
  ) {
    let updatedArray = feildsArray.map((field) =>
      field.name === name
        ? {
            ...field,
            value: value,
            isError: field.isMandatory
              ? !value
                ? `Please Select ${name}`
                : ""
              : "",
          }
        : field
    );
    return updatedArray;
  }

  if (name === "dropdown") {
    let updatedArray = feildsArray.map((field) =>
      field.name === name
        ? {
            ...field,
            value: field.option,
          }
        : field
    );
    return updatedArray;
  }

  // below methods will take value and update and return value
  let commonRegexValidateValue =
    regexType === "address"
      ? addressFieldValidate(value)
      : regexType === "comment"
      ? commentsFieldValidate(value)
      : regexType === "amount" ||
        regexType === "route" ||
        regexType === "onlyNumber"
      ? value
      : fieldValidate(value, type);

  let regexValidationCheckedArray = regexValidationCheck(
    name,
    commonRegexValidateValue,
    feildsArray,
    regexType
  );
  console.log("centrliseFieldsValidation**", regexValidationCheckedArray);

  let checkFieldMaxLimitCheckedArray = regexValidationCheckedArray;

  if (type !== "dropdown") {
    checkFieldMaxLimitCheckedArray = checkFieldMaxLimit(
      name,
      regexValidationCheckedArray,
      Number(maxLength)
    );
  }

  if (regexType === "amount") {
    checkFieldMaxLimitCheckedArray = checkMaxAndMinAmount(
      name,
      regexValidationCheckedArray,
      commonRegexValidateValue
    );
  }

  let updatedFields = checkFieldMaxLimitCheckedArray?.map((field) => {
    if (field.name === name) {
      if (field.extraValidations) {
        field.extraValidations.some((innerfield, i) => {
          if (innerfield.isThisValidationApply) {
            innerfield.validationsMethod.bind(field, [
              Number(commonRegexValidateValue),
            ])();
          }
          if (field.isError.length > 0) {
            return true;
          }
        });
      }
      return {
        ...field,
        value: field.value,
      };
    }

    return field;
  });

  console.log("centrliseFieldsValidation****", updatedFields);

  return updatedFields;
}
