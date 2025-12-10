import { useState, useEffect } from 'react'
import { use } from 'react'

function GetTemperatureValue({type, location}) {
  const [temperatureValue, setTemperatureValue] = useState(null)


  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/temperature/${location}`)
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

function GetWindData({type, location}) {
  const [windValue, setWindValue] = useState(null)


  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/wind/${location}`)
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

function GetWeatherData({type, location}) {
  const [weatherData, setWeatherData] = useState(null)


  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/${location}`)
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

export { GetWeatherData, GetTemperatureValue, GetWindData };
