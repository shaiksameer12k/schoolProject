import React, { useEffect, useState } from "react";
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

const BarChart = ({ cardsData }) => {
  const [xAxisLabels, setXAxisLabels] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);

  // Data for the bar chart

  const data = {
    datasets: [
      {
        label: "Pending",
        data: pendingData, // Data for Pending status
        backgroundColor: "#0dcccc",
      },

      {
        label: "Submitted",
        data: submittedData, // Data for Approved status
        backgroundColor: "#2389ff",
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
        labels: xAxisLabels, // X-axis labels
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

  useEffect(() => {
    let xAxisLabels = cardsData?.reduce((a, b) => {
      a.push(b.cardName);
      return a;
    }, []);

    let pendingData = [];
    let submittedData = [];

    let barData = cardsData?.map((sub) => {
      if (sub.totalCount == sub.complitedCount) {
        pendingData.push(0);
        submittedData.push(sub.complitedCount);
        return;
      } else if (sub.complitedCount == 0) {
        pendingData.push(sub.totalCount);
        submittedData.push(sub.complitedCount);
      } else {
        pendingData.push(sub.totalCount - sub.complitedCount);
        submittedData.push(sub.complitedCount);
      }
    });

    setPendingData(pendingData);
    setSubmittedData(submittedData);
    setXAxisLabels(xAxisLabels);
  }, [cardsData]);

  return <Bar data={data} options={options} />;
};

export default BarChart;
