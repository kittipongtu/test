import React from 'react';
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import { defaults } from "chart.js";
import 'chartjs-plugin-datalabels';

Chart
  defaults.font.family = "Kanit, sans-serif";
  // defaults.font.weight = "bold";

export default function AreaChart() {
    const data = {
      labels: ['0-4', '4-8', '8-12', '12-16', '16-20', '20-24'],
      datasets: [
        {
          label: 'Online ONUs',
          data: [15, 19, 19, 17, 18, 19],
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.5)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
        {
          label: 'Power fail',
          data: [1, 7, 4, 2, 3, 2],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Signal loss',
          data: [0, 1, 0, 0, 2, 1],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false
          }
        },
        x: {
          beginAtZero: true,
          grid: {
            display: false
          }
        }
      }
    };
  
    return <Line data={data} options={options}  />;
  };