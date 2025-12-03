import { useState, useEffect } from 'react'
import './App.css'
import { use } from 'react'

function WeatherRender() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)

  const [location, setLocation] = useState('92692')
  const [locationWeather, setLocationWeather] = useState(null)


  useEffect(() => {
    // Check backend health
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setHealth(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
        setLoading(false)
      })
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/forecast/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Weather data:", data);
        setLocationWeather(data)
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
        setLoading(false)
      })
  }, [location])

  return (
    <div className="WeatherRender">
      
    </div>
  )
}

export default WeatherRender

