import { GetForecastTempVal } from "../fetching/forecastWeatherData.jsx";
import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';

const ForecastTabs = ({ location, activeIndex, onSelectTab }) => {
    const forecastData = GetForecastTempVal({ location });
    const times = Object.keys(forecastData);
    const temps = Object.values(forecastData);
    const numForecastItems = Math.min(5, times.length);

    // If there's no data yet, show a loading message
    if (times.length === 0) {
        return <p>Loading forecast...</p>;
    }

    return (
        <Accordion activeKey={activeIndex} onSelect={onSelectTab}>
            {[...Array(numForecastItems)].map((_, index) => (
                <Accordion.Item eventKey={String(index)} key={index}>
                    <Accordion.Header className="forecast-list">
                        <span className="forecast-list-item">{times[index]}</span>
                        <span className="forecast-list-item">{temps[index]}</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="widget" style={{margin: "0px"}}>
                            Merry Christmas
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
