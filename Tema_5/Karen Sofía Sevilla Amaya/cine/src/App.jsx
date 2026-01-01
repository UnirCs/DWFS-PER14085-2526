import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MovieList from './components/MovieList.jsx'


function App() {
  const [count, setCount] = useState(0)

 


  return (
    <>
       <Header/>
       <MovieList/>
       <Footer/>
    </>
  )
}

export default App
