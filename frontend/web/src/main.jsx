import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './sass/bootstrap-custom.scss'; // Import custom Bootstrap SCSS

import './css/sass-css/elements.css'
import './css/sass-css/forecast.css'
import './css/sass-css/layout.css'

import './css/json.css'

import {GetCurrentWeatherData, GetCurrentTempVal, GetCurrentWindVal, GetCurrentDateLoc} from './react/fetching/currentWeatherData.jsx'
import {GetForecastWeatherData} from './react/fetching/forecastWeatherData.jsx'

import TempForecastLineChart from './react/graphs/forecastLineChart.jsx'
import WindForecastPolarChart from './react/graphs/windForecastPolarChart.jsx'

import ForecastTabs from './react/graphs/forecastTabs.jsx'
import HumidityGaugeChart from './react/graphs/humidityGaugeChart.jsx';

function App() {
  const [location, setLocation] = useState('92692');
  const [locationInput, setLocationInput] = useState('');
  const [activeForecastTab, setActiveForecastTab] = useState('0');

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
      <input
        id="search-bar"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        placeholder="Location..."
      />
      <button
        type="button"
        onClick={processLocationInput}
      >🔎</button>
      <div className='layout'>
        <div className='container menu'>
          <div className="widget">
            <img src="frontend/web/src/imgs/sunny.png" />
          </div>
          <div>
            <ForecastTabs 
              location={location}
              activeIndex={activeForecastTab}
              onSelectTab={setActiveForecastTab}
            />
          </div>
          <div className="widget">

          </div>
        </div>   
        <div className="container body">
          <div className='widget'>
            <TempForecastLineChart 
              location={location}
              activeIndex={activeForecastTab}
            />
          </div>
          <div className="widget">
            <WindForecastPolarChart location={location}/>
          </div>
          <div className="widget">
            <HumidityGaugeChart />
          </div>
        </div>
      </div>
      <div id="bottom-row">
        <a href="/api/weather/current/92692">Current Weather</a>
        <a href="/api/weather/forecast/92692">Forecast Weather</a>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

