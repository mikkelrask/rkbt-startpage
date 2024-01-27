import { useEffect } from 'react';

type Theme = "pastel" | "griffith" | "guts" | "sexy" | "wms" | "rack" | "rocket" | "SCM";

const themeRandomizer = (): Theme => {
  const themeOptions: Theme[] = [
    "pastel",
    "griffith",
    "guts",
    "sexy",
    "wms",
    "rack",
    "rocket",
    "SCM",
  ];
  const random = themeOptions[Math.floor(Math.random() * themeOptions.length)];
  return random;
};

const setTheme = (theme: Theme) => {
  document.documentElement.className = theme;
  localStorage.setItem("theme", theme);
};

const BigImage = () => {
  const savedTheme = localStorage.getItem("theme") as Theme | null;

  useEffect(() => {
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const randomTheme = themeRandomizer();
      setTheme(randomTheme);
    }
  }, []);

  return (
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
  );
};

export default BigImage;
