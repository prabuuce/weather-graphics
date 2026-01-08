import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import { TextField } from '@mui/material'
import { Card, CardContent } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material'

import InitMui from './styling/mui/globals';

// CSS
import "./styling/css/sass-css/layout.css";
import "./styling/css/sass-css/elements.css";

// Custom Web Components
import SearchBar from './react/component/SearchBar';
import "./styling/css/sass-css/components/search.css"; 

import WeatherWidget from './react/component/WeatherWidget';
import "./styling/css/sass-css/components/weathers.css";

import GetCurrentWeatherData from './react/fetching/currentWeatherData';


import "./styling/css/sass-css/components/charts.css";

// Setting up Material UI
const theme = InitMui();

function App() {
  const [location, setLocation] = useState("92692");
  const weatherData = GetCurrentWeatherData({ location });

  return (
    <>
      <div id="page">
        <div id="body">
          <SearchBar />
          <div className="chart"> insert chart here </div>
          <WeatherWidget weatherData={weatherData} />
        </div>
        <div id="menu">
          Hello World!
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
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

