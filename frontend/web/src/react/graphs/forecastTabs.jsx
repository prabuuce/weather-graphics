import { GetForecastTempVal, GetForecastWindVal, GetForecastTempRange, GetForecastFeelsLike, GetForecastHumidity } from "../fetching/forecastWeatherData.jsx";
import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';

const ForecastTabs = ({ location, activeIndex, onSelectTab }) => {
    const forecastTemps = GetForecastTempVal({ location });
    const forecastWind = GetForecastWindVal({ location });
    const forecastRange = GetForecastTempRange({ location });
    const forecastFeels = GetForecastFeelsLike({ location });
    const forecastHumidity = GetForecastHumidity({ location });

    const times = Object.keys(forecastTemps);
    const temps = Object.values(forecastTemps);
    const wind = Object.values(forecastWind);
    const tempRanges = Object.values(forecastRange);
    const feelsLike = Object.values(forecastFeels);
    const humidity = Object.values(forecastHumidity);

    const numForecastItems = Math.min(5, times.length, temps.length, wind.length, tempRanges.length);

    // If there's no data yet, show a loading message
    if (times.length === 0) {
        return <p>Loading forecast...</p>;
    }

    return (
        <Accordion activeKey={activeIndex} onSelect={onSelectTab} style={{"flexGrow": 1}}>
            {[...Array(numForecastItems)].map((_, index) => (
                <Accordion.Item eventKey={String(index)} key={index}>
                    <Accordion.Header className="forecast-list">
                        <span className="forecast-list-item">{times[index]}</span>
                        <span className="forecast-list-item" style={{textAlign: "right"}}>{temps[index]}°C</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="widget" style={{margin: "0px"}}>
                            <div style={{"display": "flex", "flexDirection": "column", "margin": "10px"}}>
                                <small>Feels Like: {feelsLike[index]}°C</small>
                                <small>Temp Range: {tempRanges[index][0]}°C - {tempRanges[index][1]}°C</small>
                            </div>
                            <hr/>
                            <div style={{"display": "flex", "flexDirection": "column", "margin": "10px"}}>
                                <small>Humidity: {humidity[index]}%</small>
                                <small>Wind: {wind[index][0]}mph @ {wind[index][1]} deg</small>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
};

ForecastTabs.propTypes = {
    // You can define your propTypes here if needed
    location: PropTypes.string.isRequired,
    activeIndex: PropTypes.string.isRequired,
    onSelectTab: PropTypes.func.isRequired,
};

export default ForecastTabs;
