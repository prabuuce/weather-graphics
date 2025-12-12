import React from 'react';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { GetForecastTempVal } from '../fetching/forecastWeatherData';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
Chart.defaults.color = '#ffffff';

function ForecastLineChart() {
  const forecastTempVal = GetForecastTempVal({type: 'temperature', location: '92692'});
  console.log("Forecast Temperature Value in Chart: ", forecastTempVal);

  const labels = forecastTempVal ? Object.keys(forecastTempVal) : [];
  const datapoints = forecastTempVal ? Object.values(forecastTempVal) : [];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature Forecast (°C)',
        data: datapoints,
        borderColor: '#e38455ff',
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    },
  };

  return (<Line data={data} options={config.options} />);
}

export default ForecastLineChart;