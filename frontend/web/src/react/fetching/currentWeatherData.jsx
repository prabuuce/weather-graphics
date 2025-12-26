import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { requestToBackend } from './fetchCache'

function GetCurrentWeatherData({location}) {
  const [weatherData, setWeatherData] = useState(null)


  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/current/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Weather data: ", data);
        setWeatherData(data);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  return <pre className='pretty-json'>{JSON.stringify(weatherData, null, 2)}</pre>

}

function GetCurrentTempVal({location}) {
  return JSON.stringify(requestToBackend(`current/temperature/${location}`))
}

function GetCurrentWindVal({location}) {
  const [windValue, setWindValue] = useState([])


  useEffect(() => {
    // Get weather data for a specific location (e.g., zip code 92692)
    fetch(`/api/weather/current/wind/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Wind value: ", data);
        setWindValue(data || []);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  return windValue;

}

function GetCurrentDateLoc({location}) {
  const [dateLocValue, setDateLocValue] = useState(null)

  useEffect(() => {
    fetch(`/api/weather/current/dateloc/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Date/Location value: ", data);
        setDateLocValue(data);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  if (dateLocValue === null) {
    return dateLocValue
  }

  return dateLocValue[0] + ', ' + dateLocValue[1]
}

function GetCurrentHumidity({location}) {
  const [humidityValue, setHumidityValue] = useState(null)

  useEffect(() => {
    fetch(`/api/weather/current/humidity/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Humidity value: ", data);
        setHumidityValue(data);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  return humidityValue
}

function GetCurrentFeelsLike({location}) {
  const [feelsLikeValue, setFeelsLikeValue] = useState(null)

  useEffect(() => {
    fetch(`/api/weather/current/feelslike/${location}`)
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

function GetCurrentTempRange({location}) {
  const [tempRangeValue, setTempRangeValue] = useState([])

  useEffect(() => {
    fetch(`/api/weather/current/temperature/range/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Temp range value: ", data);
        setTempRangeValue(data || []);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  return tempRangeValue
}

function GetCurrentWeatherType({location}) {
  const [weatherTypeValue, setWeatherTypeValue] = useState()

  useEffect(() => {
    fetch(`/api/weather/current/type/${location}`)
      .then(res => res.json())
      .then(data => {
        console.log("Weather type value: ", data);
        setWeatherTypeValue(data);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err)
      })
  }, [location])

  return weatherTypeValue
}

GetCurrentDateLoc.propTypes = {
    location: PropTypes.string.isRequired,
};

GetCurrentHumidity.propTypes = {
    location: PropTypes.string.isRequired,
};

GetCurrentFeelsLike.propTypes = {
    location: PropTypes.string.isRequired,
};

GetCurrentTempRange.propTypes = {
    location: PropTypes.string.isRequired,
};

GetCurrentWeatherType.propTypes = {
    location: PropTypes.string.isRequired,
};

GetCurrentWeatherData.propTypes = {
    location: PropTypes.string.isRequired,
};

GetCurrentTempVal.propTypes = {
    location: PropTypes.string.isRequired,
};

GetCurrentWindVal.propTypes = {
    location: PropTypes.string.isRequired,
};

export { GetCurrentWeatherData, GetCurrentTempVal, GetCurrentWindVal, GetCurrentDateLoc, GetCurrentHumidity, GetCurrentFeelsLike, GetCurrentTempRange, GetCurrentWeatherType };
