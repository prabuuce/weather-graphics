import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)

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
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Graphics</h1>
        <p>Web Client</p>
        
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
      </header>
    </div>
  )
}

export default App

