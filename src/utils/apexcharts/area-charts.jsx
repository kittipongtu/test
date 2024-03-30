import React from "react";
import Chart from "react-apexcharts";

const AreaChart = () => {
  const seriesData = [
    {
      name: "Online ONUs",
      data: [300, 350, 348, 320, 330, 335, 348],
      color: "#3DED97",
    },
    {
      name: "Power fail",
      data: [2, 5, 10, 25, 45, 25, 15],
      color: "#008FFB",
    },
    {
      name: "Signal fail",
      data: [50, 22, 40, 24, 45, 60, 22],
      color: "#B90E0A",
    },
  ];

  const options = {
    chart: {
      id: "area-chart",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: [
        "00:00",
        "04:00",
        "08:00",
        "12:00",
        "16:00",
        "20:00",
        "23.59",
      ],
      title: {
        text: "Year",
      },
    },
    yaxis: {
      title: {
        text: "Dialy network status",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
  };

  return (
    <Chart options={options} series={seriesData} type="area" height={350} />
  );
};

export default AreaChart;
