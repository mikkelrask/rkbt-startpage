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
    case "moderate rain":
      return "🌧️";
    case "light intensity drizzle":
      return "🌧️";
    case "light intensity shower rain":
      return "🌦️";
    case "shower rain":
      return "🌧️";
    case "rain":
      return "🌧️";
    case "heavy intensity rain":
      return "🌧️";
    case "very heavy rain":
      return "🌧️";
    case "extreme rain":
      return "🌧️";
    case "freezing rain":
      return "🌧️";
    case "thunderstorm with light rain":
      return "⛈️";
    case "thunderstorm with rain":
      return "⛈️";
    case "thunderstorm with heavy rain":
      return "⛈️";
    case "light thunderstorm":
      return "⛈️";
    case "thunderstorm with light drizzle":
      return "⛈️";
    case "thunderstorm with drizzle":
      return "⛈️";
    case "thunderstorm with heavy drizzle":
      return "⛈️";
    case "thunderstorm":
      return "⛈️";
    case "snow":
      return "❄️";
    case "light snow":
      return "❄️";
    case "heavy snow":
      return "❄️";
    case "sleet":
      return "❄️";
    case "shower sleet":
      return "❄️";
    case "light shower sleet":
      return "❄️";
    case "rain and snow":
      return "❄️";
    case "light shower snow":
      return "❄️";
    case "shower snow":
      return "❄️";
    case "heavy shower snow":
      return "❄️";
    case "mist":
      return "🌫️";
    case "smoke":
      return "🌫️";
    case "haze":
      return "🌫️";
    case "sand/ dust whirls":
      return "🌫️";
    case "fog":
      return "🌫️";
    case "sand":
      return "🌫️";
    case "dust":
      return "🌫️";
    case "volcanic ash":
      return "🌋";
    case "squalls":
      return "🌬️";
    case "tornado":
      return "🌪️";
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
