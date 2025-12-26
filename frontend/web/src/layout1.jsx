import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './sass/bootstrap-custom.scss'; // Import custom Bootstrap SCSS

import './css/sass-css/elements.css'
import './css/sass-css/forecast.css'
import './css/sass-css/layout.css'


import './css/json.css'

import TempForecastLineChart from './react/graphs/forecastLineChart.jsx';
import { GetCurrentDateLoc, GetCurrentTempVal, GetCurrentHumidity, GetCurrentFeelsLike, GetCurrentTempRange, GetCurrentWindVal } from './react/fetching/currentWeatherData.jsx';
import ForecastTabs from './react/graphs/forecastTabs.jsx';

import WindForecastPolarChart from './react/graphs/windForecastPolarChart.jsx'
import HumidityGaugeChart from './react/graphs/humidityGaugeChart.jsx';
import { WeatherIconSelector } from './react/component/weatherIcon/weatherIcons.jsx';

function App() {
    const [location, setLocation] = useState('92692');
    const [locationInput, setLocationInput] = useState('');
    const [activeForecastTab, setActiveForecastTab] = useState();

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
            <div style={{ "display": "flex", "flexDirection": "column", "height": "100vh" }}>
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
                    <div className='cell' style={{ "--widthPercent": "30%", "--heightPercent": "100%", "flexDirection": "column" }}>
                            <div className="widget" style={{ "--widthPercent": "100%", "--heightPercent": "22%", "flexDirection": "row" }}>
                                <WeatherIconSelector location={location}/>
                                <div style={{"flexDirection": "column"}}>
                                    <b><GetCurrentDateLoc location={location}/></b>
                                    <h2 style={{marginBottom: "0px"}}><GetCurrentTempVal type='main.temp' location={location}/>°C</h2>
                                    <div style={{"display": "flex", "flexDirection": "row"}}>
                                        <div style={{"display": "flex", "flexDirection": "column", "margin": "10px"}}>
                                            <small>Feels Like: <GetCurrentFeelsLike location={location}/>°C</small>
                                            <small>Temp Range: { GetCurrentTempRange({ "location": location })[0] }°C - { GetCurrentTempRange({ "location": location })[1] }°C</small>
                                        </div>
                                        <hr/>
                                        <div style={{"display": "flex", "flexDirection": "column", "margin": "10px"}}>
                                            <small>Wind: {GetCurrentWindVal({ "location": location })["speed"]}mph @ {GetCurrentWindVal({"location": location })["deg"]} deg</small>
                                            <small>Humidity: <GetCurrentHumidity location={location}/>%</small>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="widget" style={{ "--widthPercent": "100%", "--heightPercent": "75%" }}>
                            <ForecastTabs 
                                location={location}
                                activeIndex={activeForecastTab}
                                onSelectTab={setActiveForecastTab}
                            />
                        </div>
                    </div>
                    <div className="cell" style={{ "--widthPercent": "70%", "--heightPercent": "100%", "flexDirection": "column" }}>
                        <div className="widget" style={{ "--widthPercent": "100%", "--heightPercent": "100%"}}>
                            <TempForecastLineChart 
                            location={location}
                            activeIndex={activeForecastTab}
                            />
                        </div>
                        <div className="cell" style={{ "--widthPercent": "100%", "--heightPercent": "50%", "flexDirection": "row"}}>
                            <div className="widget" style={{ "--widthPercent": "50%", "--heightPercent": "100%" }}>
                                <WindForecastPolarChart location={location} activeIndex={activeForecastTab} />
                            </div>
                            <div className="widget" style={{ "--widthPercent": "50%", "--heightPercent": "100%" }}>
                                <HumidityGaugeChart location={location}/>
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