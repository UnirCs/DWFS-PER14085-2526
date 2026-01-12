import type {
  MovieParams,
  GenreParams,
  MoviePresenter,
} from "../domain/types/movie";
import { ImDbMovieApiRepository } from "../infra/imDbMovieApiRepository";
import { useEffect, useState } from "react";
export const useMovies = (imbdMoviApieReository: ImDbMovieApiRepository) => {
  const [movies, setMovies] = useState<MoviePresenter[]>([]);

  async function loadMovies() {
    try {
      const movieParams: MovieParams[] =
        await imbdMoviApieReository.getAllMovies();
      const genres: GenreParams[] =
        await imbdMoviApieReository.getMovieGenres();

      const genreMap = new Map<number, GenreParams>(genres.map((genre) => [genre.id, genre]));

      const moviesData: MoviePresenter[] = movieParams.map((movie) => {
        const movieGenres = movie.genre_ids
          ?.map((genreId) => genreMap.get(genreId))
          .filter((genre): genre is GenreParams => genre !== undefined);
        return {
          id: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          overview: movie.overview,
          runtime: movie.runtime,
          genres: movieGenres,
          voteAverage: movie.vote_average,
        };
      });

      setMovies(moviesData);
    } catch (error) {
        console.error("Error loading movies:", error);
    }
  }
    useEffect(() => {
      loadMovies();
    }, []);

    return { movies };
};
