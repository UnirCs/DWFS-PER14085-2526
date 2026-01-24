/**
 * COMPONENTE MOVIELIST
 *
 * Componente funcional que muestra la lista de películas en cartelera.
 * Este componente es responsable de:
 * - Mostrar un spinner de carga mientras se cargan las películas
 * - Renderizar todas las películas una vez cargadas
 *
 * Props recibidas:
 * - movies: Array de objetos con las películas a mostrar
 * - isLoading: Boolean que indica si las películas están cargando
 */

// Importamos React para poder usar JSX
import React from 'react';
// Importamos el componente Movie para renderizar cada película
import Movie from './Movie';

/**
 * Componente MovieList
 *
 * @param {Object} props - Props del componente
 * @param {Array} props.movies - Array de películas a mostrar
 * @param {boolean} props.isLoading - Indica si está cargando
 *
 * @returns {JSX.Element} Lista de películas o spinner de carga
 */
const MovieList = ({ movies, isLoading }) => {
  // Condicional: Si isLoading es true, mostramos el spinner de carga
  if (isLoading) {
    return (
      // Contenedor del spinner de carga
      <div className="loading-container">
        {/* Spinner animado con CSS (animación en App.css) */}
        <div className="spinner"></div>

        {/* Mensaje de carga para el usuario */}
        <p>Cargando películas...</p>
      </div>
    );
  }

  // Si NO está cargando, renderizamos la lista de películas
  return (
    // Contenedor principal de la lista de películas
    <div className="movie-list">
      {/*
        Iteramos sobre el array de películas usando map()
        - movie: objeto película actual en la iteración
        - Generamos un componente Movie por cada película
        - key={movie.id} es obligatorio para que React identifique
          cada elemento de forma única en la lista
        - movie={movie} pasamos todo el objeto película como prop
      */}
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

// Exportamos el componente para usarlo en App.jsx
export default MovieList;
