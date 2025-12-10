import { useState, useEffect } from 'react'
import { use } from 'react'

function GetWeatherData({type, location}) {
  const [weatherValue, setWeatherValue] = useState(null)


  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/${location}`)
      .then(res => res.json())
      .then(data => {
        const value = data["main"]["temp"]
        console.log("Weather data: ", data)
        console.log("Weather value: ", value);
        setWeatherValue(value);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location, type])

  return weatherValue + "°"

}

export default GetWeatherData

