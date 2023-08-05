import BigImage from "./components/bigImage/index.tsx";
import UpdatedAt from "./components/updatedAt/index.tsx";
import HeaderContainer from "./components/HeaderContainer/index.tsx";
import Categories from "./components/CategoryColumn/index.tsx";
import "./App.css";

function App() {
  return (
    <>
      <BigImage />
      <div className="right-container">
        <HeaderContainer />
        <div className="card-container">
          <Categories />
        </div>
      </div>
      <UpdatedAt />
    </>
  );
}

export default App;
