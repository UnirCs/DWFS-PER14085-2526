import React from 'react'
import Movie from './Movie.jsx'
import moviesData from '../data/movies.json'
import '../styles/Movies.css'

function MovieList() {
  return (
    <main className="movie-grid">
      {moviesData.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </main>
  )
}

export default MovieList
