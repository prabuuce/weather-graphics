import React from 'react'
import ReactDOM from 'react-dom/client'

import './css/sass-css/index.css'
import './css/flex.css'
import GetWeatherData from './react/fetching/weatherData.jsx'
import ForecastLineChart from './react/graphs/forecastLineChart.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='App'>
      <div className='large-container menu'>
        <div className="menu-item">
          <h2> <GetWeatherData type='main.temp' location="92692"/> </h2>
        </div>  
      </div>
      <div className='large-container body'>
        <div className='menu-item'>
          <ForecastLineChart />
        </div>
      </div>
    </div>
  </React.StrictMode>,
)

