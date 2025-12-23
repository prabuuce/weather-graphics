import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';

const MapChart = () => {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const initChart = async () => {
            try {
                // Fetch map data dynamically as the package is not installed
                const mapDataAsia = await fetch(
                    'https://code.highcharts.com/mapdata/custom/asia.geo.json'
                ).then(response => response.json());

                // Sample data for the map
                const sampleData = [
                    { 'hc-key': 'cn', value: 70 },
                    { 'hc-key': 'jp', value: 100 },
                    { 'hc-key': 'in', value: 65 },
                    { 'hc-key': 'kr', value: 70 },
                    { 'hc-key': 'id', value: 65 }
                ];

                setOptions({
                    chart: {
                        backgroundColor: 'rgba(0, 0, 0, 0)'
                    },
                    title: {
                        text: 'Map of Asia'
                    },
                    colorAxis: {
                        min: 0,
                        stops: [[0.4, '#ffff00'], [0.65, '#bfff00'], [1, '#40ff00']]
                    },
                    series: [
                        {
                            mapData: mapDataAsia,
                            data: sampleData,
                            joinBy: 'hc-key',
                            name: 'Sample Data',
                            states: {
                                hover: {
                                    color: '#BADA55'
                                }
                            }
                        }
                    ]
                });
            } catch (error) {
                console.error("Failed to load map data", error);
            }
        };

        initChart();
    }, []);

    if (!options) return <div>Loading Map...</div>;

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'mapChart'}
            options={options}
        />
    );
};

export default MapChart;
