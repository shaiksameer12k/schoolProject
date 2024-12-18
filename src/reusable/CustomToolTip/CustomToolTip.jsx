import { Tooltip } from "antd";

export const CustomTooltip = ({
  title = "Dummy Tooltip",
  placement = "topRight",
  trigger = "hover",
  children,
}) => {
  return (
    <Tooltip title={title} placement={placement} trigger={trigger}>
      {children}
    </Tooltip>
  );
};
