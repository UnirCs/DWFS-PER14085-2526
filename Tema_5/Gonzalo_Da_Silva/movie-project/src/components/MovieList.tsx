import { useEffect, useState } from 'react';
import './MovieList.css';
import type { MoviePresenter } from '../domain/types/movie';
import Movie from './Movie';


interface MovieListProps {
  movies: MoviePresenter[];
}


const MovieList = ({ movies }: MovieListProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movies.length > 0) {
      setLoading(false);
    }
  }, [movies]);

  const getGenreName = (movie: MoviePresenter): string[] => {
   if (movie.genres && movie.genres.length > 0) {
      return movie.genres.map((genre) => genre.name)
    }
    return ['Película'];
  };

  const getImageUrl = (posterPath: string): string => {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  };

  if (loading) {
    return (
      <div className="movie-list-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando películas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <div className="movie-list">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            title={movie.title}
            image={getImageUrl(movie.posterPath)}
            synopsis={movie.overview || 'Sin sinopsis disponible'}
            duration={movie.runtime}
            genre={getGenreName(movie)}
            rating={movie.voteAverage}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
