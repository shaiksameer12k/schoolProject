import { Skeleton } from "antd";
import React from "react";

const BasicSkeleton = (props) => {
  return <Skeleton {...props} />;
};

export default BasicSkeleton;

/*
      loading={true} // Boolean: Whether the skeleton should be shown (true for loading state).
      avatar={false} // Boolean or Object: Whether to show an avatar (use true to show default avatar or an object for customization).
      paragraph={true} // Boolean or Object: Whether to show a paragraph skeleton (use true for default or an object for more customization).
      title={true} // Boolean: Whether to show a title skeleton (true to show a default title skeleton).
      active={false} // Boolean: Whether the skeleton should have an animation (e.g., a "shimmering" effect).
      size="default" // String: Size of the skeleton (can be "default", "large", or "small").
      className="custom-class" // String: Additional CSS class for custom styling.
      style={{}} // Object: Inline styles to customize the skeleton.
      paragraph={{
        rows: 3, // Number of rows for the paragraph skeleton (if it's an object, you can define this).
        width: '80%', // Width of each row in the paragraph skeleton.
      }}
      title={{
        width: '30%', // Width of the title skeleton.
      }}
      avatar={{
        size: 'large', // Size of the avatar (can be "small", "default", or "large").
        shape: 'circle', // Shape of the avatar (can be "circle" or "square").
      }}
 */
