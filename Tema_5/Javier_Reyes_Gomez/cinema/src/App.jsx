import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header.jsx';
import MovieList from './components/MoviesList/MovieList.jsx';
import Footer from './components/Footer/Footer.jsx';
import movies from './movies.js';  

function App() {

  return (
    <>
      <Header />
      <MovieList movies={movies} />
      <Footer />
    </>
  )
}

export default App
