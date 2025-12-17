import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function GetForecastWeatherData({type, location}) {
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
  }, [location, type])

  return JSON.stringify(weatherForecastData)

}

function GetForecastTempVal({location}) {
  const [tempValue, setTempValue] = useState(null)

  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/forecast/temperature/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Temperature value: ", data);
        setTempValue(data);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  // Return an empty object while loading so consumers can safely call Object.keys/values
  if (tempValue == null) {
    return {}
  }

  return tempValue
}

function GetForecastTempRange({location}) {
  // Use an empty object as a safe default while fetching
  const [tempRange, setTempRange] = useState({})

  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/forecast/temperature/range/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Temperature range: ", data);
        setTempRange(data || {});
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  return tempRange
}

function GetForecastWindVal({type, location}) {
  // Use an empty array as the safe default while fetching
  const [windValue, setWindValue] = useState([])

  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/forecast/wind/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Wind data: ", data);
        setWindValue(data || []);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location, type])

  return windValue

}

export { GetForecastWeatherData, GetForecastTempVal, GetForecastTempRange, GetForecastWindVal };
