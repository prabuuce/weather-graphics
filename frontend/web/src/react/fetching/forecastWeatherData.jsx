import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function GetForecastWeatherData({ location }) {
  const [weatherForecastData, setWeatherForecastData] = useState(null)


  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/forecast/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Weather forecast data: ", data);
        setWeatherForecastData(data);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  const handler = {
    get: function(target, prop, receiver) {
      if (weatherForecastData === null) {
        return "Loading..."
      }

      return weatherForecastData[prop]
    }
  }

  return new Proxy({}, handler);

}

export default GetForecastWeatherData;
