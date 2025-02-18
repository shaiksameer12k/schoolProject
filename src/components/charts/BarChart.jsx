import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // Data for the bar chart
  const data = {
    datasets: [
      {
        label: "Pending",
        data: [5, 7, 0], // Data for Pending status
        backgroundColor: "#FF4500",
      },

      {
        label: "Submitted",
        data: [3, 6, 5], // Data for Approved status
        backgroundColor: "#32CD32",
      },
    ],
  };

  // Options for the chart (e.g., title, tooltips, etc.)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of the legend
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true, // Y-axis starts from zer

        title: {
          display: false,
          text: "Number of Documents",
        },
        stacked: true, // Enable stacked bars
      },
      x: {
        type: "category",
        labels: [
         "Chemestry",
         "Maths",
         "Biology"
        ], // X-axis labels
        ticks: {
          font: {
            size: 12, // Font size for X-axis labels
          },
          color: "#333", // Color for X-axis labels
          rotation: 45, // Optional: Rotate X-axis labels for better fit
        },
        title: {
          display: true,
          text: "Subjects List",
        },
        stacked: true, // Enable stacked bars
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
