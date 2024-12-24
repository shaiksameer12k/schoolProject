import React, { useState } from "react";
import { Button, Modal } from "antd";

// Define a ModalComponent that takes all the modal props as individual props
const ModalComponent = ({
  isModalOpen,
  handleOk,
  handleCancel,
  title,
  content,
  okText,
  cancelText,
  okButtonProps,
  cancelButtonProps,
  ...rest
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      {...rest} // Spread the rest of the props for additional customization
      
    >
      {content}
    </Modal>
  );
};

export default ModalComponent;
