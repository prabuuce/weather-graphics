import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
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
    // Get Example Weather data
    fetch('/api/weather/92692')
      .then(res => res.json())
      .then(data => {
        setLocationWeather(data)
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1> Ozone Weather Graphics Channel</h1>
        <p>This is the web Client</p>
        
        {loading ? (
          <p>Connecting to backend...</p>
        ) : health ? (
          <div className="health-status">
            <p>✅ Backend Connected</p>
            <p>Status: {health.status}</p>
            <p>Uptime: {Math.floor(health.uptime)}s</p>
          </div>
        ) : (
          <p>❌ Backend not available</p>
        )}
        {locationWeather && (
          <div className="weather-data">
            <h2>Weather Data</h2>
            <p> LocationL {locationWeather.location}</p>
            <p>Temperature: {locationWeather.temperature}°F</p>
            <p>Condition: {locationWeather.condition}</p>
            <p>Humidity: {locationWeather.humidity}%</p>
            <p>Wind Speed: {locationWeather.windSpeed} mph</p>
            <p>Timestamp: {new Date(locationWeather.timestamp).toLocaleString()}</p>
          </div>
        )}
      </header>
    </div>
  )
}

export default App

