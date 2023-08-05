import config from "./config/config.tsx";

interface WeatherData {
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

// calculate fahrenheit to celsius
function fahrenheitToCelsius(f: number): number {
  console.log("f", f);
  const c = (f - 32) * (5 / 9);
  console.log("c", c);
  return Math.round(c);
}

// translate description 
function translateDescription(description: string): string {
  switch (description) {
    case "clear sky":
      return "klar himmel ☀️";
    case "few clouds":
      return "få skyer 🌤️";
    case "scattered clouds":
      return "spredte skyer ☁️";
    case "broken clouds":
      return "brudte skyer 🌥️";
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

const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${config.LAT}&lon=${config.LON}&appid=${TOKEN}&units=imperial`;
const ICON = 'https://openweathermap.org/img/wn/'
const ICON_EXT = '@2x.png'

const GetWeatherData = async (): Promise<string | null> => {
  try {
    const response = await fetch(URL);
    const data = (await response.json()) as WeatherData;
    console.log("data", data);
    console.log("description", data.weather[0].description);
    return fahrenheitToCelsius(data.main.temp) + "°C (" + translateDescription(data.weather[0].description) + ")";
  } catch (e) {
    console.error("Failed to fetch weather data. See response", e);
    return "☠️";
  }
};

export default GetWeatherData;
