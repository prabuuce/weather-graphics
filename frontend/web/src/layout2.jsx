import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './sass/bootstrap-custom.scss'; // Import custom Bootstrap SCSS

import './css/sass-css/elements.css'
import './css/sass-css/forecast.css'
import './css/sass-css/layout.css'


import './css/json.css'

import WindForecastPolarChart from './react/graphs/windForecastPolarChart.jsx'
import HighchartsExampleMap from './react/graphs/exampleHighchartMap.jsx';
import MapChart from './react/graphs/mapChart.jsx';
import WeatherHoneycombMap from './react/graphs/weatherHoneycombMap.jsx';
import HumidityGaugeChart from './react/graphs/humidityGaugeChart.jsx';

function App() {
    const [location, setLocation] = useState('92692');
    const [locationInput, setLocationInput] = useState('');

    const processLocationInput = () => {
        // Validate non-empty input and only update if it's different
        const value = locationInput.trim();
        const validLocation = value.length > 0 && value !== location;
        if (validLocation) {
            setLocation(value);
        }
    }

    return (
        <>
            <div style={{ "display": "flex", "flex-direction": "column", "height": "100vh" }}>
                <div>
                    <input
                        id="search-bar"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        placeholder=" Location..."
                    />
                    <button
                        type="button"
                        onClick={processLocationInput}
                    >🔎</button>
                </div>
                <div className='layout'>
                    <div className='cell' style={{ "--widthPercent": "10%", "--heightPercent": "100%", "flex-direction": "column" }}>
                        <div className="widget" style={{ "--widthPercent": "100%","--heightPercent": "40%" }}>
{/*                             <HumidityGaugeChart />
 */}                        </div>
                        <div className="widget" style={{ "--widthPercent": "100%", "--heightPercent": "60%" }}>
                            hello world!
                        </div>
                    </div>
                    <div className="cell" style={{ "--widthPercent": "90%", "--heightPercent": "100%", "flex-direction": "column" }}>
                        <div className="cell" style={{ "--widthPercent": "100%", "--heightPercent": "50%", "flex-direction": "row" }}>
                            <div className="widget" style={{ "--widthPercent": "100%", "--heightPercent": "100%"}}>
                                <MapChart />
                            </div>
                            <div className="widget" style={{ "--widthPercent": "100%", "--heightPercent": "100%"}}>
                                <WeatherHoneycombMap />
                            </div>
                        </div>
                        <div className="cell" style={{ "--widthPercent": "100%", "--heightPercent": "50%", "flex-direction": "row" }}>
                            <div className="widget" style={{ "--widthPercent": "50%", "--heightPercent": "100%" }}>
                                <WindForecastPolarChart location={location} />
                            </div>
                            <div className="widget" style={{ "--widthPercent": "50%", "--heightPercent": "100%" }}>
                                <HighchartsExampleMap />
                            </div>
                        </div>
                    </div>
                </div>

                <div id="bottom-row">
                    <a href="/api/weather/current/92692">Current Weather</a>
                    <a href="/api/weather/forecast/92692">Forecast Weather</a>
                </div>
            </div>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);