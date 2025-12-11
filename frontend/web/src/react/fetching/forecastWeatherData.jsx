import { useState, useEffect } from 'react'
import { use } from 'react'

function GetForeWeatherDat({type, location}) {
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

  return <pre className='pretty-json'>{JSON.stringify(weatherForecastData, null, 2)}</pre>

}

function GetForeTempVal({type, location}) {
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

  return <pre className='pretty-json'>{JSON.stringify(temperatureValue, null, 2)+'°C'}</pre>

}

function GetForeWindVal({type, location}) {
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

export { GetForeWeatherDat, GetForeTempVal, GetForeWindVal };
