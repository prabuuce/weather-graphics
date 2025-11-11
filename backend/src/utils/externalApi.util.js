/*
* 
* Access External APIs
* 
* This module contains utility functions to interact with external APIs,
* such as fetching weather data from a third-party weather service and transforming that
* data into a format suitable for our application. In this case, we're using
* Yahoo Weather API to get data.
*
*/

import { useEffect } from "react";

import { createWeatherData, createForecastData } from '../models/weather.model.js';
// import { WeatherSchema, ForecastSchema } from '../models/weather.model.js';

function fetchWeatherDataFromAPI(location) {
    const api_url = `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${location}&format=json&u=f`;
    const api_key = process.env.YAHOO_API_KEY;
    const api_secret = process.env.YAHOO_API_SECRET;

    useEffect(async () => {
        const weather_data = await fetch(api_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Yahoo-App-Id': api_key,
                'X-Yahoo-App-Secret': api_secret
            }
        }).catch(err => {
            console.error("Error fetching weather data:", err);
            return err
        });

        const weather_data_json = await weather_data.json();

        return createWeatherData(weather_data_json);

    }, [location]);
}

function fetchForecastDataFromAPI(location, days) {
    // TODO: Implement fetching forecast data from external API
}

export { fetchWeatherDataFromAPI, fetchForecastDataFromAPI };