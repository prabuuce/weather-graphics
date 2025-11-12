/*
 * Access External APIs
 *
 * Utility functions to interact with external weather APIs and normalize
 * responses for the service layer. This module is intended to run in Node.js
 * (backend) so it must not import React or use React hooks.
 */

import fetch from 'node-fetch';
import { createWeatherData, createForecastData } from '../models/weather.model.js';

const zipify = (zip, api_key) => `${process.env.WEATHER_API_URL}?zip=${encodeURIComponent(zip)},us&appid=${api_key}&units=${process.env.WEATHER_API_UNITS || 'metric'}`;
const cityify = (city, api_key) => `${process.env.WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${api_key}&units=${process.env.WEATHER_API_UNITS || 'metric'}`;

function addressify(address, api_key) {
    /* 
    * Fun fact: OpenWeather API does not have a dedicated address endpoint. YAYYYYYYYYYYYYYYYYYYYYY!!!!!11!! Instead, we have to transalate the address
    * to a lat/lon pair using a geocoding API, then use that to fetch weather.
    */
    const lat = 0;
    const lon = 0;

    // TODO: Implement geocoding API call to get lat/lon from address

    return `${process.env.WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${api_key}&units=${process.env.WEATHER_API_UNITS || 'metric'}`;
}

function buildApiUrl(location, api_key) {
    // If the location is a 5-digit US ZIP code, use the `zip` parameter for better results
    if (/^\d{5}$/.test(location)) {
        return zipfy(location);
    }
    // Otherwise treat it as a city name / query
    return `${process.env.WEATHER_API_URL}?q=${encodeURIComponent(location)}&appid=${api_key}&units=${process.env.WEATHER_API_UNITS || 'metric'}`;
}

async function fetchWeatherDataFromAPI(location) {
    const api_key = process.env.WEATHER_API_KEY;
    if (!api_key) {
        return {
            error: 'Missing API key',
            message: 'WEATHER_API_KEY is not set in the environment (backend/.env)'
        };
    }

    const api_url = buildApiUrl(location, api_key);

    try {
        const res = await fetch(api_url);

        if (!res.ok) {
            // Try to parse body for a helpful error message
            let body;
            try {
                body = await res.json();
            } catch (e) {
                body = await res.text();
            }
            const message = body && body.message ? body.message : JSON.stringify(body);
            return {
                error: 'Failed to fetch weather data',
                status: res.status,
                message
            };
        }

        const json = await res.json();

        // Map OpenWeather response to our internal shape expected by createWeatherData
        const formatted = {
            location: json.name || location,
            temperature: json.main?.temp ?? null,
            condition: json.weather?.[0]?.main ?? '',
            humidity: json.main?.humidity ?? null,
            windSpeed: json.wind?.speed ?? null,
            timestamp: new Date((json.dt ?? Date.now() / 1000) * 1000).toISOString()
        };

        // Avoid logging secrets (do not log api_key)
        console.debug('Fetched weather for', location, 'from', api_url);

        return createWeatherData(formatted);
    } catch (err) {
        // Network or unexpected failure
        console.error('Error fetching weather data from API:', err);
        return {
            error: 'Failed to fetch weather data',
            message: err.message
        };
    }
}

function fetchForecastDataFromAPI(location, days) {
    // TODO: Implement fetching forecast data from external API (e.g., OpenWeather /forecast or /onecall)
    return {
        error: 'Not implemented',
        message: 'Forecast fetching is not implemented yet'
    };
}

export { fetchWeatherDataFromAPI, fetchForecastDataFromAPI };