/**
 * ARCHIVO DE DATOS - PELÍCULAS.
 *
 * Este archivo contiene toda la información de las películas en cartelera
 * para diferentes ciudades de Colombia.
 *
 * Estructura de cada película:
 * - id: Identificador único de la película
 * - title: Título de la película
 * - genre: Género cinematográfico
 * - duration: Duración en minutos
 * - rating: Puntuación sobre 10
 * - image: URL de la imagen desde The Movie Database (TMDb)
 * - showtimes: Array con los horarios disponibles
 * - synopsis: Descripción breve de la trama
 */

// ========================================
// PELÍCULAS PARA BOGOTÁ DC.
// ========================================
// Array de películas para la ciudad de Bogotá DC
// Incluye Star Wars Episodio 9 y Terminator Dark Fate como requerido
export const moviesDataBogota = [
  {
    id: 1, // ID único para identificar la película
    title: "Star Wars: El Ascenso de Skywalker", // Episodio 9 - REQUERIDO
    genre: "Ciencia Ficción",
    duration: "142 min",
    rating: "6.5/10",
    image: "https://image.tmdb.org/t/p/w500/db32LaOibwEliAmSL2jjDF6oDdj.jpg", // URL real de TMDb
    showtimes: ["14:00", "17:30", "21:00"], // Horarios disponibles para esta película
    synopsis: "La Resistencia sobreviviente se enfrenta a la Primera Orden una vez más en el capítulo final de la saga Skywalker."
  },
  {
    id: 2,
    title: "Terminator: Destino Oculto", // Terminator Dark Fate - REQUERIDO
    genre: "Acción",
    duration: "128 min",
    rating: "6.2/10",
    image: "https://image.tmdb.org/t/p/w500/vqzNJRH4YyquRiWxCCOH0aXggHI.jpg", // URL real de TMDb
    showtimes: ["15:00", "18:30", "22:00"],
    synopsis: "Sarah Connor regresa para proteger a una joven mujer de un nuevo Terminator enviado desde el futuro."
  },
  {
    id: 3,
    title: "Avatar: El Camino del Agua",
    genre: "Ciencia Ficción",
    duration: "192 min",
    rating: "7.8/10",
    image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    showtimes: ["16:00", "19:30", "22:45"],
    synopsis: "Jake Sully y Neytiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las regiones de Pandora."
  },
  {
    id: 4,
    title: "Top Gun: Maverick",
    genre: "Acción",
    duration: "130 min",
    rating: "8.5/10",
    image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    showtimes: ["17:00", "20:00", "23:00"],
    synopsis: "Después de más de 30 años de servicio, Pete 'Maverick' Mitchell continúa siendo uno de los mejores pilotos de la Armada."
  }
];

// ========================================
// PELÍCULAS PARA IBAGUÉ.
// ========================================
// Array de películas para la ciudad de Ibagué
export const moviesDataIbague = [
  {
    id: 5,
    title: "Spider-Man: No Way Home",
    genre: "Acción",
    duration: "148 min",
    rating: "8.4/10",
    image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    showtimes: ["16:30", "19:45", "22:30"],
    synopsis: "Peter Parker busca ayuda del Doctor Strange cuando su identidad es revelada, pero el hechizo sale mal abriendo el multiverso."
  },
  {
    id: 6,
    title: "Black Panther: Wakanda Forever",
    genre: "Acción",
    duration: "161 min",
    rating: "7.2/10",
    image: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    showtimes: ["15:30", "18:15", "21:00"],
    synopsis: "La reina Ramonda, Shuri, M'Baku y las Dora Milaje luchan para proteger Wakanda tras la muerte del rey T'Challa."
  },
  {
    id: 7,
    title: "Jurassic World: Dominion",
    genre: "Aventura",
    duration: "147 min",
    rating: "7.1/10",
    image: "https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
    showtimes: ["15:45", "18:30", "21:45"],
    synopsis: "Cuatro años después de la destrucción de Isla Nublar, los dinosaurios ahora viven y cazan junto a los humanos."
  },
  {
    id: 8,
    title: "Doctor Strange en el Multiverso de la Locura",
    genre: "Fantasía",
    duration: "126 min",
    rating: "7.0/10",
    image: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    showtimes: ["15:00", "18:00", "21:30"],
    synopsis: "El Doctor Strange se adentra en el peligroso Multiverso Alternativo para enfrentarse a un nuevo y misterioso adversario."
  }
];

// ========================================
// PELÍCULAS PARA ARMENIA.
// ========================================
// Array de películas para la ciudad de Armenia
export const moviesDataArmenia = [
  {
    id: 9,
    title: "The Batman",
    genre: "Acción",
    duration: "176 min",
    rating: "7.8/10",
    image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    showtimes: ["16:00", "19:30", "22:45"],
    synopsis: "En su segundo año de lucha contra el crimen, Batman investiga la corrupción de Ciudad Gótica y cómo puede estar vinculada a su propia familia."
  },
  {
    id: 10,
    title: "Thor: Love and Thunder",
    genre: "Acción",
    duration: "119 min",
    rating: "6.8/10",
    image: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
    showtimes: ["16:45", "19:15", "22:00"],
    synopsis: "Thor se embarca en un viaje en busca de la paz interior, pero su retiro se ve interrumpido por Gorr el Carnicero de Dioses."
  }
];

// ========================================
// PELÍCULAS ADICIONALES.
// ========================================
/**
 * Array auxiliar con películas adicionales para distribuir
 * entre las ciudades restantes (Cali, Medellín, Villavicencio)
 *
 * Esto permite reutilizar las 10 películas principales en diferentes
 * combinaciones para cada ciudad
 */
const additionalMovies = [
  {
    id: 1,
    title: "Star Wars: El Ascenso de Skywalker",
    genre: "Ciencia Ficción",
    duration: "142 min",
    rating: "6.5/10",
    image: "https://image.tmdb.org/t/p/w500/db32LaOibwEliAmSL2jjDF6oDdj.jpg",
    showtimes: ["14:00", "17:30", "21:00"],
    synopsis: "La Resistencia sobreviviente se enfrenta a la Primera Orden una vez más en el capítulo final de la saga Skywalker."
  },
  {
    id: 2,
    title: "Terminator: Destino Oculto",
    genre: "Acción",
    duration: "128 min",
    rating: "6.2/10",
    image: "https://image.tmdb.org/t/p/w500/vqzNJRH4YyquRiWxCCOH0aXggHI.jpg",
    showtimes: ["15:00", "18:30", "22:00"],
    synopsis: "Sarah Connor regresa para proteger a una joven mujer de un nuevo Terminator enviado desde el futuro."
  },
  {
    id: 3,
    title: "Avatar: El Camino del Agua",
    genre: "Ciencia Ficción",
    duration: "192 min",
    rating: "7.8/10",
    image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    showtimes: ["16:00", "19:30", "22:45"],
    synopsis: "Jake Sully y Neytiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las regiones de Pandora."
  },
  {
    id: 4,
    title: "Top Gun: Maverick",
    genre: "Acción", // Corregido de "género" a "genre"
    duration: "130 min",
    rating: "8.5/10",
    image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    showtimes: ["17:00", "20:00", "23:00"],
    synopsis: "Después de más de 30 años de servicio, Pete 'Maverick' Mitchell continúa siendo uno de los mejores pilotos de la Armada."
  },
  {
    id: 5,
    title: "Spider-Man: No Way Home",
    genre: "Acción",
    duration: "148 min",
    rating: "8.4/10",
    image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    showtimes: ["16:30", "19:45", "22:30"],
    synopsis: "Peter Parker busca ayuda del Doctor Strange cuando su identidad es revelada, pero el hechizo sale mal abriendo el multiverso."
  },
  {
    id: 6,
    title: "Black Panther: Wakanda Forever",
    genre: "Acción",
    duration: "161 min",
    rating: "7.2/10",
    image: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    showtimes: ["15:30", "18:15", "21:00"],
    synopsis: "La reina Ramonda, Shuri, M'Baku y las Dora Milaje luchan para proteger Wakanda tras la muerte del rey T'Challa."
  }
];

// ========================================
// PELÍCULAS PARA CALI.
// ========================================
// Array de películas para Cali usando spread operator para combinar películas
// Toma las primeras 3 películas y luego las películas 4 y 5 del array adicional
export const moviesDataCali = [...additionalMovies.slice(0, 3), ...additionalMovies.slice(4, 6)];

// ========================================
// PELÍCULAS PARA MEDELLÍN.
// ========================================
// Array de películas para Medellín con una combinación diferente
// Toma películas de la posición 1-3, luego la 0, y finalmente la 5
export const moviesDataMedellin = [...additionalMovies.slice(1, 4), ...additionalMovies.slice(0, 1), ...additionalMovies.slice(5, 6)];

// ========================================
// PELÍCULAS PARA VILLAVICENCIO.
// ========================================
// Array de películas para Villavicencio con otra combinación
// Toma películas de la posición 2-5, y luego la película en posición 0
export const moviesDataVillavicencio = [...additionalMovies.slice(2, 6), ...additionalMovies.slice(0, 1)];

// ========================================
// OBJETO PRINCIPAL CON TODAS LAS CIUDADES.
// ========================================
/**
 * Objeto que contiene todas las ciudades con sus respectivas películas
 *
 * Cada ciudad tiene:
 * - name: Nombre completo de la ciudad para mostrar en la UI
 * - movies: Array de películas en cartelera para esa ciudad
 *
 * Las claves (bogota, ibague, etc.) se usan como identificadores
 * en el selector de ciudades del componente App
 */
export const citiesData = {
  bogota: {
    name: "Bogotá DC", // Nombre que se muestra en el selector
    movies: moviesDataBogota // Array de películas para Bogotá
  },
  ibague: {
    name: "Ibagué",
    movies: moviesDataIbague
  },
  armenia: {
    name: "Armenia",
    movies: moviesDataArmenia
  },
  cali: {
    name: "Cali",
    movies: moviesDataCali
  },
  medellin: {
    name: "Medellín",
    movies: moviesDataMedellin
  },
  villavicencio: {
    name: "Villavicencio",
    movies: moviesDataVillavicencio
  }
};
