import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/modules/exporting';
import highchartsMore from 'highcharts/highcharts-more';

import { GetForecastTempVal, GetForecastTempRange } from '../fetching/forecastWeatherData.jsx';
import PropTypes from 'prop-types';

Highcharts.seriesTypes.line.prototype.getPointSpline = Highcharts.seriesTypes.spline.prototype.getPointSpline; // Rounds line chart lines.

const TempForecastLineChart = ({ location }) => {
    const tempObj = GetForecastTempVal({ location });
    const rangeObj = GetForecastTempRange({ location });

    // Build aligned arrays sorted by date so the arearange matches the line
    const tempDates = Object.keys(tempObj || {}).sort((a,b) => new Date(a) - new Date(b));
    const tempEntries = tempDates.map(dateStr => [new Date(dateStr).getTime(), Number(tempObj[dateStr]) || 0]);

    const rangeEntries = tempDates.map(dateStr => {
        const val = (rangeObj || {})[dateStr];
        let low, high;
        if (Array.isArray(val)) {
            [low, high] = val;
        } else if (val && (val.low != null || val.high != null)) {
            low = val.low; high = val.high;
        } else {
            // fallback: small band around the temperature so something is visible
            const t = Number(tempObj[dateStr]) || 0;
            low = t - 1; high = t + 1;
        }

        let lowNum = Number(low);
        let highNum = Number(high);
        // Debug/validation checks
        if (isNaN(lowNum) || isNaN(highNum)) {
            console.warn('Range NaN for', dateStr, { val, low, high, temp: tempObj[dateStr] });
        }

        // If range has collapsed to a single value, expand it slightly so the area is visible
        if (lowNum === highNum) {
            const delta = Math.max(0.5, Math.abs(lowNum) * 0.01); // 0.5°C or 1% of magnitude
            console.warn('Range collapsed to single value for', dateStr, { lowNum, highNum, temp: tempObj[dateStr], val, expandingBy: delta });
            lowNum = lowNum - delta;
            highNum = highNum + delta;
        }

        if (lowNum === Number(tempObj[dateStr]) || highNum === Number(tempObj[dateStr])) {
            console.warn('Range endpoint equals median temp for', dateStr, { lowNum, highNum, temp: tempObj[dateStr], val });
        }

        // Ensure low < high
        if (lowNum >= highNum) {
            highNum = lowNum + Math.max(0.5, Math.abs(lowNum) * 0.01);
        }

        return [new Date(dateStr).getTime(), lowNum || 0, highNum || 0];
    });

    // Debug logs to verify data shapes
    console.log('tempEntries:', tempEntries.slice(0,5));
    console.log('rangeEntries:', rangeEntries.slice(0,5));

    const options = {
        tooltip: {
            shared: true,
            formatter: function() {
                let s = Highcharts.dateFormat('%A, %b %e, %H:%M', this.x);
                (this.points || [this.point]).forEach(p => {
                    if (p.series && p.series.type === 'arearange') {
                        s += `<br/><span style="color:${p.series.color}">●</span> ${p.series.name}: <b>${p.point.low} - ${p.point.high}</b>`;
                    } else {
                        s += `<br/><span style="color:${p.series.color}">●</span> ${p.series.name}: <b>${p.y}</b>`;
                    }
                });
                return s;
            }
        },

        chart: {
            type: 'line'
        },
        title: {
            text: 'Temperature Forecast'
        },

        xAxis: {
            type: 'datetime',
            tickPositions: tempEntries.map(e => e[0])
        },

        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },

        series: [{
            name: 'Temperature',
            data: tempEntries,
            zIndex: 1
        }, 
        {
            type: 'arearange',
            name: 'Temperature Range',
            data: rangeEntries,
            linkedTo: ':previous',
            color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
                enabled: false
            }
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};

TempForecastLineChart.propTypes = {
    location: PropTypes.string.isRequired,
};

export default TempForecastLineChart;