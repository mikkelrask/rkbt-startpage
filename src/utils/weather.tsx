import config from "./config/config.tsx";

interface WeatherData {
  main: {
    temp: number;
  }
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

// kelvin to celsius
function kelvinToCelsius(k: number): number {
  return Math.round(k - 273.15);
}

// translate description 
function translateDescription(description: string): string {
  switch (description) {
    case "clear sky":
      return "☀️";
    case "few clouds":
      return "🌤️";
    case "overcast clouds":
      return "☁️";
    case "scattered clouds":
      return "☁️";
    case "broken clouds":
      return "🌥️";
    case "light rain":
      return "🌦️";
    case "shower rain":
      return "🌧️";
    case "rain":
      return "🌧️";
    case "thunderstorm":
      return "⛈️";
    case "snow":
      return "❄️";
    case "mist":
      return "🌫️";
    default:
      return description;
  }
}

const TOKEN = import.meta.env.VITE_OPENWEATHER_TOKEN as string;
const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${config.LAT}&lon=${config.LON}&appid=${TOKEN}`;

const GetWeatherData = async (): Promise<string | null> => {
  try {
    const response = await fetch(URL);
    const data = (await response.json()) as WeatherData;
    return kelvinToCelsius(data.main.temp).toString() + "°C " + translateDescription(data.weather[0].description);
  } catch (e) {
    console.error("Failed to fetch weather data. See response", e);
    return "☠️: " + `$e`;
  }
};

export default GetWeatherData;
