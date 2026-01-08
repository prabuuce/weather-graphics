import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import AspectRatio from '@mui/joy/AspectRatio';

import { CssVarsProvider } from '@mui/joy/styles';
import { InitJoy } from '../../styling/mui/globals';


import { colors } from "../../styling/globals/tokens.js"
import '../../styling/css/sass-css/components/weathers.css'
import '../../styling/css/sass-css/misc.css'
import { Divider } from '@mui/material';

const WeatherImg = ({ weatherData, ...props }) => {
    // Check if weatherData and necessary properties exist to avoid crash
    if (!weatherData || !Array.isArray(weatherData.weather) || !weatherData.weather[0]) {
        return null;
    }
    const weatherType = weatherData.weather[0].icon.slice(0, 2)
    // Using the corrected path we discovered earlier
    const imgPath = `/assets/icons/${weatherType}.png`

    return (
        <img 
            src={imgPath}
            alt={weatherData.weather[0].description || "Weather"}
            {...props}
            style={{ height: '100%',  width: '100%', objectFit: 'contain', ...props.style }}
        />
    )
}

const WeatherWidget = ({ weatherData }) => {
    const joyTheme = InitJoy();

    return (
        <CssVarsProvider theme={joyTheme}>
            <div className='weather-widget' style={{ width: "40%", aspectRatio: "2/1" }}>
                <div style={{ flex: "1", display: "flex", justifyContent: "center", alignSelf: "center" }}>
                    <WeatherImg weatherData={weatherData} style={{ width: "80%", height: "auto" }}/>
                </div>

                <div style={{ flex: "2" }}>
                    <div>
                        <p> {weatherData["name"]} | {new Date(weatherData["dt"]).toLocaleTimeString()} </p>
                        <h1> {weatherData["main"]["temp"]}°C </h1>
                        <p> {weatherData["main"]["temp_min"]}° ~ {weatherData["main"]["temp_max"]}° </p>
                    </div>

                    <Divider sx={{ p: "10px" }}/>

                    <div>
                        <p>Feels Like: {weatherData["main"]["feels_like"]}° </p>
                        <p>Humidity: {weatherData["main"]["humidity"]}% </p>
                        <p>Wind: NE {weatherData["wind"]["speed"]}mph</p>
                    </div>
                </div>
            </div>
        </CssVarsProvider>
    )
}

export default WeatherWidget;