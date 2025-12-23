import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import highchartsData from 'highcharts/modules/data';
import highchartsExporting from 'highcharts/modules/exporting';

const HighchartsExampleMap = () => {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topology = await fetch(
                    'https://code.highcharts.com/mapdata/custom/world.topo.json'
                ).then(response => response.json());

                // Sample CSV data to replace document.getElementById('csv').innerText
                // In a real scenario, this could be fetched or passed as a prop
                const csvData = `Country,Code,Life expectancy
Spain,ES,83.3
Japan,JP,84.8
Switzerland,CH,84.0
Singapore,SG,83.7
Italy,IT,83.2
Australia,AU,83.0
Iceland,IS,83.2
Israel,IL,82.6
France,FR,82.5
Sweden,SE,82.6
Canada,CA,82.2
Norway,NO,82.8
Ireland,IE,82.1
New Zealand,NZ,82.1
Malta,MT,82.5
Luxembourg,LU,82.4
Netherlands,NL,82.0
Portugal,PT,81.9
United Kingdom,GB,81.4
Germany,DE,81.1
United States,US,78.9
China,CN,77.9
India,IN,69.4
Brazil,BR,75.5
South Africa,ZA,63.9
Russia,RU,72.7
Mexico,MX,75.0`;

                setOptions({
                    chart: {
                        map: topology
                    },

                    title: {
                        text: 'Life expectancy by country (2021)',
                        align: 'left'
                    },

                    credits: {
                        href: 'https://data.worldbank.org',
                        mapText: ' Data source: The World Bank'
                    },

                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: 'bottom'
                        }
                    },

                    colorAxis: {
                        min: 60
                    },

                    data: {
                        csv: csvData,
                        seriesMapping: [{
                            code: 1,
                            value: 2
                        }]
                    },

                    tooltip: {
                        valueDecimals: 1,
                        valueSuffix: ' years'
                    },

                    series: [{
                        name: 'Life expectancy',
                        joinBy: ['iso-a3', 'code'],
                        dataLabels: {
                            enabled: true,
                            format: '{point.value:.0f}',
                            filter: {
                                operator: '>',
                                property: 'labelrank',
                                value: 250
                            },
                            style: {
                                fontWeight: 'normal'
                            }
                        }
                    }]
                });
            } catch (error) {
                console.error('Error fetching map topology:', error);
            }
        };

        fetchData();
    }, []);

    if (!options) {
        return <div>Loading Map...</div>;
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'mapChart'}
            options={options}
        />
    );
};

export default HighchartsExampleMap;
