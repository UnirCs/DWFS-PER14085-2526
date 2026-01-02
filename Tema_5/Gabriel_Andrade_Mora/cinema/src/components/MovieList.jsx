import Movie from "./Movie";
function MovieList() {
  // Array de peliculas
  const movies = [
    {
      id: 1,
      title: "Interestelar",
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      synopsis:
        "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de garantizar la supervivencia de la humanidad.",
      duration: 169,
      genre: "Ciencia Ficción",
      rating: 8.6,
    },
    {
      id: 2,
      title: "El Padrino",
      image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      synopsis:
        "El patriarca envejecido de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su hijo reacio.",
      duration: 175,
      genre: "Drama",
      rating: 9.2,
    },
    {
      id: 3,
      title: "Inception",
      image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      synopsis:
        "Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños recibe la tarea inversa de plantar una idea.",
      duration: 148,
      genre: "Acción",
      rating: 8.8,
    },
    {
      id: 4,
      title: "El Caballero de la Noche",
      image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      synopsis:
        "Batman debe aceptar una de las pruebas psicológicas y físicas más grandes para luchar contra la injusticia mientras el Joker siembra el caos en Gotham City.",
      duration: 152,
      genre: "Acción",
      rating: 9.0,
    },
    {
      id: 5,
      title: "Pulp Fiction",
      image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      synopsis:
        "Las vidas de dos asesinos de la mafia, un boxeador, la esposa de un gánster y dos bandidos se entrelazan en cuatro historias de violencia y redención.",
      duration: 154,
      genre: "Crimen",
      rating: 8.9,
    },
    {
      id: 6,
      title: "Forrest Gump",
      image: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      synopsis:
        "Las presidencias de Kennedy y Johnson, la guerra de Vietnam y otros eventos históricos se desarrollan desde la perspectiva de un hombre de Alabama con un coeficiente intelectual de 75.",
      duration: 142,
      genre: "Drama",
      rating: 8.8,
    },
  ];
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Películas en cartelera
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            image={movie.image}
            title={movie.title}
            synopsis={movie.synopsis}
            duration={movie.duration}
            genre={movie.genre}
            rating={movie.rating}
          />
        ))}
      </div>
    </section>
  );
}
export default MovieList;
