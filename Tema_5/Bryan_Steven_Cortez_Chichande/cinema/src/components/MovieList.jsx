import Movie from "./Movie";
import moviesData from "../data/movies";

export default function MovieList() {
  return (
    <div className="movies__grid" role="list" aria-label="Lista de películas">
      {moviesData.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
}