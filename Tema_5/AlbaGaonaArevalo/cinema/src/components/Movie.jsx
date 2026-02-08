import React from "react";
import PropTypes from "prop-types";

export const Movie = ({ title, img, synopsis, length, genre, rating }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <div className="data">
                <div className="poster">
                    <img src={img} alt={title}/>
                </div>
                <div className="info">
                    <p><strong>Sinopsis</strong>: {synopsis}</p>
                    <p><strong>Duración</strong>: {length}</p>
                    <p><strong>Género</strong>: {genre}</p>
                    <p><strong>Calificación</strong>: {rating}</p>
                    <button>Seleccionar asientos</button>
                </div>
            </div>
        </div>
    );
};

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    img: PropTypes.string,
    synopsis: PropTypes.string,
    length: PropTypes.number,
    genre: PropTypes.string,
    rating: PropTypes.number
};