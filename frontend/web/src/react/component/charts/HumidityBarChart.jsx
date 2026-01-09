import React, { useMemo, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { colors } from '../../../styling/globals/tokens';

const HumidityBarChart = ({ weatherData }) => {
  const chartComponentRef = useRef(null);

  const humidity = useMemo(() => {
    // Access current humidity safely
    if (weatherData && weatherData.main) {
        return weatherData.main.humidity;
    }
    return null;
  }, [weatherData]);

  useEffect(() => {
      const handleResize = () => {
          if (chartComponentRef.current && chartComponentRef.current.chart) {
              chartComponentRef.current.chart.reflow();
          }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (humidity === null) {
      return <div style={{ color: colors.color3, textAlign: 'center', padding: '20px' }}>Loading Humidity...</div>;
  }

  const options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      margin: [15, 15, 40, 15], // Tight margins
      height: 120 // Fixed small height for a single bar feel if container allows
    },
    title: {
      text: null
    },
    xAxis: {
        categories: ['Humidity'],
        visible: false // Hide X axis
    },
    yAxis: {
        min: 0,
        max: 100,
        title: {
            text: null
        },
        labels: {
            enabled: false
        },
        gridLineWidth: 0,
        plotBands: [{ // Background track
            from: 0,
            to: 100,
            color: 'rgba(0,0,0,0.05)',
            thickness: '50%'
        }]
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        dataLabels: {
          enabled: true,
          format: '{y}%',
          align: 'right',
          style: {
              color: '#fff',
              textOutline: 'none',
              fontSize: '14px',
              fontWeight: 'bold'
          },
          inside: true // Label inside the bar
        },
        color: {
            linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
            stops: [
                [0, colors.color3], // Start color
                [1, colors.color4]  // End color
            ]
        },
        borderWidth: 0,
        pointWidth: 40 // Thicker bar
      }
    },
    series: [{
      name: 'Humidity',
      data: [humidity],
      showInLegend: false
    }],
    credits: { enabled: false },
    tooltip: { enabled: false }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <h4 style={{ margin: '0 0 5px 0', textAlign: 'center', color: '#333' }}>Current Humidity</h4>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
        containerProps={{ style: { height: '80px', width: '100%' } }} // Force height
      />
    </div>
  );
};

export default HumidityBarChart;