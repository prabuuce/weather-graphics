import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import GetCurrentWeatherData from './react/fetching/currentWeatherData';
import GetForecastWeatherData from './react/fetching/forecastWeatherData';

// CSS
import "./styling/css/sass-css/layout.css";
import "./styling/css/sass-css/elements.css";

// Custom Web Components
import SearchBar from './react/component/SearchBar';
import "./styling/css/sass-css/components/search.css"; 

import WeatherWidget from './react/component/WeatherWidget';
import "./styling/css/sass-css/components/weathers.css";

//////
import WeatherAccordian from './react/component/Accordian';


// Charts
import ForecastAreaChart from './react/component/charts/ForecastAreaChart';
import WindPolarChart from './react/component/charts/WindPolarChart';
import HumidityBarChart from './react/component/charts/HumidityBarChart';


import "./styling/css/sass-css/components/charts.css";

function App() {
  const [location, setLocation] = useState("92692");
  const weatherData = GetCurrentWeatherData({ location });
  const forecastWeatherData = GetForecastWeatherData({ location });

  return (
    <>
      <div id="page">
        <div id="body">
          <SearchBar location={location} setLocation={setLocation} />
          <ForecastAreaChart forecastWeatherData={forecastWeatherData} />
          <WeatherWidget weatherData={weatherData} />
        </div>
        <div id="menu">
          <div className="polar-chart">
            <WindPolarChart forecastWeatherData={forecastWeatherData} />
          </div>
          <div style={{ height: '150px', marginTop: '20px' }}>
            <HumidityBarChart weatherData={weatherData} />
          </div>
        </div>
        <div id="footer">
          <div className="footer-content">
            Made by the <a href="https://github.com/thetrollingwizard" >best dev on the planet</a>
            Weather icons made by <a href="https://www.flaticon.com/free-icons/climate" title="climate icons">kerismaker - Flaticon</a>
          </div>
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

