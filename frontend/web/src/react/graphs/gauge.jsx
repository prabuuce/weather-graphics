import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';

function Gauge({ location }) {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/weather/current/temperature/${location}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.message);
        } else {
          setTemperature(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Normalize temperature to a value between 0 and 1
  // Assuming a range of 0 to 40 degrees Celsius
  const normalizedTemperature = temperature / 40;

  return (
    <GaugeChart
      id="gauge-chart"
      nrOfLevels={20}c
      percent={normalizedTemperature}
      arcWidth={0.3}
      colors={['#667eea', '#f56565']}
      textColor="#000000"
    />
  );
}

export default Gauge;
