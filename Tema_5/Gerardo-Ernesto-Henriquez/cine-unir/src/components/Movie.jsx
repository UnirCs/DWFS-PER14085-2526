import React from 'react';
import '../styles/Movie.css';

function Movie({ title, image, synopsis, duration, genre, rating }) {
    
    const handleSelectSeats = () => {
        alert(`Has seleccionado ver: ${title}. (Funcionalidad pendiente)`);
    };

    return (
        <div className="movie-card">
            <img src={image} alt={title} className="movie-image" />
            
            <div className="movie-info">
                <h3>{title}</h3>
                <p><strong>Género:</strong> {genre}</p>
                <p><strong>Duración:</strong> {duration} min</p>
                <p><strong>Puntuación:</strong> {rating}/10</p>
                <p><strong>Sinopsis:</strong> {synopsis}</p>
                <button className="movie-button" onClick={handleSelectSeats}>
                    Seleccionar Asientos
                </button>
            </div>
 
        </div>
    );
}

export default Movie;