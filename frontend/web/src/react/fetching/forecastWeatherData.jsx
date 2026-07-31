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
  const [tempValue, setTempValue] = useState({})

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

  return tempValue
}

function GetForecastFeelsLike({location}) {
  const [feelsLikeValue, setFeelsLikeValue] = useState({})

  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/forecast/feelslike/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Feels like value: ", data);
        setFeelsLikeValue(data);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  return feelsLikeValue
}

function GetForecastHumidity({location}) {
  const [humidityValue, setHumidityValue] = useState({})

  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/forecast/humidity/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Humidity value: ", data);
        setHumidityValue(data || {});
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  return humidityValue
}

function GetForecastTempRange({location}) {
  // Use an empty object as a safe default while fetching
  const [tempRange, setTempRange] = useState({});

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
  // Use an empty object as the safe default while fetching
  const [windValue, setWindValue] = useState({})

  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/forecast/wind/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Wind data: ", data);
        setWindValue(data || {});
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location, type])

  return windValue

}

export { GetForecastWeatherData, GetForecastTempVal, GetForecastFeelsLike, GetForecastHumidity, GetForecastTempRange, GetForecastWindVal };
