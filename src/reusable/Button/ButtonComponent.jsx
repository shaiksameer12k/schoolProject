import React from "react";
import { Button } from "antd"; // Import Button from Ant Design
import DynamicIcon from "../IconComponent/IconComponent";

const ButtonComponent = ({
  name = "dummy",
  type = "primary",
  size = "small",
  onClick = () => {},
  disabled = false,
  loading = false,
  icon = "",
  iconPosition = "start",
  bgColor = "#FF8383",
  textColor = "#ffffff",
  btnStyle, // btnStyle extra button style if requred
}) => {
  return (
    <Button
      type={type} // Button style (e.g., primary, default, etc.)
      size={size} // Button size (e.g., small, middle, large)
      onClick={onClick} // Button click handler
      disabled={disabled} // Disable the button if true
      loading={loading} // Show a loading spinner if true
      icon={icon && <DynamicIcon iconName={icon} color="#fffff" size={15} />}
      iconPosition={iconPosition} // iconPosition (e.g., start, end)
      style={{
        background: bgColor,
        color: textColor,
        padding: "2px 10px",
        ...btnStyle,
      }}
      htmlType="button"
    >
      {name} {/* Button content (text or icon) */}
    </Button>
  );
};

export default ButtonComponent;
