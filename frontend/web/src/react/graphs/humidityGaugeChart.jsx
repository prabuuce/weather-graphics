import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import { GetCurrentHumidity } from '../fetching/currentWeatherData';

const HumidityGaugeChart = (location) => {
    const options = {
        chart: {
            type: 'solidgauge',
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: 'var(--highcharts-neutral-color-3, #fafafa)',
                borderColor: 'var(--highcharts-neutral-color-20, #ccc)',
                borderRadius: 5,
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        exporting: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70,
                text: 'Humidity'
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                borderRadius: 3,
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Humidity',
            data: [GetCurrentHumidity(location)],
            dataLabels: {
                format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">%</span>' +
                '</div>'
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { width: "100%", height: "100%" } }}
        />
    );
};

export default HumidityGaugeChart;
