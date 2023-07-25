import config from './config/config.js';

const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${config.LAT}&lon=${config.LON}&appid=${config.TOKEN}`

const GetWeatherData = async () => {
    
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    console.log(response);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (data.weather);
  } catch (e) {
    console.error('Failed to fetch weather data. See response', e);
    return null;
    }
  }
 
GetWeatherData();