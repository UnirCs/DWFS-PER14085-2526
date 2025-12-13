import React from 'react';
import Movie from './Movie';
import moviesData from '../data/Movies.json';
import '../styles/MovieList.css';

function MovieList() {

    return (
        <div className="container">
            <h2 style={{ color: '#0066cc', textAlign: 'center', marginBottom: '20px' }}>
                Cartelera
            </h2>
            <div className="movie-list">
                {moviesData.map((movie, index) => (
                    <Movie 
                        key={index}
                        title={movie.title}
                        image={movie.image}
                        synopsis={movie.synopsis}
                        duration={movie.duration}
                        genre={movie.genre}
                        rating={movie.rating}
                    />
                ))}
            </div>
        </div>
    );
}

export default MovieList;