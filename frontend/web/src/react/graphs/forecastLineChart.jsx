import React from 'react';
import Plot from 'react-plotly.js';
import { GetCurrentTempVal } from '../fetching/currentWeatherData';

function ForecastLineChart() {
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter'
  };


  var trace2 = {
    x: [1, 2, 3],
    y: [16, 5, 11, 9],
    type: 'scatter'
  };

  var data = [trace1, trace2];

  return <Plot data={data} layout={{ title: 'Forecast Line Chart' }} />;
}

export default ForecastLineChart;