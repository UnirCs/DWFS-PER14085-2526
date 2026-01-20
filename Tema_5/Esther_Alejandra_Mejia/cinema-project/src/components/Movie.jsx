export default function Movie({ title, image, synopsis, duration, genre, rating }) {
  return (
    <article className="movie-card">
      <h3 className="movie-title">{title}</h3>

      <div className="movie-imageWrap">
        <img className="movie-image" src={image} alt={title} />
      </div>

      <p className="movie-synopsis">{synopsis}</p>

      <ul className="movie-meta">
        <li><strong>Duración:</strong> {duration}</li>
        <li><strong>Género:</strong> {genre}</li>
        <li><strong>Puntuación:</strong> {rating}</li>
      </ul>

      <button className="movie-button">Seleccionar asientos</button>
    </article>
  );
}
