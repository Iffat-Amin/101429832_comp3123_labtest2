import axios from "axios";

const API_URL = "http://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherData = async (city) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: city,
                appid: process.env.REACT_APP_WEATHER_API_KEY,
                units: "metric",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};
