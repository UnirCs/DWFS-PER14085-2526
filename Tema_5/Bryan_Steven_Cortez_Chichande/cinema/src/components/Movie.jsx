export default function Movie({ movie }) {
  return (
    <article className="movie" role="listitem">
      <div className="movie__imgWrap">
        <img className="movie__img" src={movie.img} alt={`Poster de ${movie.title}`} />
      </div>

      <div className="movie__body">
        <h3 className="movie__title">{movie.title}</h3>

        <p className="movie__synopsis">{movie.synopsis}</p>

        <ul className="movie__meta" aria-label="Detalles de la película">
          <li>
            <strong>Duración:</strong> {movie.duration}
          </li>
          <li>
            <strong>Género:</strong> {movie.genre}
          </li>
          <li>
            <strong>Puntuación:</strong> {movie.score}
          </li>
        </ul>

        <button type="button" className="movie__btn">
          Seleccionar asientos
        </button>
      </div>
    </article>
  );
}