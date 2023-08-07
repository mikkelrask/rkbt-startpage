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
      return "klar himmel ☀️";
    case "few clouds":
      return "få skyer 🌤️";
    case "ovecast clouds":
      return "overskyet ☁️";
    case "scattered clouds":
      return "spredte skyer ☁️";
    case "broken clouds":
      return "brudte skyer 🌥️";
    case "light rain":
      return "let regn 🌦️";
    case "shower rain":
      return "byger 🌧️";
    case "rain":
      return "regn 🌧️";
    case "thunderstorm":
      return "torden ⛈️";
    case "snow":
      return "sne ❄️";
    case "mist":
      return "tåge 🌫️";
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
    return kelvinToCelsius(data.main.temp) + "°C (" + translateDescription(data.weather[0].description) + ")";
  } catch (e) {
    console.error("Failed to fetch weather data. See response", e);
    return "☠️: " + e;
  }
};

export default GetWeatherData;
