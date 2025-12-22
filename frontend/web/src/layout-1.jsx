import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './sass/bootstrap-custom.scss'; // Import custom Bootstrap SCSS

import './css/sass-css/elements.css'
import './css/sass-css/forecast.css'
import './css/sass-css/layout.css'

import './css/flex.css'
import './css/json.css'

import WindForecastPolarChart from './react/graphs/forecastPolarCharts.jsx'

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
      <div className='Row'>
        <div className='container menu'>
          <div className="widget">
            <h2></h2>
            <b></b>

          </div>
          <div>

          </div>
          <div className="widget">

          </div>
        </div>   
        <div className="container body">
          <div className='widget'>

          </div>
          <div className="Row">
          <div className="widget">
            <WindForecastPolarChart location={location}/>
          </div>          
          <div className="widget">
                <WindForecastPolarChart location={location}/>
          </div>
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