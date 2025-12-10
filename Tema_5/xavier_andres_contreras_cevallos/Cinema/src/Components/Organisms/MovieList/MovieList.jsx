import Image from "../../atoms/Image/Image";
import MovieInfo from "../../Molecules/MovieInfo/MovieInfo";
import "./MovieList.css";

const MovieList = ({ movies }) => {
  return (
    <div className="movie__list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie__card">
          <Image src={movie.imagen} alt={movie.titulo} className="movie__image" />
          <MovieInfo movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
