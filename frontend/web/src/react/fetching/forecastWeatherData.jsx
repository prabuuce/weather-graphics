import { useState, useEffect } from 'react'
import { use } from 'react'

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

  return <pre className='pretty-json'>{JSON.stringify(weatherForecastData, null, 2)}</pre>

}

function GetForecastTempVal({location}) {
  const [tempValue, setTempValue] = useState()

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

  if (tempValue === undefined) {
    return {"Never": 16, "Gonna": 15, "Give": 17, "You": 13, "Up": 12}
  }

  return tempValue
}

function GetForecastWindVal({type, location}) {
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

export { GetForecastWeatherData, GetForecastTempVal, GetForecastWindVal };
