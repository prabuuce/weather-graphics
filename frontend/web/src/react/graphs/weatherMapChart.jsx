import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';

import PropTypes from 'prop-types';


const WeatherMapChart = ({ location }) => {
    
    const options = {
        chart: {
            // map: mapData // Load your map data (GeoJSON) here
        },
        title: {
            text: 'Weather Map'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        colorAxis: {
            min: 0
        },
        series: [{
            data: [],
            name: 'Random Data',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'mapChart'}
            options={options}
        />
    );
};

WeatherMapChart.propTypes = {
    location: PropTypes.string.isRequired
};

export default WeatherMapChart;