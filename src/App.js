import React, { useState } from "react";
import { fetchWeatherData } from "./WeatherService";
import './App.css';


const getBackgroundColor = (condition) => {
    switch (condition) {
        case "Clear":
            return "linear-gradient(to right, #83a4d4, #b6fbff)";
        case "Rain":
            return "linear-gradient(to right, #4e54c8, #8f94fb)";
        case "Clouds":
            return "linear-gradient(to right, #bdc3c7, #2c3e50)";
        default:
            return "linear-gradient(to right, #83a4d4, #b6fbff)";
    }
};

const App = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    const handleSearch = async () => {
        try {
            const data = await fetchWeatherData(city);
            setWeather(data);
        } catch (error) {
            alert("City not found. Please try again.");
        }
    };

    const weatherCondition = weather?.weather[0].main || "Default";
    const appStyle = {
        background: getBackgroundColor(weatherCondition),
        height: "100vh",
        color: "white",
        padding: "20px",
        textAlign: "center",
    };

    return (
        <div style={appStyle} className="d-flex flex-column justify-content-center align-items-center">
            <div className="card shadow p-4" style={{ width: "30rem", backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "15px" }}>
                <h1 className="mb-4">Weather App</h1>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                {weather && (
                    <div className="text-center">
                        <h2>{weather.name}</h2>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="Weather Icon"
                        />
                        <p className="text-muted">{weather.weather[0].description}</p>
                        <p>
                            <strong>Temperature:</strong> {weather.main.temp}°C
                        </p>
                        <p>
                            <strong>Feels Like:</strong> {weather.main.feels_like}°C
                        </p>
                        <p>
                            <strong>Wind Speed:</strong> {weather.wind.speed} m/s
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
