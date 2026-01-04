import { GetCurrentWeatherType } from "../../fetching/currentWeatherData";
import weatherIconsConfig from "./weather-icon-config.json";

export const WeatherIconSelector = ({ location }) => {
    const weatherData = GetCurrentWeatherType({ location });
    const baseFilePath = "/assets/";

    // Display placeholder while data loads or on error.
    if (!weatherData || weatherData.length < 3) {
        return (
            <div>
                 {/* Fallback/Loading icon */}
                <img className="weather-icon" src={`${baseFilePath}weatherIcons/assets/icons/clear/clear-day.svg`} alt="Loading Weather Icon" />
            </div>
        );
    }

    const weatherId = weatherData[2]; // Assuming ID is the 3rd element: [main, description, id]
    const weatherDescription = weatherData[1];

    let iconPath = "weatherIcons/assets/icons/clear/clear-day.svg"; // Default

    if (weatherIconsConfig[weatherId]) {
        iconPath = weatherIconsConfig[weatherId].icon;
    }

    const dir = `${baseFilePath}${iconPath}`;

    return (
        <div title={weatherDescription}>
            <img className="weather-icon" src={dir} alt={weatherDescription || "Weather Icon"} />
        </div>
    );
};