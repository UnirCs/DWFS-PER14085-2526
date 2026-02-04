/**
 * COMPONENTE CINESELECTOR
 *
 * Componente funcional que muestra el selector de ciudades.
 * Permite al usuario seleccionar una ciudad de Colombia para ver
 * las películas disponibles en esa ubicación.
 *
 * Props recibidas:
 * - selectedCity: String con la clave de la ciudad actualmente seleccionada
 * - onCityChange: Función callback que se ejecuta cuando cambia la selección
 * - cities: Objeto con todas las ciudades disponibles y sus películas
 *
 * Ciudades disponibles:
 * - Bogotá DC
 * - Ibagué
 * - Armenia
 * - Cali
 * - Medellín
 * - Villavicencio
 */

// Importamos React para poder usar JSX
import React from 'react';

/**
 * Componente CineSelector
 *
 * @param {Object} props - Props del componente
 * @param {string} props.selectedCity - Clave de la ciudad seleccionada
 * @param {Function} props.onCityChange - Función para manejar cambio de ciudad
 * @param {Object} props.cities - Objeto con todas las ciudades disponibles
 *
 * @returns {JSX.Element} Selector dropdown con las ciudades
 */
const CineSelector = ({ selectedCity, onCityChange, cities }) => {
  return (
    // Contenedor principal del selector
    <div className="cine-selector">
      {/* Etiqueta del selector - htmlFor conecta con el id del select */}
      <label htmlFor="city-select">Selecciona tu ciudad:</label>

      {/* Elemento select (dropdown) para elegir la ciudad */}
      <select
        id="city-select" // ID para conectar con el label
        value={selectedCity} // Valor actual seleccionado (controlado por estado en App)
        onChange={(e) => onCityChange(e.target.value)} // Evento cuando cambia la selección
        // e.target.value contiene el valor del option seleccionado
      >
        {/*
          Object.entries() convierte el objeto cities en un array de pares [clave, valor]
          Ejemplo: [['bogota', {name: 'Bogotá DC', movies: [...]}], ...]

          Luego iteramos con map() donde:
          - key: es la clave de la ciudad (ej: 'bogota', 'ibague')
          - city: es el objeto con {name, movies}

          Generamos un <option> por cada ciudad
        */}
        {Object.entries(cities).map(([key, city]) => (
          <option
            key={key} // Key único para React (ej: 'bogota')
            value={key} // Valor que se enviará cuando se seleccione (ej: 'bogota')
          >
            {/* Texto que ve el usuario en el dropdown */}
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Exportamos el componente para usarlo en App.jsx
export default CineSelector;
