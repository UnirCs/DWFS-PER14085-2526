import React from 'react';
import Movie from './Movie.jsx';
import '../styles/movieList.css'


const movieList = [
    {
        id: 1,
        titulo: "Five Nights at Freddy's 2",
        imagenUrl: "https://eu-static.yelmocines.es/content/img/movies/posters/6181/1/1/6181.jpg",
        sinopsis: "Secuela de la exitosa adaptación de la saga de videojuegos Five Nights at Freddy’s.",
        duracionMinutos: 145,
        genero: "Terror",
        puntuacion: 4.7,
    },
    {
        id: 2,
        titulo: "Valor sentimental",
        imagenUrl: "https://eu-static.yelmocines.es/content/img/movies/posters/6730/1/1/6730.jpg",
        sinopsis: "Las hermanas Nora y Agnes se reencuentran con su distanciado padre, el carismático Gustav, un antiguo director de renombre que le ofrece a su hija Nora, actriz de teatro, un papel en su próxima película. Nora lo rechaza y pronto descubre que le ha dado su papel a una joven y entusiasta estrella de Hollywood. De repente, las dos hermanas deben sortear su complicada relación con su padre y lidiar con una estrella estadounidense que se encuentra en medio de su compleja dinámica familiar.",
        duracionMinutos: 110,
        genero: "Romántica",
        puntuacion: 4.2,
    },
    {
        id: 3,
        titulo: "Zootrópolis 2",
        imagenUrl: "https://eu-static.yelmocines.es/content/img/movies/posters/6254/1/1/6254.jpg",
        sinopsis: "Tras resolver el caso más grande en la historia de Zootrópolis, los policías novatos Judy Hopps (voz de Ginnifer Goodwin en la versión original) y Nick Wilde (voz de Jason Bateman en la versión original) descubren que su sociedad no es tan sólida como pensaban cuando el Jefe Bogo (voz de Idris Elba en la versión original) les ordena unirse al programa “Compañeros en Crisis”. Pero no pasa mucho tiempo antes de que su alianza se ponga a prueba cuando se ven envueltos en una misteriosa investigación relacionada con la llegada de una serpiente venenosa a la metrópolis animal.",
        duracionMinutos: 98,
        genero: "Animación",
        puntuacion: 3.9,
    },
    {
        id: 4,
        titulo: "Núremberg",
        imagenUrl: "https://eu-static.yelmocines.es/content/img/movies/posters/6722/1/1/6722.jpg",
        sinopsis: "NÚREMBERG nos sitúa de pleno en los juicios celebrados hace 80 años por los Aliados tras la derrota del régimen nazi. El psiquiatra estadounidense Douglas Kelley (Rami Malek) es designado como responsable de evaluar la salud mental de los prisioneros nazis y determinar si son aptos para ser juzgados por sus crímenes de guerra. De la noche a la mañana, Kelley se verá inmerso en una compleja batalla de ingenio contra Hermann Göring (Russel Crowe), mano derecha de Hitler y uno de los hombres más temibles que ha visto el mundo.",
        duracionMinutos: 130,
        genero: "Historia",
        puntuacion: 4.5,
    },
    {
        id: 5,
        titulo: "Blue Moon",
        imagenUrl: "https://eu-static.yelmocines.es/content/img/movies/posters/6726/1/1/6726.jpg",
        sinopsis: "En la noche del 31 de marzo de 1943, el legendario letrista Lorenz Hart se enfrenta a su dañada autoestima en el bar Sardi mientras su antiguo compañero creativo Richard Rodgers acoge la noche inaugural de su exitoso musical \"¡Oklahoma!\". Antes de que la noche acabe, Hart se habrá enfrentado tanto a un mundo que ya no valora su talento como a la aparente imposibilidad del amor.",
        duracionMinutos: 90,
        genero: "Romántica",
        puntuacion: 3.5,
    },
];

const MovieList = () => {
    return (
        <div className="movie-list-container">
            <h1>
                Cartelera de la Semana
            </h1>
            <div className="movie-grid">
                {movieList.map((pelicula) => (
                    <Movie
                        key={pelicula.id}
                        movie={pelicula}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;