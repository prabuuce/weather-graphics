import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { requestToBackend } from './fetchCache'

function GetCurrentWeatherData({location}) {
  const [weatherData, setWeatherData] = useState(null)


  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/current/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Weather data: ", data);
        setWeatherData(data || {});
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  const handler = {
    get: function(target, prop, receiver) {
      if (weatherData === null) {
        return "Loading..."
      }

      return weatherData[prop]
    }
  }

  return new Proxy({}, handler);
}

GetCurrentWeatherData.propTypes = {
    location: PropTypes.string.isRequired,
};

export default GetCurrentWeatherData;