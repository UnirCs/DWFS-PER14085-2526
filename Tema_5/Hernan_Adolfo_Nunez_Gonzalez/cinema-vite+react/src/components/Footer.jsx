/**
 * COMPONENTE FOOTER
 *
 * Componente funcional que muestra el pie de página de la aplicación.
 * Este footer se muestra en todas las páginas en la parte inferior.
 *
 * Características:
 * - Información de copyright
 * - Mensaje descriptivo del servicio
 * - Estilos definidos en App.css
 */

// Importamos React para poder usar JSX
import React from 'react';

/**
 * Componente Footer
 *
 * @returns {JSX.Element} Elemento footer con información de copyright
 */
const Footer = () => {
  return (
    // Elemento HTML <footer> que contiene el pie de página
    <footer>
      {/* Texto de copyright con símbolo © (código HTML &copy;) */}
      <p>&copy; 2026 Cinema Colombia. Todos los derechos reservados.</p>

      {/* Mensaje descriptivo del servicio ofrecido */}
      <p>Las mejores películas en las principales ciudades de Colombia</p>
    </footer>
  );
};

// Exportamos el componente para poder usarlo en App.jsx
export default Footer;
