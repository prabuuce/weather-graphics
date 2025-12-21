import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function GetCurrentWeatherData({location}) {
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
  }, [location])

  return <pre className='pretty-json'>{JSON.stringify(weatherData, null, 2)}</pre>

}

function GetCurrentTempVal({location}) {
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
  }, [location])

  return JSON.stringify(temperatureValue) + '°C'

}

function GetCurrentWindVal({location}) {
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
  }, [location])

  return JSON.stringify(windValue)

}

function GetCurrentDateLoc({location}) {
  const [dateLocValue, setDateLocValue] = useState(null)

  useEffect(() => {
    fetch(`/api/weather/current/dateloc/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Date/Location value: ", data);
        setDateLocValue(data);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  if (dateLocValue === null) {
    return dateLocValue
  }

  return dateLocValue[0] + ', ' + dateLocValue[1]
}

GetCurrentDateLoc.propTypes = {
    location: PropTypes.string.isRequired,
};

GetCurrentWeatherData.propTypes = {
    location: PropTypes.string.isRequired,
};

GetCurrentTempVal.propTypes = {
    location: PropTypes.string.isRequired,
};

GetCurrentWindVal.propTypes = {
    location: PropTypes.string.isRequired,
};

export { GetCurrentWeatherData, GetCurrentTempVal, GetCurrentWindVal, GetCurrentDateLoc };
