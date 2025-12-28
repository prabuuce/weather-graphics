import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../../sass/bootstrap-custom.scss'; // Import custom Bootstrap SCSS

import '../../css/sass-css/elements.css'
import '../../css/sass-css/forecast.css'
import '../../css/sass-css/layout.css'
import '../../css/json.css'

import { WeatherIconSelector } from './weatherIcon/weatherIcons.jsx';
import { GetCurrentWeatherData } from '../fetching/currentWeatherData.jsx';
import { useEffect } from 'react';

export const CurrentWeatherDetails = ({ location }) => {
    const currentWeatherAll = GetCurrentWeatherData({ location });

    console.log(`CurrentWeatherDetails rendered with: ${location}`, currentWeatherAll);

    if (!currentWeatherAll || !currentWeatherAll.main) {
        return <div>Loading data...</div>;
    }

    const currentWeather = {
        "date": currentWeatherAll.dt,
        "location": currentWeatherAll.name,
        "weather": currentWeatherAll.weather,
        "main": currentWeatherAll.main,
        "wind": currentWeatherAll.wind
    };

    return <WeatherDetails location={location} weatherData={currentWeather} />;
}

export const WeatherDetails = ({ location, weatherData }) => {
    return (
        <div style={{"display": "flex", "flexDirection": "row", "overflow": "scroll"}}>
            <WeatherIconSelector location={location} />
            <div style={{ "flexDirection": "column", "overflow": "scroll" }}>
                <b>{weatherData["date"]}, {weatherData["location"]}</b>
                <h2 style={{ marginBottom: "0px" }}>{weatherData["main"]["temp"]}°C</h2>
                <div style={{ "display": "flex", "flexDirection": "row" }}>
                    <div style={{ "display": "flex", "flexDirection": "column", "margin": "10px" }}>
                        <small>Feels Like: {weatherData["main"]["feels_like"]} °C</small>
                        <small>Temp Range: {weatherData["main"]["temp_min"]}°C - {weatherData["main"]["temp_max"]}°C</small>
                    </div>
                    <hr />
                    <div style={{ "display": "flex", "flexDirection": "column", "margin": "10px" }}>
                        <small>Wind: {weatherData["wind"]["speed"]}mph @ {weatherData["wind"]["windAngle"]} deg</small>
                        <small>Humidity: {weatherData["main"]["humidity"]}% </small>
                    </div>
                </div>
            </div>
        </div>
    )
}