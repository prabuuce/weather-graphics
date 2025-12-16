import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function GetCurrentWeatherData({type, location}) {
  const [weatherData, setWeatherData] = useState(null)


  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/current/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Weather data: ", data);
        setWeatherData(data);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location, type])

  return <pre className='pretty-json'>{JSON.stringify(weatherData, null, 2)}</pre>

}

function GetCurrentTempVal({type, location}) {
  const [temperatureValue, setTemperatureValue] = useState(null)


  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/current/temperature/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Temperature value: ", data);
        setTemperatureValue(data);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location, type])

  return JSON.stringify(temperatureValue) + '°C'

}

function GetCurrentWindVal({type, location}) {
  const [windValue, setWindValue] = useState(null)


  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/current/wind/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Wind value: ", data);
        setWindValue(data);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location, type])

  return <pre className='pretty-json'>{JSON.stringify(windValue, null, 2)}</pre>

}

GetCurrentWeatherData.propTypes = {
    type: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
};

GetCurrentTempVal.propTypes = {
    type: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
};

GetCurrentWindVal.propTypes = {
    type: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
};

export { GetCurrentWeatherData, GetCurrentTempVal, GetCurrentWindVal };
