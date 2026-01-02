import React from "react";
import "../estilos/movie.css";

function Movie({ title, image, synopsis, duration, genre, rating }) {
    return (
        <div className="movie-card">
            <img src={image} alt={title} className="movie-image" />
            <h2>{title}</h2>
            <p><strong>Sinopsis:</strong> {synopsis}</p>
            <p><strong>Duración:</strong> {duration} min</p>
            <p><strong>Género:</strong> {genre}</p>
            <p><strong>Puntuación:</strong> ⭐ {rating}/10</p>
            <button className="movie-button">Seleccionar Asientos</button>
        </div>
    );
}

export default Movie;
