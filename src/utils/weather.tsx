import config from "./config/config.js";

const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${config.LAT}&lon=${config.LON}&appid=${config.TOKEN}`;

console.log(URL, config.TOKEN, config.LAT, config.LON);

const GetWeatherData = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data.weather[0].main);
    console.log(data.weather[0].main.toLowerCase());
    return data.weather[0];
  } catch (e) {
    console.error("Failed to fetch weather data. See response", e);
    return null;
  }
};

export default GetWeatherData;
