import "./Movie.css";

const Movie = ({ movie }) => {
  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <img src={movie.image} alt={movie.title} width="200" />
      <p><strong>Sinopsis:</strong> {movie.synopsis}</p>
      <p><strong>Duración:</strong> {movie.duration} min</p>
      <p><strong>Género:</strong> {movie.genre}</p>
      <p><strong>Puntuación:</strong>{movie.rating}</p>
      <button>Seleccionar asientos</button>
    </div>
  );
};

export default Movie;
