// The file which houses the parent class for ALL weather providers. Contains basic structure and validation.
// Specific providers (e.g., OpenWeather, WeatherAPI) will extend this class and implement their own data fetching logic with instance methods.

/**
* WeatherProvider Class
* @class WeatherProvider - Parent class for weather data providers
* @param {string} url - Base URL of the weather API
* @param {string} api_key - API key for authentication
* @returns {WeatherProvider} Instance of WeatherProvider
*/

class WeatherProvider {
	constructor(url, api_key) {
		this.url = url || '';
		this.api_key = api_key || '';
	}
	
	// Method to fetch current weather data for a given location
	async fetchCurrentWeather(location) {
		const api_key = this.api_key;
		const api_url = this.url;

		if (!api_key) {
			return {
				error: 'Missing API key',
				message: 'WEATHER_API_KEY is not set in the environment (backend/.env)'
			};
		}
		
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
			console.log('Fetched weather for', location, 'from', this.url);
			
			return json;

		} catch (err) {
			// Network or unexpected failure
			console.error('Error fetching weather data from API:', err);
			return {
				error: 'Failed to fetch weather data',
				message: err.message
			};
		}
	}
	
	// Method to fetch weather forecast data for a given location and number of days
	async fetchWeatherForecast(location, days) {
		throw new Error('fetchWeatherForecast() must be implemented by subclass');
	}
}

export default WeatherProvider;