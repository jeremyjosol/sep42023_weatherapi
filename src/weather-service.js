export default class WeatherService {
  static getWeather(location) {
    let url;

    if (!isNaN(location)) {
      url = `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=12458acc5b0240da799db18d4f1bb10b`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=12458acc5b0240da799db18d4f1bb10b`;
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