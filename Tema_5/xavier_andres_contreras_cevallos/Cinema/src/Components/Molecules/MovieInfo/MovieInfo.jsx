import "./MovieInfo.css";

const MovieInfo = ({ movie }) => {
  return (
    <div>
      <h2 className="movie__title">{movie.titulo}</h2>
      <p className="movie__synopsis">{movie.sinopsis}</p>
      <p className="movie__details">
        Duracion: {movie.duracion} min | Genero: {movie.genero} | Puntuacion:{" "}
        {movie.puntuacion}/5
      </p>
    </div>
  );
};

export default MovieInfo;