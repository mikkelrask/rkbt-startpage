import React, { useEffect } from 'react';

const themeRandomizer = () => {
  const theme = [
    "pastel",
    "griffith",
    "guts",
    "sexy",
    "wms",
    "rack",
    "rocket",
    "SCM",
  ];
  const random = theme[Math.floor(Math.random() * theme.length)];
  return random;
};

const setTheme = (theme) => {
  document.documentElement.className = theme;
  localStorage.setItem("theme", theme);
};

const BigImage = () => {
  const savedTheme = localStorage.getItem("theme");

  useEffect(() => {
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const randomTheme = themeRandomizer();
      setTheme(randomTheme);
    }
  }, []);

  return (
    <>
      <div className="image-container">
        <img
          src="../../assets/Grafikforside.png"
          alt="Click Me"
          onClick={() => {
            const randomTheme = themeRandomizer();
            setTheme(randomTheme);
          }}
        />
      </div>
    </>
  );
};

export default BigImage;
