/**
 * COMPONENTE PRINCIPAL - APP
 *
 * Este es el componente principal de la aplicación Cinema Colombia.
 * Gestiona el estado global de la aplicación y coordina todos los componentes.
 *
 * Funcionalidades principales:
 * - Maneja el estado de la ciudad seleccionada
 * - Controla la carga de películas según la ciudad
 * - Coordina todos los componentes de la aplicación
 * - Implementa un efecto de carga simulado
 *
 * Estados manejados:
 * - selectedCity: Ciudad actualmente seleccionada
 * - movies: Array de películas a mostrar
 * - isLoading: Indicador de carga
 */

// Importamos React y hooks necesarios
// - useState: Para manejar estados locales del componente
// - useEffect: Para ejecutar efectos secundarios (cargar películas)
import React, { useState, useEffect } from 'react';

// Importamos los estilos CSS de la aplicación desde la carpeta css
import './css/styles.css';

// Importamos todos los componentes que usaremos
import Header from './components/Header';           // Encabezado
import Footer from './components/Footer';           // Pie de página
import CineSelector from './components/CineSelector'; // Selector de ciudades
import MovieList from './components/MovieList';      // Lista de películas

// Importamos los datos de las películas desde la carpeta data
// El archivo se llama movies.js según el enunciado del ejercicio
import { citiesData } from './data/movies';

/**
 * Componente principal App
 *
 * @returns {JSX.Element} Estructura completa de la aplicación
 */
function App() {
  // ========================================
  // ESTADOS DEL COMPONENTE
  // ========================================

  /**
   * Estado para la ciudad seleccionada
   * Valor inicial: 'bogota' (se muestra Bogotá al cargar la app)
   * Este estado controla qué películas se muestran
   */
  const [selectedCity, setSelectedCity] = useState('bogota');

  /**
   * Estado para almacenar las películas a mostrar
   * Valor inicial: [] (array vacío)
   * Se llena cuando se cargan las películas de la ciudad seleccionada
   */
  const [movies, setMovies] = useState([]);

  /**
   * Estado para controlar el indicador de carga
   * Valor inicial: true (mostramos spinner al inicio)
   * - true: Muestra el spinner de carga
   * - false: Muestra las películas
   */
  const [isLoading, setIsLoading] = useState(true);

  // ========================================
  // FUNCIONES DEL COMPONENTE
  // ========================================

  /**
   * Función asíncrona para cargar las películas
   * Simula un retardo de carga para mejorar la UX
   *
   * Proceso:
   * 1. Activa el indicador de carga
   * 2. Espera 1.5 segundos (simulando petición a servidor)
   * 3. Carga las películas de la ciudad seleccionada
   * 4. Desactiva el indicador de carga
   */
  const loadMovies = async () => {
    // Paso 1: Activamos el estado de carga
    setIsLoading(true);

    // Paso 2: Simulamos un retardo de 1.5 segundos
    // En una app real, aquí haríamos un fetch a una API
    // new Promise crea una promesa que se resuelve después de 1500ms
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Paso 3: Obtenemos las películas de la ciudad seleccionada
    // citiesData[selectedCity] accede al objeto de la ciudad
    // Ejemplo: citiesData['bogota'] = {name: 'Bogotá DC', movies: [...]}
    const currentCityData = citiesData[selectedCity];

    // Actualizamos el estado de movies con las películas obtenidas
    setMovies(currentCityData.movies);

    // Paso 4: Desactivamos el estado de carga
    setIsLoading(false);
  };

  // ========================================
  // EFECTOS (HOOKS)
  // ========================================

  /**
   * useEffect para cargar películas cuando cambia la ciudad
   *
   * Este hook se ejecuta:
   * 1. Al montar el componente (primera vez)
   * 2. Cada vez que cambia selectedCity
   *
   * El array [selectedCity] es el array de dependencias:
   * - Si selectedCity cambia, se ejecuta loadMovies()
   */
  useEffect(() => {
    loadMovies(); // Llamamos a la función de carga
  }, [selectedCity]); // Dependencia: se ejecuta cuando selectedCity cambia

  // ========================================
  // MANEJADORES DE EVENTOS
  // ========================================

  /**
   * Manejador para el cambio de ciudad
   *
   * @param {string} cityKey - Clave de la nueva ciudad seleccionada
   *
   * Esta función se pasa como prop a CineSelector y se ejecuta
   * cuando el usuario selecciona una ciudad diferente
   */
  const handleCityChange = (cityKey) => {
    // Actualizamos el estado con la nueva ciudad
    // Esto dispara el useEffect que recarga las películas
    setSelectedCity(cityKey);
  };

  // ========================================
  // RENDERIZADO DEL COMPONENTE
  // ========================================

  return (
    // Contenedor principal de la aplicación
    <div className="App">
      {/* Componente Header - Encabezado de la página */}
      <Header />

      {/* Contenedor principal del contenido */}
      <div className="landing">
        {/*
          Componente CineSelector - Selector de ciudades
          Props:
          - selectedCity: ciudad actualmente seleccionada
          - onCityChange: función que se ejecuta al cambiar ciudad
          - cities: objeto con todas las ciudades disponibles
        */}
        <CineSelector
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          cities={citiesData}
        />

        {/*
          Componente MovieList - Lista de películas
          Props:
          - movies: array de películas a mostrar
          - isLoading: indica si está cargando (muestra spinner si es true)
        */}
        <MovieList movies={movies} isLoading={isLoading} />
      </div>

      {/* Componente Footer - Pie de página */}
      <Footer />
    </div>
  );
}

// Exportamos el componente App como exportación por defecto
// Este componente se importa en main.jsx para renderizar la aplicación
export default App;
