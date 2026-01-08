import { GetForecastTempVal, GetForecastWindVal, GetForecastTempRange, GetForecastFeelsLike, GetForecastHumidity } from "../../react/fetching/forecastWeatherData.jsx";
import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import { WeatherDetails } from './weatherDetails.jsx';

const AccordianWeatherView = ({ location, activeIndex, onSelectTab }) => {
    const forecast = GetForecastWeatherData({ location });

    const forecastDataAll = [];
    if (forecast && forecast.list) {
        for (const timestamp of forecast.list) {
            forecastDataAll.push({
                "date": timestamp.dt_txt,
                "location": timestamp.name,
                "weather": timestamp.weather,
                "main": timestamp.main,
                "wind": timestamp.wind
            });
        }
    }
    
    const numForecastItems = forecastDataAll.length;

    // If there's no data yet, show a loading message
    if (numForecastItems === 0) {
        return <p>Loading forecast...</p>;
    }

    return (
        <Accordion activeKey={activeIndex} onSelect={onSelectTab} style={{"flexGrow": 1}}>
            {forecastDataAll.map((weatherData, index) => {
                return (
                    <Accordion.Item eventKey={String(index)} key={index}>
                        <Accordion.Header className="forecast-list">
                            <span className="forecast-list-item">{weatherData["date"]}</span>
                            <span className="forecast-list-item" style={{textAlign: "right"}}>{weatherData["main"]["temp"]}°C</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <WeatherDetails location={location} weatherData={weatherData} />
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};

AccordianWeatherView.propTypes = {
    // You can define your propTypes here if needed(
    location: PropTypes.string.isRequired,
    activeIndex: PropTypes.string.isRequired,
    onSelectTab: PropTypes.func.isRequired,
};

export default AccordianWeatherView;