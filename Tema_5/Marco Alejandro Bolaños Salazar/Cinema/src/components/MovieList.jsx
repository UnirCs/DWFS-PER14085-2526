import React, { useContext } from 'react';
import Movie from './Movie';
import { CinemaContext } from '../context/CinemaContext';
import '../styles/MovieList.css';

const MovieList = () => {
    const { movies } = useContext(CinemaContext);

    return (
        <main className="movieList text-justify">
            {movies.map((movie) => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </main>
    );
};

export default MovieList;
