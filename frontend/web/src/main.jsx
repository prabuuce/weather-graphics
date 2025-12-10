import React from 'react'
import ReactDOM from 'react-dom/client'

import './css/sass-css/index.css'
import './css/flex.css'
import './css/json.css'
import {GetWeatherData} from './react/fetching/weatherData.jsx'
import {GetTemperatureValue} from './react/fetching/weatherData.jsx'
import {GetWindData} from './react/fetching/weatherData.jsx'
import ForecastLineChart from './react/graphs/forecastLineChart.jsx'
import Gauge from './react/graphs/gauge.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='Row'>
      <div className='large-container menu'>
        <div className="menu-item">
          <GetTemperatureValue type='main.temp' location="92692"/>
        </div>   
      </div>
       <div className='large-container menu'>
        <div className="menu-item">
          <Gauge location="92692" />
        </div> 
      </div> 
      <div className='large-container body'>
        <div className='menu-item'>
          <ForecastLineChart />
        </div>
      </div>
    </div>
    <div className='Row'>
      <div className='large-container menu'>
        <div className="menu-item">
          <GetWindData type='main.temp' location="92692"/>
        </div>  
      </div>
      <div className='large-container body'>
        <div className='menu-item'>
          <GetWeatherData type='main.temp' location="92692"/> 
        </div>
      </div>
    </div>
  </React.StrictMode>,
)

