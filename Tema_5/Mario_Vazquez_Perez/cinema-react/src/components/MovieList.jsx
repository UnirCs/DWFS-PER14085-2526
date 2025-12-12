import React from 'react';
import Movie from './Movie';

function MovieList() {
    const movies = [
        {
            id: 1,
            title: "Inception",
            image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            synopsis: "Dom Cobb es un ladrón hábil, el mejor de todos, especializado en el peligroso arte de extracción: el robo de secretos valiosos desde las profundidades del subconsciente durante el estado de sueño cuando la mente está más vulnerable. Esta habilidad excepcional de Cobb le ha hecho un jugador codiciado en el traicionero nuevo mundo de espionaje corporativo, pero al mismo tiempo, le ha convertido en un fugitivo internacional y ha tenido que sacrificar todo que le importaba. Ahora a Cobb se le ofrece una oportunidad para redimirse. Con un último trabajo podría recuperar su vida anterior, pero solamente si logra lo imposible.",
            duration: 148,
            genre: "Ciencia Ficción, Acción",
            rating: 7.8
        },
        {
            id: 2,
            title: "Pulp Fiction",
            image: "https://image.tmdb.org/t/p/w1280/hNcQAuquJxTxl2fJFs1R42DrWcf.jpg",
            synopsis: "Jules y Vincent, dos asesinos a sueldo con muy pocas luces, trabajan para Marsellus Wallace. Vincent le confiesa a Jules que Marsellus le ha pedido que cuide de Mia, su mujer. Jules le recomienda prudencia porque es muy peligroso sobrepasarse con la novia del jefe. Cuando llega la hora de trabajar, ambos deben ponerse manos a la obra. Su misión: recuperar un misterioso maletín.",
            duration: 154,
            genre: "Cine Negro, Drama, Thriller",
            rating: 8.5
        },
        {
            id: 3,
            title: "Interstellar",
            image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            synopsis: "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de garantizar la supervivencia de la humanidad.",
            duration: 169,
            genre: "Ciencia Ficción, Drama",
            rating: 8.6
        },
        {
            id: 4,
            title: "El Club de la lucha",
            image: "https://image.tmdb.org/t/p/w1280/sgTAWJFaB2kBvdQxRGabYFiQqEK.jpg",
            synopsis: "Un joven sin ilusiones lucha contra su insomnio, consecuencia quizás de su hastío por su gris y rutinaria vida. En un viaje en avión conoce a Tyler Durden, un carismático vendedor de jabón que sostiene una filosofía muy particular: el perfeccionismo es cosa de gentes débiles; en cambio, la autodestrucción es lo único que hace que realmente la vida merezca la pena. Ambos deciden entonces formar un club secreto de lucha donde descargar sus frustaciones y su ira que tendrá un éxito arrollador.",
            duration: 139,
            genre: "Ciencia Ficción, Drama",
            rating: 8.4
        },
        {
            id: 5,
            title: "La lista de Schindler",
            image: "https://image.tmdb.org/t/p/w1280/3Ho0pXsnMxpGJWqdOi0KDNdaTkT.jpg",
            synopsis: "Oskar Schindler, un hombre de enorme astucia y talento para las relaciones públicas, organiza un ambicioso plan para ganarse la simpatía de los nazis. Después de la invasión de Polonia por los alemanes, consigue, gracias a sus relaciones con los nazis, la propiedad de una fábrica de Cracovia. Allí emplea a cientos de operarios judíos, cuya explotación le hace prosperar rápidamente. Su gerente, también judío, es el verdadero director en la sombra, pues Schindler no tiene el menor conocimiento industrial.",
            duration: 195,
            genre: "Drama, Historia, Bélico",
            rating: 9
        },
        {
            id: 6,
            title: "El padrino",
            image: "https://image.tmdb.org/t/p/w1280/ApiEfzSkrqS4m1L5a2GwWXzIiAs.jpg",
            synopsis: "Don Vito Corleone, conocido dentro de los círculos del hampa como 'El Padrino', es el patriarca de una de las cinco familias que ejercen el mando de la Cosa Nostra en Nueva York en los años cuarenta. Don Corleone tiene cuatro hijos: una chica, Connie, y tres varones; Sonny, Michael y Fredo. Cuando el Padrino reclina intervenir en el negocio de estupefacientes, empieza una cruenta lucha de violentos episodios entre las distintas familias del crimen organizado.",
            duration: 195,
            genre: "Drama, Crimen",
            rating: 9.5
        },
        {
            id: 7,
            title: "La milla verde",
            image: "https://image.tmdb.org/t/p/w1280/aBQiJRxGRrX0mXFMjxyzWYFtEnf.jpg",
            synopsis: "En el sur de los Estados Unidos, en plena Depresión, Paul Edgecomb es un vigilante penitenciario a cargo de la Milla Verde, un pasillo que separa las celdas de los reclusos condenados a la silla eléctrica. Esperando su ejecución está John Coffey, un gigantesco negro acusado de asesinar brutalmente a dos hermanas de nueve años. Tras una personalidad ingenua, Coffey esconde un don sobrenatural prodigioso. A medida que transcurre la historia, Paul Edgecomb aprende que los milagros ocurren... incluso en los lugares más insospechados.",
            duration: 189,
            genre: "Fantasía, Drama, Crimen",
            rating: 9.5
        },
        {
            id: 8,
            title: "El resplandor",
            image: "https://image.tmdb.org/t/p/w1280/mm003Mj2e9kJRsrxiVdPn2BSBPh.jpg",
            synopsis: "Jack Torrance se traslada, junto a su mujer y a su hijo, al impresionante hotel Overlook, en Colorado, para encargarse del mantenimiento del mismo durante la temporada invernal, en la que permanece cerrado y aislado por la nieve. Su idea es escribir su novela al tiempo que cuida de las instalaciones durante esos largos y solitarios meses de invierno, pero desde su llegada al hotel, Jack comienza a padecer inquietantes transtornos de personalidad, al mismo tiempo que en el lugar comienzan a suceder diversos fenómenos paranormales.",
            duration: 146,
            genre: "Terror, Suspense",
            rating: 8.9
        }
    ];

    return (
        <div className="movie-list-container">
            <main className="movie-list-main">
                <h2 className="movie-list-title">Cartelera</h2>
                <div className="movie-list">
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
                </div>
            </main>
        </div>
    );
}

export default MovieList;