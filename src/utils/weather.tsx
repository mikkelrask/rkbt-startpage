import config from "./config/config.tsx";

interface WeatherData {
  main: {
    temp: string;
  }
  weather: {
    description: string;
    icon: string;
    temp: string;
  }[];
}


const TOKEN = import.meta.env.VITE_OPENWEATHER_TOKEN as string;

const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${config.LAT}&lon=${config.LON}&appid=${TOKEN}`;

const GetWeatherData = async (): Promise<string | null> => {
  try {
    const response = await fetch(URL);
    const data = (await response.json()) as WeatherData;
    return data.main.temp;
  } catch (e) {
    console.error("Failed to fetch weather data. See response", e);
    return null;
  }
};

export default GetWeatherData;
