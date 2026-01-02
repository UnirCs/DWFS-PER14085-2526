import MovieList from "../../Components/Organisms/MovieList/MovieList";
import './movies.css';
import { movies } from "../../mocks/movies";

const Movies = () => {
  return (
    <main className="movies__container">
      <MovieList movies={movies} />
    </main>
  );
};

export default Movies;
