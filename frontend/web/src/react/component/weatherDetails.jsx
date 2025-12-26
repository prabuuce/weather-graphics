const WeatherDetails = (location, index = 0, values = { "times": 1900-1-1, "wind": 0, "temp": 0, "tempRange": [0, 0], "feelsLike": 0, "humidity": 0 }) => {
    return (
        <div>
            <img src="/imgs/clear.png" alt="Weather Icon"/>
            <div style={{"flexDirection": "column"}}>
                <b><GetCurrentDateLoc location={location}/></b>
                <h2 style={{marginBottom: "0px"}}><GetCurrentTempVal type='main.temp' location={location}/>°C</h2>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <div style={{"display": "flex", "flexDirection": "column", "margin": "10px"}}>
                        <small>Feels Like: <GetCurrentFeelsLike location={location}/>°C</small>
                        <small>Temp Range: {GetCurrentTempRange({ "location": location })[0]}°C -
                               {GetCurrentTempRange({ "location": location })[1]}°C
                        </small>
                    </div>
                    <hr/>
                    <div style={{"display": "flex", "flexDirection": "column", "margin": "10px"}}>
                        <small>Wind: {GetCurrentWindVal({ "location": location })["speed"]}mph @ {GetCurrentWindVal({"location": location })["deg"]} deg</small>
                        <small>Humidity: <GetCurrentHumidity location={location}/>%</small>
                    </div>
                </div>
            </div>
        </div>
    )
}