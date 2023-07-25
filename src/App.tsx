import BigImage from './components/bigImage/index.tsx'
import UpdatedAt from './components/updatedAt/index.tsx'
import HeaderContainer from './components/HeaderContainer/index.tsx'
import './App.css'


function App() {

  return (
    <>
      <UpdatedAt text="Opdateret d. " date={new Date().toString()} />
      <div>
        <BigImage />
      </div>
      <HeaderContainer />
      <div className="content-container">
        
      </div>
    </>
  )
}

export default App
