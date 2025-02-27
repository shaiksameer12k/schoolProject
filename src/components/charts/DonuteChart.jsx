import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonuteChart({ data }) {
  const [dataValue, setDataValue] = useState([]);
  const [labelValue, setLabelValue] = useState([]);
  const [chartLabel, setChartLabel] = useState("");

  useEffect(() => {
    let tempLabels = [];
    let tempValues = [];

    data.map((item) => {
      tempLabels.push(item.type);
      tempValues.push(item.value);
    });
    setLabelValue(tempLabels);
    setDataValue(tempValues);
  }, [data]);

  console.log("chartLabel", chartLabel);

  let sendData = {
    labels: labelValue,
    datasets: [
      {
        label: data[0]?.chartLabel,
        data: dataValue,
        backgroundColor: [
          "#2389ff",
          "#0dcccc",
          "#F26599",
          "#42CB42",
          "#E8903D",
        ],
        borderColor: ["#2389ff", "#0dcccc", "#F26599", "#42CB42", "#E8903D"],
        borderWidth: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
      },
    },
  };

  return <Doughnut data={sendData} options={options} />;
}
