import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const FileUpload = ({ actionUrl, onUploadSuccess, onUploadError }) => {
  const props = {
    name: 'file',
    action: actionUrl,
    headers: {
      authorization: 'authorization-text', // Add your authorization if needed
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (onUploadSuccess) onUploadSuccess(info.file);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        if (onUploadError) onUploadError(info.file);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

// Default export for easy use in other parts of the app
export default FileUpload;
