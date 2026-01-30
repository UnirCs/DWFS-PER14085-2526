import React from 'react';

const Movie = ({ movie }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', width: '300px', color: '#333', background: '#fff' }}>
            <img src={movie.imageUrl} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
            <h3>{movie.title}</h3>
            <p><strong>Sinopsis:</strong> {movie.synopsis}</p>
            <p><strong>Duración:</strong> {movie.duration}</p>
            <p><strong>Género:</strong> {movie.genre}</p>
            <p><strong>Puntuación:</strong> {movie.rating}</p>
            <button onClick={() => alert(`Ir a selección de asientos para ${movie.title}`)}>
                Seleccionar Asientos
            </button>
        </div>
    );
};

export default Movie;
