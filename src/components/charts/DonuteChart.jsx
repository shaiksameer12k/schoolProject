import React from "react";

import { Pie } from "@ant-design/plots";

const DemoBar = ({ data, type }) => {
  const config = {
    data: data,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: true,
        position: "bottom",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        content: "Total: " + "75%",
        style: {
          text: "g",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 10,
          fontStyle: "bold",
        },
      },
    ],
    tooltip: {
      title: (d) => d?.type,
      field: "a",
    },
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Pie {...config} />
    </div>
  );
};

export default DemoBar;
