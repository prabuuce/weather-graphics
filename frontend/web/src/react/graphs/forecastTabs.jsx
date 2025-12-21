import { GetForecastTempVal } from "../fetching/forecastWeatherData.jsx";

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ForecastTabs = ({ location }) => {
    const forecastData = GetForecastTempVal({ location });
    const times = Object.keys(forecastData);
    const temps = Object.values(forecastData);
    const numForecastItems = Math.min(6, times.length); // Use available data, up to 5

    return (
        <React.Fragment>
            {times.length > 0 ? (
                [...Array(numForecastItems)].map((_, index) => (
                    <div key={index} id="forecast-list">
                        <div className="forecast-list-item">{times[index]}</div>
                        <div className="forecast-list-item">{temps[index]}</div>
                    </div>
                ))
            ) : (
                <p>Loading forecast...</p>
            )}
        </React.Fragment>
    )
};

ForecastTabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.node.isRequired,
            content: PropTypes.node,
        })
    ),
    initial: PropTypes.number,
    onChange: PropTypes.func,
};

export default ForecastTabs;