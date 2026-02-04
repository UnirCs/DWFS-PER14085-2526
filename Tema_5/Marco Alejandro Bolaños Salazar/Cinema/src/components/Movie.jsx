import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Movie.css';
import he from 'he';

const Movie = ({ movie }) => {
    return (
        <div className="movie">
            <img className="movie--imagen" src={movie.imagen} alt={he.decode(movie.titulo)} />
            <h2>{he.decode(movie.titulo)}</h2>
            <p><strong>Sinopsis:</strong> {he.decode( movie.sinopsis)}</p>
            <p><strong>Duraci&oacute;n:</strong> {he.decode(movie.duracion)}</p>
            <p><strong>G&eacute;nero:</strong> {he.decode(movie.genero)}</p>
            <p><strong>Puntuaci&oacute;n:</strong> {movie.puntuacion}</p>
            <Link to={`/movies/${movie.id}`}>Seleccionar Asientos</Link>
        </div>
    );
};

export default Movie;
