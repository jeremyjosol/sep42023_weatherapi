import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(location) {
  let request = new XMLHttpRequest();
  let url;

  if (!isNaN(location)) {
    url = `http://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${process.env.API_KEYS}`;
  } else {
    url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEYS}`;
  }

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, location);
    } else {
      printError(this, response, location);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printError(request, apiResponse, location) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${location}:  ${request.status} ${request.statusText} ${apiResponse.message}`;
}

function printElements(apiResponse, location) {
  let farenheightTemp = (apiResponse.main.temp - 273.15) * 9/5 + 32;

  let farenheightTempFeelsLike = (apiResponse.main.feels_like - 273.15) * 9/5 + 32;

  document.querySelector('#showResponse').innerHTML = 
  `<h2>${location}</h2>
  <img src="https://openweathermap.org/img/wn/${apiResponse.weather[0].icon}@2x.png" id="icon" alt="Weather Icon"> <br />
  Humidity: ${apiResponse.main.humidity}% <br />
  Temperature: ${farenheightTemp.toFixed(2)}°F <br />
  Feels like: ${farenheightTempFeelsLike.toFixed(2)}°F`

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