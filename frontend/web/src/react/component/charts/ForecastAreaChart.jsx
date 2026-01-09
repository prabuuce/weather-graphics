import React, { useMemo, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from 'highcharts/highcharts-3d';

import "../../../styling/css/sass-css/components/charts.css";

const ForecastAreaChart = ({ forecastWeatherData }) => {
  const chartComponentRef = useRef(null);

  const chartData = useMemo(() => {
    const rawList = forecastWeatherData?.list;
    
    if (!Array.isArray(rawList)) {
        return null;
    }

    const categories = [];
    const data = [];

    // Limit to first 12 items (36 hours)
    const itemsToDisplay = rawList.slice(0, 12);

    itemsToDisplay.forEach(item => {
        // Format date: "HH:mm"
        const date = new Date(item.dt * 1000);
        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        categories.push(timeStr);
        data.push(item.main.temp);
    });

    return { categories, data };
  }, [forecastWeatherData]);

  // Handle window resize explicitly to force chart reflow
  useEffect(() => {
      const handleResize = () => {
          if (chartComponentRef.current && chartComponentRef.current.chart) {
              chartComponentRef.current.chart.reflow();
          }
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);


  if (!chartData) {
      return <div style={{ color: '#8c2f39', textAlign: 'center', padding: '20px' }}>Loading Forecast Data...</div>;
  }

  const options = {
    chart: {
      type: 'area',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 30,
        depth: 100,
        viewDistance: 25
      },
      backgroundColor: 'transparent'
    },
    title: {
      text: 'Temperature Forecast',
      style: {
          color: '#333333'
      }
    },
    xAxis: {
        categories: chartData.categories,
        labels: {
            style: {
                color: '#333333'
            }
        }
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)',
            offset: 50,
            style: {
                color: '#333333'
            }
        },
        labels: {
            style: {
                color: '#333333'
            }
        }
    },
    plotOptions: {
      area: {
        depth: 100,
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 1
            }
        },
        threshold: null
      }
    },
    series: [{
      name: 'Temperature',
      data: chartData.data,
      color: '#8c2f39',
      fillColor: {
          linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
          },
          stops: [
              [0, '#8c2f39'],
              [1, 'rgba(140, 47, 57, 0.1)']
          ]
      }
    }]
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <HighchartsReact
        className={"line-chart"}
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
        containerProps={{ style: { height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 } }}
      />
    </div>
  );
};

export default ForecastAreaChart;