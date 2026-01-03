function Movie({ title, image, synopsis, duration, genre, rating }) {
    return (
        <article>
            <h3>{title}</h3>

            <img
                src={image}
                alt={title}
                width="200"
            />

            <p>{synopsis}</p>

            <p><strong>Duración:</strong> {duration}</p>
            <p><strong>Género:</strong> {genre}</p>
            <p><strong>Puntuación:</strong> ⭐ {rating}</p>

            <button>Seleccionar asientos</button>
        </article>
    );
}

export default Movie;
