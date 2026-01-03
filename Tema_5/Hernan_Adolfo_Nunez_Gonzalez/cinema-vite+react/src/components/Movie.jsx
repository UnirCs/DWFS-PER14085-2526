/**
 * COMPONENTE MOVIE
 *
 * Componente funcional que muestra la información de una película individual.
 * Cada película se renderiza como una tarjeta con todos sus detalles.
 *
 * Props recibidas:
 * - movie: Objeto con la información de la película (título, género, duración,
 *          rating, imagen, sinopsis, horarios)
 *
 * Información mostrada:
 * - Título de la película
 * - Imagen/poster
 * - Género cinematográfico
 * - Duración
 * - Puntuación
 * - Sinopsis
 * - Botones con horarios disponibles (sin efecto por el momento)
 */

// Importamos React para poder usar JSX
import React from 'react';

/**
 * Componente Movie
 *
 * @param {Object} props - Props del componente
 * @param {Object} props.movie - Objeto con los datos de la película
 * @param {number} props.movie.id - ID único de la película
 * @param {string} props.movie.title - Título de la película
 * @param {string} props.movie.genre - Género de la película
 * @param {string} props.movie.duration - Duración en minutos
 * @param {string} props.movie.rating - Puntuación sobre 10
 * @param {string} props.movie.image - URL de la imagen
 * @param {string} props.movie.synopsis - Descripción de la trama
 * @param {string[]} props.movie.showtimes - Array con horarios disponibles
 *
 * @returns {JSX.Element} Tarjeta con la información de la película
 */
const Movie = ({ movie }) => {
  return (
    // Contenedor principal de la tarjeta de película
    <div className="movie">
      {/* Contenedor del contenido con layout flex (imagen + info) */}
      <div className="movie-content">

        {/* Sección de la imagen/poster de la película */}
        <div className="movie-image">
          {/* Imagen con src desde TMDb y alt para accesibilidad */}
          <img src={movie.image} alt={movie.title} />
        </div>

        {/* Sección de información de la película */}
        <div className="movie-info">
          {/* Título de la película */}
          <h2>{movie.title}</h2>

          {/* Género - Uso de <strong> para etiquetas en negrita */}
          <p><strong>Género:</strong> {movie.genre}</p>

          {/* Duración de la película */}
          <p><strong>Duración:</strong> {movie.duration}</p>

          {/* Puntuación/Rating */}
          <p><strong>Puntuación:</strong> {movie.rating}</p>

          {/* Sinopsis con clase especial para estilos diferentes */}
          <p className="synopsis"><strong>Sinopsis:</strong> {movie.synopsis}</p>

          {/* Sección de horarios disponibles */}
          <div className="sessions">
            <h3>Horarios disponibles:</h3>

            {/* Contenedor de los botones de horarios */}
            <div className="showtimes">
              {/*
                Iteramos sobre el array de horarios usando map()
                - time: horario actual en la iteración (ej: "14:00")
                - index: índice del elemento (usado como key)
                key es requerido por React para identificar elementos en listas
              */}
              {movie.showtimes.map((time, index) => (
                <button key={index} className="showtime-button">
                  {/* Mostramos el horario dentro del botón */}
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportamos el componente para usarlo en MovieList.jsx
export default Movie;
