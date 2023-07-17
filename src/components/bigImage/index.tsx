import React from 'react'


const themeRandomizer = () => {
    const theme = [ "pastel", "griffith", "guts", "sexy", "wms", "rack", "rocket", "SCM"]
    const random = theme[Math.floor(Math.random() * theme.length)]
    return random
    }
    
    const setTheme = () => {
        const selector = document.getElementsByClassName("image")[0]
        const savedTheme = localStorage.getItem('theme')
        if(savedTheme) {
            document.documentElement.className = savedTheme
        }
    
    
    
        selector.addEventListener("click", () => {
            const theme = themeRandomizer()
            document.documentElement.className = theme
            localStorage.setItem('theme', theme)
        })
    }
    
setTheme()

const bigImage = () => {
  return (
    <>
      <div className="">
        <img src="../../assets/images/Grafikforside.png" alt="bigImage" onClick={setTheme()} />
      </div>
    </>
  )
}

export default bigImage