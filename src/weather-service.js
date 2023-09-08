export default class WeatherService {
  static getWeather(location) {
    let url;

    if (!isNaN(location)) {
      url = `http://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${process.env.API_KEY}`;
    } else {
      url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}`;
    }
    return fetch(url)
      .then(function(response) {
        
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })

      .catch(function(error) {
        return error;
      });
  }
}