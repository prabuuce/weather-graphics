import React from 'react';
import { CssVarsProvider } from "@mui/joy";
import { InitJoy } from "../../styling/mui/globals";

import { ButtonGroup } from "@mui/joy";
import { Button } from "@mui/joy";

import { colors } from "../../styling/globals/tokens";

const WeatherAccordianButtons = ({ widget, showWidget, data, setData, forecastWeatherData }) => {
    const weatherList = forecastWeatherData?.list || (Array.isArray(forecastWeatherData) ? forecastWeatherData : null);

    if (!weatherList) {
        return (
            <>
                <Button sx={{ border: `1px solid ${colors.color2}`, '&:hover': { backgroundColor: colors.color2 } }}>
                    Button
                </Button>
                <Button sx={{ border: `1px solid ${colors.color2}`, '&:hover': { backgroundColor: colors.color2 } }}>
                    Button
                </Button>
                <Button sx={{ border: `1px solid ${colors.color2}`, '&:hover': { backgroundColor: colors.color2 } }}>
                    Button
                </Button>
                <Button sx={{ border: `1px solid ${colors.color2}`, '&:hover': { backgroundColor: colors.color2 } }}>
                    Button
                </Button>
            </>
        );
    }

    return (
        <>
            {weatherList.map((weatherData, index) => (
                <Button 
                    key={index}
                    sx={{ border: `1px solid ${colors.color2}`, '&:hover': { backgroundColor: colors.color2 } }} 
                    onClick={() => {
                        if (showWidget) showWidget(true);
                        if (setData) setData(weatherList[index]);
                    }}
                >
                    {new Date(weatherData.dt * 1000).toLocaleString()}
                </Button>
            ))}
        </>
    );
}

const WeatherAccordian = ({ forecastWeatherData }) => {
    const theme = InitJoy();

    const [data, setData] = React.useState(null);
    const [widget, showWidget] = React.useState(false);

    return (
        <CssVarsProvider theme={theme}>
            <div style={{ flex: 1, overflowY: "auto", width: "100%", minHeight: 0 }}>
                <ButtonGroup variant="plain" orientation="vertical" aria-label="plain button group" sx={{ width: "100%" }}>
                    <WeatherAccordianButtons forecastWeatherData={forecastWeatherData} widget={widget} showWidget={showWidget} data={data} setData={setData} />
                </ButtonGroup>
            </div>
        </CssVarsProvider>
    );
}

export default WeatherAccordian;