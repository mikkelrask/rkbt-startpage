import config from "./config/config.tsx";

interface WeatherData {
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

const TOKEN = import.meta.env.VITE_OPENWEATHER_TOKEN as string;

const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${config.LAT}&lon=${config.LON}&appid=${TOKEN}`;

console.log(URL, TOKEN, config.LAT, config.LON);

const GetWeatherData = async (): Promise<string | null> => {
  try {
    const response = await fetch(URL);
    const data = (await response.json()) as WeatherData;
    console.log(data.weather[0].main);
    console.log(data.weather[0].description);
    console.log(data.weather[0].icon);
    return data.weather[0].description;
  } catch (e) {
    console.error("Failed to fetch weather data. See response", e);
    return null;
  }
};

export default GetWeatherData;
