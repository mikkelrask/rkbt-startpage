import { useEffect, useState } from "react";
import GetWeatherData from "../../utils/weather"; 

const HeaderContainer = () => {
  const [weatherData, setWeatherData] = useState<string | null>(null)

  useEffect(() => {
    GetWeatherData().then((data) => {
      setWeatherData(data);
    });
  }, []);

  return (
    <>
      <div className="header-container">
        <h1>Velkommen hjem</h1>
        <div className="status-strip">
          <span className="date"></span>
          <span> | </span>
          <span className="time"></span>
          <span> | </span>
          <span className="weather">{weatherData}</span>
        </div>
      </div>
    </>
  );
};

export default HeaderContainer;
