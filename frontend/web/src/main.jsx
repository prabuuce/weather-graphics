import React from 'react'
import ReactDOM from 'react-dom/client'

import './css/sass-css/index.css'
import './css/flex.css'
import './css/json.css'
import {GetCurWeatherDat} from './react/fetching/currentWeatherData.jsx'
import {GetCurTempVal} from './react/fetching/currentWeatherData.jsx'
import {GetCurWindVal} from './react/fetching/currentWeatherData.jsx'

import {GetForeWeatherDat} from './react/fetching/forecastWeatherData.jsx'

import ForecastLineChart from './react/graphs/forecastLineChart.jsx'
import Gauge from './react/graphs/gauge.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='Row'>
      <div className='large-container menu'>
        <div className="menu-item">
          <GetCurTempVal type='main.temp' location="92692"/>
        </div>
      </div>   
      <div className='large-container body'>
        <div className='menu-item'>
          <ForecastLineChart />
        </div>
        <div className="menu-item">
          <Gauge location="92692"/>
        </div>
      </div>
    </div>
    <div className='Row'>
      <div className='large-container menu'>
        <div className="menu-item">
          <GetCurWindVal type='main.temp' location="92692"/>
        </div>  
      </div>
      <div className='large-container body'>
        <div className='menu-item'>
          <GetCurWeatherDat type='main.temp' location="92692"/> 
        </div>
        <div className='menu-item'>
          <GetForeWeatherDat type='main.temp' location="92692"/> 
        </div>
      </div>
    </div>
  </React.StrictMode>
)

