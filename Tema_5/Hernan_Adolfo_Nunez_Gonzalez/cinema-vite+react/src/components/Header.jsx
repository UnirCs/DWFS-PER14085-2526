/**
 * COMPONENTE HEADER
 *
 * Componente funcional que muestra el encabezado de la aplicación.
 * Este banner se muestra en todas las páginas en la parte superior.
 *
 * Características:
 * - Título principal de la aplicación
 * - Subtítulo descriptivo
 * - Estilos definidos en App.css
 */

// Importamos React para poder usar JSX
import React from 'react';

/**
 * Componente Header
 *
 * @returns {JSX.Element} Elemento header con el título de la aplicación
 */
const Header = () => {
  return (
    // Elemento HTML <header> que contiene el banner superior
    <header>
      {/* Título principal de la aplicación */}
      <h1>Cinema Colombia</h1>

      {/* Subtítulo descriptivo */}
      <p>Tu destino para las mejores películas</p>
    </header>
  );
};

// Exportamos el componente para poder usarlo en App.jsx
export default Header;
