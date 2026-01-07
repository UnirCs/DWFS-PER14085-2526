import Movie from "./Movie";

function MovieList() {
    const movies = [
        {
            id: 1,
            title: "Inception",
            image: "https://m.media-amazon.com/images/I/51zUbui+gbL._AC_.jpg",
            synopsis: "Un ladrón que roba secretos a través de los sueños.",
            duration: "148 min",
            genre: "Ciencia ficción",
            rating: 8.8
        },
        {
            id: 2,
            title: "Interstellar",
            image: "https://es.web.img3.acsta.net/r_1920_1080/img/df/f8/dff81d3bb820abb51ce32c05e28cd0c3.jpg",
            synopsis: "Exploración espacial para salvar a la humanidad.",
            duration: "169 min",
            genre: "Ciencia ficción",
            rating: 8.6
        }
    ];

    return (
        <main>
            <h2>Cartelera</h2>

            {movies.map(movie => (
                <Movie
                    key={movie.id}
                    title={movie.title}
                    image={movie.image}
                    synopsis={movie.synopsis}
                    duration={movie.duration}
                    genre={movie.genre}
                    rating={movie.rating}
                />
            ))}

        </main>
    );
}

export default MovieList;
