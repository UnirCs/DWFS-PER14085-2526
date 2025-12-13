import React from "react";
import PropTypes from "prop-types";
import Movie from "./Movie";

export default function MovieList({ movies }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id}>
          <Movie movie={movie} />
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};
