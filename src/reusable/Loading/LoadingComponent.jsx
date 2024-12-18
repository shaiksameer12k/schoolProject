import React, { useEffect, useState } from "react";
import { Spin } from "antd";

// Reusable Spinner Loader Component
const LoaderComponent = ({
  spinnerType,
  showPercent = false,
  loading = false,
  fullscreen = false,
}) => {
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = fullscreen && loading ? "hidden" : "auto";

      setSpinning(true); // Start spinner when loading is true
      let ptg = -10; // Initialize the percentage
      const interval = setInterval(() => {
        ptg += 5; // Increment percentage
        setPercent(ptg); // Update the percentage in the state
        if (ptg > 120) {
          // Stop spinner when progress exceeds 120%
          clearInterval(interval);
        }
      }, 100);

      // Cleanup interval when loading becomes false
      return () => {
        clearInterval(interval);
      };
    } else {
      setSpinning(false); // Stop spinner when loading is false
      setPercent(0); // Reset percentage
    }
  }, [loading,fullscreen]); // This effect runs whenever loading prop changes

  document.getElementsByTagName("body").style = "overFlow:hidden";

  return (
    <>
      {/* The Spin component with the optional percentage and fullscreen features */}
      <Spin
        spinning={spinning}
        percent={showPercent ? percent : 0} // Show percent if the showPercent prop is true
        tip={spinnerType || "Loading..."} // Custom message during spinner activity
        fullscreen={fullscreen}
        size="large"
        // style={{ zIndex: "9999999999999999999999" }}
      />
    </>
  );
};

// Default export of the component
export default LoaderComponent;
