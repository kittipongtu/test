import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function ColumnChart() {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: true
        },
        fontFamily: 'Kanit, sans-serif',
        fontWeight: "bold"
      },
      xaxis: {
        categories: [
          "02-04-2023",
          "03-04-2023",
          "04-04-2023",
          "05-04-2023",
          "06-04-2023",
          "07-04-2023",
          "08-04-2023",
          "09-04-2023",
        ],
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          colors: {
            ranges: [
              {
                from: 0,
                to: 100,
                color: '#0065c9'
              }
            ]
          }
        }
      },
      grid: {
        // show: false
      }
    },
    series: [
      {
        name: "GPON",
        data: generateData(),
      },
    ],
  });

  function generateData() {
    return [
      2,
      1,
      1,
      2,
      1,
      2,
      4,
      3,
    ];
  }

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      width="100%"
    />
  );
}
