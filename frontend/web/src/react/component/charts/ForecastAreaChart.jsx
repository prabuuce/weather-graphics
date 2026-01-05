import React from 'react';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
//-------------------------------------------------------//
import 'highcharts/modules/exporting';
import highcharts3d from 'highcharts/highcharts-3d';
import annotations from 'highcharts/modules/annotations';

import { GetForecastTempVal } from '../../fetching/forecastWeatherData.jsx';

import "../../../styling/sass/custom/charts.scss"

export const ForecastAreaChart = ({ location }) => {
    const tempObj = GetForecastTempVal({ location });

    // Build aligned arrays sorted by date so the arearange matches the line
    const length = 6;
    const tempDates = Object.keys(tempObj || {}).sort((a,b) => new Date(a) - new Date(b));
    const tempEntries = tempDates.map(dateStr => [new Date(dateStr).getTime(), Number(tempObj[dateStr]) || 0]).slice(0, length);

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
            backgroundColor: 'rgba(0, 0, 0, 0)',
            type: 'area',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 50,
                depth: 200
            }
        },
        title: {
            text: 'Temperature Forecast',
            verticalAlign: 'bottom',
            align: 'left' 
        },

        xAxis: {
            type: 'datetime',
            tickPositions: tempEntries.map(e => e[0])
        },

        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            visible: false
        },

        series: [{
            name: 'Temperature',
            type: "area",
            data: tempEntries,
            zIndex: 1
        }],
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
        />
    );
};

ForecastAreaChart.propTypes = {
    location: PropTypes.string.isRequired,
    activeIndex: PropTypes.string,
};
