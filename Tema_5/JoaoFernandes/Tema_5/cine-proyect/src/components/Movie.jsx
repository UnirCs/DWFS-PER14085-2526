import React from 'react'
import '../styles/Movie.css'

function Movie({ movie }) {
  return (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={movie.poster}
        alt={movie.title}
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-meta">{movie.year} · {movie.duration} · {movie.genre}</p>
        <p className="movie-synopsis">{movie.synopsis}</p>
        <div className="movie-footer">
          <span className="movie-rating">⭐ {movie.rating}</span>
          <button className="seat-button" type="button">Seleccionar asientos</button>
        </div>
      </div>
    </div>
  )
}

export default Movie