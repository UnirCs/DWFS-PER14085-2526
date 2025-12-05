import React from 'react';
import '../styles/movie.css';

const formatDuration = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}min`;
};

const Movie = ({ movie }) => {

    const {
        titulo,
        imagenUrl,
        sinopsis,
        duracionMinutos,
        genero,
        puntuacion,
    } = movie;

    const handleSelectSeats = () => {
        console.log(`Preparado para reservar asientos para: ${titulo}`);
    };

    return (
        <div>
            <div>
                <img src={imagenUrl} alt={`Póster de la película ${titulo}`} />
            </div>
            <div>
                <div>
                    <h2 className="movie-title">{titulo}</h2>
                    <div>
                        <span>Puntuación: <span>{puntuacion.toFixed(1)} / 5</span></span>
                    </div>
                    <div>
                        <span> {genero} | {formatDuration(duracionMinutos)} </span>
                    </div>
                    <div>
                        <p>{sinopsis}</p>
                    </div>
                </div>
                <button class="movie-book" onClick={handleSelectSeats}>
                    Seleccionar Asientos
                </button>
            </div>
        </div>
    );
};

export default Movie;