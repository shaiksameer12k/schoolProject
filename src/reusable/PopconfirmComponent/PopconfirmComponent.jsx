import React from "react";
import { Button, Popconfirm, message } from "antd";

// Reusable Popconfirm component
const PopconfirmComponent = ({
  title = "Are you sure?", // Default title
  description = "Are you sure you want to proceed?", // Default description
  onConfirm, // Function to be called when the user confirms
  onCancel, // Function to be called when the user cancels
  okText = "Yes", // Text for the confirm button
  cancelText = "No", // Text for the cancel button
  placement = "topRight",
  content,
  ...rest // Any other props you may want to pass to the Popconfirm or button
}) => {
  // Default confirm and cancel actions if none are provided
  const defaultConfirm = () => {
    message.success("Action confirmed");
  };

  const defaultCancel = () => {
    message.error("Action canceled");
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={onConfirm || defaultConfirm}
      onCancel={onCancel || defaultCancel}
      okText={okText}
      cancelText={cancelText}
      placement={placement}
      
      {...rest} // Pass any other props to Popconfirm
    >
      {content}
    </Popconfirm>
  );
};

export default PopconfirmComponent;
