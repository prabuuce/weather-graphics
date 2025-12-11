import React from 'react'
import ReactDOM from 'react-dom/client'

import './css/sass-css/index.css'
import './css/flex.css'
import './css/json.css'
import {GetCurrentWeatherData, GetCurrentTempVal, GetCurrentWindVal} from './react/fetching/currentWeatherData.jsx'
import {GetForecastWeatherData, GetForecastTempVal} from './react/fetching/forecastWeatherData.jsx'

import ForecastLineChart from './react/graphs/forecastLineCharts.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='Row'>
      <div className='large-container menu'>
        <div className="menu-item">
          <GetCurrentTempVal type='main.temp' location="92692"/>
        </div>
      </div>   
      <div className='large-container body'>
        <div className='menu-item'>
          <ForecastLineChart/>
        </div>
      </div>
    </div>
    <div className='Row'>
      <div className='large-container menu'>
        <div className="menu-item">
          <GetCurrentWindVal type='main.temp' location="92692"/>
        </div> 
        <div className="menu-item">
          <GetForecastTempVal location="92692"/>
        </div> 
      </div>
      <div className='large-container body'>
        <div className='menu-item'>
          <GetCurrentWeatherData type='main.temp' location="92692"/> 
        </div>
        <div className='menu-item'>
          <GetForecastWeatherData type='main.temp' location="92692"/> 
        </div>
      </div>
    </div>
  </React.StrictMode>
)

