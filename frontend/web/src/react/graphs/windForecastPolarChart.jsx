import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/modules/exporting';
import highchartsMore from 'highcharts/highcharts-more';

import { GetForecastWindVal } from '../fetching/forecastWeatherData.jsx';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const WindForecastPolarChart = ({ location, activeIndex }) => {
    const chartRef = useRef(null);

    const windData = GetForecastWindVal({ location });
    // Don't mutate hook state directly; create a processed copy trimmed to first two values
    const processedWindData = Object.values(windData).map(w => Array.isArray(w) ? w.slice(0, 2).reverse() : w).slice(0, 10).sort();    
    // Sync chart selection with active tab
    useEffect(() => {
        if (chartRef.current && chartRef.current.chart) {
            const chart = chartRef.current.chart;
            const series = chart.series[0]; // Assuming temperature is the first series
            
            if (series && series.points) {
                const pointIndex = parseInt(activeIndex, 10);
                const point = series.points[pointIndex];
                
                if (point) {
                    // Clear previous selection
                    if (chart.hoverPoint) {
                        chart.hoverPoint.onMouseOut();
                    }
                    
                    // Select new point
                    point.onMouseOver();
                    chart.tooltip.refresh(point);
                    
                    // Optional: Visually select the point if you want it to persist
                    // point.select(true, false); 
                }
            }
        }
    }, [activeIndex, processedWindData]);

  
    const options = {

        chart: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            polar: true
        },

        title: {
            text: 'Wind Speed + Angle'
        },

        pane: {
            startAngle: 0,
            endAngle: 360
        },

        xAxis: {
            tickInterval: 20,
            min: 0,
            max: 360,
            labels: {
                format: '{value}°'
            }
        },

        yAxis: {
            min: 0
        },

        series: [{
            type: 'area',
            name: 'Speed',
            data: processedWindData
        }]
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartRef}
            containerProps={{ style: { flex: "1", height: "100%", minWidth: "0" } }}
        />
    );
}

WindForecastPolarChart.propTypes = {
    location: PropTypes.string.isRequired,
    activeIndex: PropTypes.string
}

// Helper functions
function splitByDate(datedObject) {

}

export default WindForecastPolarChart
