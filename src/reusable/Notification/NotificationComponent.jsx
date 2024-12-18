import { notification } from "antd";

// Function to trigger notifications based on the provided type and props
export const showNotification = ({
  type,
  message,
  description,
  duration = 4.5, // Default duration for notification
  placement = "topRight", // Default placement of notification
  onClose = () => {}, // Default onClose handler
  ...rest
}) => {
  // Trigger the notification with the specified type
  notification[type]({
    
    message,
    description,
    duration,
    placement,
    onClose,
    ...rest, // Spread any additional props like icon, style, etc.
  });
};
