import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js';

// Business Logic

function getWeather(location) {
  WeatherService.getWeather(location)
    .then(function(response) {
      if (response.main) {
        printElements(response, location);
      } else {
        printError(response, location);
      }
    });
}

// UI Logic

function printError(response, location) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${location}:  ${response} ${response.statusText} ${response.message}`;
}

function printElements(response, location) {
  let farenheightTemp = (response.main.temp - 273.15) * 9/5 + 32;
  let farenheightTempFeelsLike = (response.main.feels_like - 273.15) * 9/5 + 32;

  document.querySelector('#showResponse').innerHTML = 
    `<h2>${location}</h2>
    <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" id="icon" alt="Weather Icon"> <br />
    Humidity: ${response.main.humidity}% <br />
    Temperature: ${farenheightTemp.toFixed(2)}°F <br />
    Feels like: ${farenheightTempFeelsLike.toFixed(2)}°F`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const location = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(location);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});