import { useState, useEffect } from 'react'
import './App.css'
import { use } from 'react'

function App() {
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
    fetch(`/api/weather/${location}`)
      .then(res => res.json())
      .then(data => {
        setLocationWeather(data)
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
        setLoading(false)
      })
  }, [location])

  return (
    <div className="App">
      <header className="App-header">
        <h1> Ozone Weather Channel</h1>
        <div className='search'>
          <label for="location">Zip Code:</label>
          <form onSubmit={(e) => {
            e.preventDefault();
            setLocation(document.getElementById('location').value);
          }}>
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        </div>

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
            <p>Location: {locationWeather.location}</p>
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

