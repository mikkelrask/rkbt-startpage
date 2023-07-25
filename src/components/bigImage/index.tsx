
const themeRandomizer = () => {
  const theme = ["pastel", "griffith", "guts", "sexy", "wms", "rack", "rocket", "SCM"];
  const random = theme[Math.floor(Math.random() * theme.length)];
  return random;
};

const setTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.className = savedTheme;
  }

  const theme = themeRandomizer();
  document.documentElement.className = theme;
  localStorage.setItem('theme', theme);
};

const BigImage = () => {
  return (
    <>
      <div className="image-container">
        <img src="../../../src/assets/Grafikforside.png" alt="Click Me" onClick={setTheme} />
      </div>
    </>
  );
};

export default BigImage;
