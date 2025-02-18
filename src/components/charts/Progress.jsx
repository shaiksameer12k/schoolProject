import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {/* Background Circle */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={props.size}
        sx={{
          color: props?.trackColor, // background color
          thickness: 100,
        }}
        thickness={8}
      />
      {/* Foreground Circle */}
      <CircularProgress
        variant="determinate"
        {...props}
        size={props.size}
        sx={{
          color: props.progressColor || "primary.main", // Progress color
          position: "absolute",
        }}
        thickness={6}
      />
      {/* Text in the middle */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary", fontSize: "10px", fontWeight: 600 }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.number,
  progressColor: PropTypes.string,
  trackColor: PropTypes.string,
};

export default function CircularWithValueLabel({ barColor, trackColor , count }) {
  

  return (
    <CircularProgressWithLabel
      value={count}
      size={35}
      progressColor={barColor}
      trackColor={trackColor}
    />
  );
}
