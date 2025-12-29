import React from "react";
import PropTypes from "prop-types";

export default function Movie({ movie }) {
  return (
    <div className="movie-card">
      <img src={"/" + movie.image} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.synopsis}</p>
      <p className="details">{movie.duration} | {movie.genre}</p>
    </div>
  );
}

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    duration: PropTypes.string,
    genre: PropTypes.string,
  }).isRequired,
};
