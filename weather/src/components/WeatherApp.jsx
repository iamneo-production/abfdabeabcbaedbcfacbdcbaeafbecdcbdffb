import axios from 'axios';
import React, { useState, useEffect } from 'react';


const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');

  const API_KEY = 'dd94f859a0e52d6e4767fddf735f04a7'; // Your API Key

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line
  }, [location]);

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
     
      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Feels Like: {Math.round(weatherData.main.feels_like - 273.15)}°C</p>
          <p>Min Temperature: {Math.round(weatherData.main.temp_min - 273.15)}°C</p>
          <p>Max Temperature: {Math.round(weatherData.main.temp_max - 273.15)}°C</p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Visibility: {weatherData.visibility} meters</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Wind Direction: {weatherData.wind.deg}°</p>
        </div>
      )}

    <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default WeatherApp;
