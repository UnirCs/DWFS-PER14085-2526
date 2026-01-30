import React from 'react';
import Movie from './Movie';
import { movies } from '../data/moviesData';

const MovieList = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {movies.map(movie => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
