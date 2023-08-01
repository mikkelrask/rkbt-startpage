import { useEffect, useState } from 'react';
import { T } from '@tolgee/react';
import GetWeatherData from '../../utils/weather'; // Remove the 'default' keyword

const HeaderContainer = () => {
  const [weatherData, setWeatherData] = useState('');

  useEffect(() => {
    GetWeatherData().then((data) => {
      setWeatherData(data);
    });
  }, []);

  return (
    <>
      <div className="header-container">
        <h1><T keyName="Velkommen hjem" /></h1>
        <div className="status-strip">
          <span className="date"></span>
          <span> | </span>
          <span className="time"></span>
          <span> | </span>
          <span className="weather">
            {weatherData}
          </span>
        </div>
      </div>
    </>
  );
};

export default HeaderContainer;
