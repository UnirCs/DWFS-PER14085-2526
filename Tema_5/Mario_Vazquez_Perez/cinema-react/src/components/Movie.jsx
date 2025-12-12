import React from 'react';
import PropTypes from "prop-types";

function Movie({ title, image, synopsis, duration, genre, rating }) {
    return (
        <div className="movie-card">
            <div className="movie-image">
                <img src={image} alt={title} />
            </div>
            <div className="movie-info">
                <h2 className="movie-title">{title}</h2>
                <p className="movie-synopsis">{synopsis}</p>
                <div className="movie-details">
                    <p><strong>Duración:</strong> {duration} min</p>
                    <p><strong>Género:</strong> {genre}</p>
                    <p><strong>Puntuación:</strong> ⭐ {rating}/10</p>
                </div>
                <button className="movie-button">Seleccionar asientos</button>
            </div>
        </div>
    );
}


Movie.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Movie;