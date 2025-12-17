import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/modules/exporting';
import highchartsMore from 'highcharts/highcharts-more';

import { GetForecastWindVal, GetForecastWeatherData } from '../fetching/forecastWeatherData.jsx';
import PropTypes from 'prop-types';

const WindForecastPolarChart = ({ location }) => {
    const windData = GetForecastWindVal({ location });

    // Guard: wait until windData is a non-empty array
    if (!Array.isArray(windData) || windData.length === 0) {
        return null; // or show a loading placeholder
    }

    // Don't mutate hook state directly; create a processed copy trimmed to first two values
    const processedWindData = windData.map(w => Array.isArray(w) ? w.slice(0, 2).reverse() : w).slice(0, 10).sort();
    

    const options = {

        chart: {
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
        />
    );
}

WindForecastPolarChart.propTypes = {
    location: PropTypes.string.isRequired
}

export default WindForecastPolarChart