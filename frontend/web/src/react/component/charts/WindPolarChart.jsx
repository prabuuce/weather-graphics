import React, { useMemo, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';

import { colors } from '../../../styling/globals/tokens';
import "../../../styling/css/sass-css/components/charts.css";

const WindPolarChart = ({ forecastWeatherData }) => {
  const chartComponentRef = useRef(null);

  const chartData = useMemo(() => {
    const rawList = forecastWeatherData?.list;
    
    if (!Array.isArray(rawList)) {
        return null;
    }

    // Process data for Area chart sorted by degree
    const data = rawList.slice(0, 40).map(item => ({
        x: item.wind.deg,
        y: item.wind.speed
    })).sort((a, b) => a.x - b.x);

    return { data };
  }, [forecastWeatherData]);

  useEffect(() => {
      const handleResize = () => {
          if (chartComponentRef.current && chartComponentRef.current.chart) {
              chartComponentRef.current.chart.reflow();
          }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!chartData) {
      return <div style={{ color: '#8c2f39', textAlign: 'center', padding: '20px' }}>Loading Wind Data...</div>;
  }

  const options = {
    chart: {
      polar: true,
      type: 'area',
      backgroundColor: 'transparent'
    },
    title: {
      text: 'Wind Distribution (5-Day)',
      style: { color: '#333333' }
    },
    pane: {
      size: '85%',
      startAngle: 0,
      endAngle: 360,
      background: [{
          backgroundColor: 'transparent',
          borderWidth: 0
      }] 
    },
    xAxis: {
      min: 0,
      max: 360,
      tickInterval: 22.5,
      gridLineWidth: 1,
      gridLineColor: colors.color2, // Set web pattern color
      lineWidth: 0, // Remove outer circle/line
      labels: {
          formatter: function() { return this.value + '°'; },
          style: { color: '#333333' }
      }
    },
    yAxis: {
      min: 0,
      gridLineInterpolation: 'polygon',
      gridLineColor: colors.color2, // Set web pattern color
      lineWidth: 0,
      title: {
          text: 'm/s',
          style: { color: '#333333' }
      },
      labels: { style: { color: '#333333' } }
    },
    plotOptions: {
      area: {
        marker: {
            enabled: true,
            radius: 3,
            fillColor: '#8c2f39'
        },
        lineWidth: 1.5,
        color: '#8c2f39',
        fillColor: 'rgba(140, 47, 57, 0.1)',
        connectEnds: true
      }
    },
    series: [{
      name: 'Wind Speed',
      data: chartData.data,
      pointPlacement: 'on'
    }],
    legend: { enabled: false },
    tooltip: {
        headerFormat: '',
        pointFormat: 'Wind: <b>{point.y} m/s</b> at <b>{point.x}°</b>'
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <HighchartsReact
        className={"polar-chart"}
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
        containerProps={{ style: { height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 } }}
      />
    </div>
  );
};

export default WindPolarChart;
