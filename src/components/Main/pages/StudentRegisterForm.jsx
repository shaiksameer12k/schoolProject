import React, { useEffect, useState } from "react";
import FormLayout from "../../../reusable/FormLayout/FormLayout";

import { registerFormData } from "../../../data/formData";

const StudentRegisterForm = () => {
  let buttonsArr = [
    {
      name: "Back",
      type: "primary", // A default button type for "Back"
      size: "small", // Set the button size to "small"
      onClick: () => {
        console.log("Back button clicked");
      }, // Action when clicked
      disabled: false, // Not disabled
      loading: false, // Not loading

      btnStyle: { borderRadius: "4px", padding: "6px 12px" }, // Additional button style
    },
    {
      name: "Submit",
      type: "primary", // Primary button for "Submit"
      size: "small", // Set the button size to "small"
      onClick: () => {}, // Action when clicked
      disabled: false, // Not disabled
      loading: false, // Not loading

      btnStyle: { borderRadius: "4px", padding: "6px 12px" }, // Additional button style
    },
    {
      name: "Reset",
      type: "primary", // Default button for "Reset"
      size: "small", // Set the button size to "small"
      onClick: () => {
        console.log("Reset button clicked");
      }, // Action when clicked
      disabled: false, // Not disabled
      loading: false, // Not loading

      btnStyle: { borderRadius: "4px", padding: "6px 12px" }, // Additional button style
    },
  ];

  console.log("registerFormData$", registerFormData);
  return (
    <div className="p-5 h-full bg-customlightGrayBgColor">
      <FormLayout fieldsData={registerFormData} buttonsArr={buttonsArr} />
    </div>
  );
};

export default StudentRegisterForm;
