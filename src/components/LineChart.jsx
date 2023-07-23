import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const LineChart = ({ ChartData }) => {
  return (
    <>
      <Line data={ChartData} />
    </>
  );
};

export default LineChart;
