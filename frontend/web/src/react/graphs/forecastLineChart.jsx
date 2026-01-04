import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/modules/exporting';
import highcharts3d from 'highcharts/highcharts-3d';
import annotations from 'highcharts/modules/annotations';
import { useEffect, useRef } from 'react';

import { GetForecastTempVal, GetForecastTempRange } from '../fetching/forecastWeatherData.jsx';
import PropTypes from 'prop-types';

Highcharts.seriesTypes.line.prototype.getPointSpline = Highcharts.seriesTypes.spline.prototype.getPointSpline; // Rounds line chart lines.

const TempForecastLineChart = ({ location, activeIndex }) => {
    const chartRef = useRef(null);
    const tempObj = GetForecastTempVal({ location });
    const rangeObj = GetForecastTempRange({ location });

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
                    point.select(true, false); 
                }
            }
        }
    }, [activeIndex]);

    // Build aligned arrays sorted by date so the arearange matches the line
    const length = 6;
    const tempDates = Object.keys(tempObj || {}).sort((a,b) => new Date(a) - new Date(b));
    const tempEntries = tempDates.map(dateStr => [new Date(dateStr).getTime(), Number(tempObj[dateStr]) || 0]).slice(0, length);

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
    }).slice(0, length);
    
    // Ensure Highcharts modules are initialized so 'arearange' and annotations work
    // Some bundlers export the module initializer as a default property, so handle both cases.
    (function initHighchartsModule(mod, name) {
        const initializer = (typeof mod === 'function') ? mod : (mod && typeof mod.default === 'function' ? mod.default : null);
        if (initializer) {
            try {
                initializer(Highcharts);
            } catch (e) {
                console.warn(`Failed to initialize Highcharts ${name} module:`, e);
            }
        } else {
            console.warn(`Highcharts ${name} module is not a function; skipping initialization.`, mod);
        }
    })(annotations, 'annotations');
    
    // Build safe annotations only for points that exist

    const annotationLabels = [].reduce((acc, idx, i) => {
        const pt = tempEntries[idx];
        if (pt) {
            acc.push({
                point: { x: pt[0], y: pt[1], xAxis: 0, yAxis: 0 },
                shape: "rect",
                ...{ padding: 20 },
                ...{ overflow: 'justify' }
            });
        }
        return acc;
    }, []);

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
            text: 'Temperature Forecast'
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
            data: tempEntries,
            zIndex: 1
        }, 
        {
            type: 'arearange',
            name: 'Temperature Range',
            data: rangeEntries,
            linkedTo: ':previous',
            color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.6,
            zIndex: 0,
            marker: {
                enabled: false
            } 
        }],

        annotations: annotationLabels.length ? [{ labels: annotationLabels }] : []
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartRef}
            containerProps={{ style: { flex: "1", height: "100%", minWidth: "0" } }}
        />
    );
};

TempForecastLineChart.propTypes = {
    location: PropTypes.string.isRequired,
    activeIndex: PropTypes.string,
};

export default TempForecastLineChart;
