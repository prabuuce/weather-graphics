import React from 'react'
import ReactDOM from 'react-dom/client'

import './css/sass-css/index.css'
import './css/flex.css'
import './css/json.css'
import {GetCurrentWeatherData, GetCurrentTempVal, GetCurrentWindVal} from './react/fetching/currentWeatherData.jsx'
import {GetForecastWeatherData} from './react/fetching/forecastWeatherData.jsx'

import TempForecastLineChart from './react/graphs/forecastLineChart.jsx'
import WindForecastPolarChart from './react/graphs/forecastPolarCharts.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='Row'>
      <div className='large-container menu'>
        <div className="menu-item">
          <h2><GetCurrentTempVal type='main.temp' location="92692"/></h2>
        </div>
      </div>   
      <div className="large-container">
        <div className='body'>
          <div className='menu-item'>
            <TempForecastLineChart location="92692"/>
          </div>
        </div>
        <div className='body'> 
          <div className='menu-item'>
            <WindForecastPolarChart location="92692"/>
          </div>
        </div>
      </div>
    </div>
    <div className='Row'>
      <div className='large-container menu'>
        <div className="menu-item">
          <GetCurrentWindVal type='main.temp' location="92692"/>
        </div> 
        <div className="menu-item">
          Plz insert forecast temp val here
        </div> 
      </div>
      <div className='large-container body'>
        <div className='menu-item'>
          <GetCurrentWeatherData type='main.temp' location="92692"/> 
        </div>
        <div className='menu-item'>
          <pre className='pretty-json'> <GetForecastWeatherData type='main.temp' location="92692"/> </pre>
        </div>
      </div>
    </div>
  </React.StrictMode>
)

