import React from "react";
import {Movie} from "./Movie";

export const MovieList = () => {
    const movies = [
        {
            id: 1,
            title: "ABUELA TREMENDA",
            img: "https://es.web.img2.acsta.net/img/90/00/90008baacf8ffffff15f0c77cdb46b8e.jpg",
            synopsis: "Toñi no es una abuela cualquiera. Es un torbellino, un alma libre que se mete siempre en líos. Cuando su hija Daniela se lleva a su nieta a un retiro rural, Toñi no duda en presentarse allí con su caravana para animar el cotarro a toda costa.",
            length: 98,
            genre: "Comedia",
            rating: 5.5
        },
        {
            id: 2,
            title: "AÍDA Y VUELTA",
            img: "https://m.media-amazon.com/images/M/MV5BYTg4YjI3MzEtODcwNC00MzcxLTljZWMtMGE0OGVlODUzYmE3XkEyXkFqcGc@._V1_.jpg",
            synopsis: "El largometraje aborda el rodaje de un capítulo de la serie con tramas que transcurren tanto dentro de la ficción con los personajes de 'Aída', como fuera de ella con los propios actores, reflexionando sobre los límites del humor y la fama.",
            length: 90,
            genre: "Comedia",
            rating: 6.7
        },
        {
            id: 3,
            title: "28 AÑOS DESPUÉS EL TEMPLO DE LOS HUESOS",
            img: "https://www.sonypictures.es/statics/large_28_BT_INTL_Online_1080_X1350_01_TRADUCIDO_864b13855b.jpg",
            synopsis: "Ampliando el mundo creado por Danny Boyle y Alex Garland, esta secuela da un giro radical. Dirigida por Nia DaCosta, nos sumerge en una nueva pesadilla infectada donde la supervivencia depende de desenterrar secretos en un templo olvidado.",
            length: 109,
            genre: "Terror",
            rating: 7.1
        },
        {
            id: 4,
            title: "FRANKIE Y LOS MONSTRUOS",
            img: "https://pics.filmaffinity.com/Frankie_y_los_monstruos-797354053-large.jpg",
            synopsis: "Frankie vive en un castillo-laboratorio lleno de criaturas extrañas y divertidas. Cuando un incidente amenaza su hogar, deberá liderar a su peculiar pandilla de monstruos para demostrar que no hay que juzgar a nadie por su apariencia.",
            length: 91,
            genre: "Animación",
            rating: 5.8
        },
        {
            id: 5,
            title: "AVATAR: FUEGO Y CENIZA",
            img: "https://lumiere-a.akamaihd.net/v1/images/41_coral3_payoff_1sht_spain_spanish_71c1681f.jpeg",
            synopsis: "Tercera entrega de la saga. Jake Sully y Neytiri se encuentran con el 'Pueblo de la Ceniza', un clan Na'vi volcánico y agresivo liderado por la despiadada Varang. Esta vez, los Na'vi no serán solo las víctimas, mostrando un lado más oscuro de Pandora.",
            length: 197,
            genre: "Ciencia Ficción",
            rating: 6.5
        },
        {
            id: 6,
            title: "LA ASISTENTA",
            img: "https://proyectonaschy.com/wp-content/uploads/2025/11/phkjcscn95wl.jpg?w=640",
            synopsis: "Una joven con un pasado complicado comienza a trabajar como asistenta en la lujosa casa de los Winchester. A medida que se adentra en la vida de la familia, descubrirá secretos oscuros que pondrán en peligro su seguridad.",
            length: 131,
            genre: "Thriller",
            rating: 6.7
        },
        {
            id: 7,
            title: "SEND HELP (ENVIAD AYUDA)",
            img: "https://www.mubis.es/media/articles/35629/358404/nuevo-trailer-y-poster-de-send-help-enviad-ayuda-con-trailer-de-send-help-enviad-ayuda-dirigida-por-sam-raimi-original.jpg?1768565313",
            synopsis: "Después de que un accidente de avión deje varados en una isla remota a una competente empleada y a su insoportable jefe, ella deberá utilizar sus habilidades de supervivencia para mantenerlos a ambos con vida, a pesar de su difícil relación.",
            length: 113,
            genre: "Comedia/Terror",
            rating: 6.5
        },
        {
            id: 8,
            title: "RONDALLAS",
            img: "https://pics.filmaffinity.com/Rondallas-842041198-large.jpg",
            synopsis: "Tras un naufragio en un pequeño pueblo de la costa gallega, la comunidad vive un duelo profundo. Algunos vecinos deciden recuperar la vieja agrupación de música tradicional, la rondalla, para intentar sanar las heridas y devolver la alegría al pueblo.",
            length: 112,
            genre: "Drama",
            rating: 7.2
        },
        {
            id: 9,
            title: "ÍDOLOS",
            img: "https://es.web.img3.acsta.net/c_310_420/img/d5/00/d5004f34483c616ebd12fe4bf4689433.jpg",
            synopsis: "Edu es un joven piloto de motos muy agresivo en quien ningún equipo confía. Eli, jefe del equipo de Aspar Team en Moto2, le da una oportunidad con la condición de que sea su padre, un expiloto retirado tras una tragedia, quien le entrene.",
            length: 126,
            genre: "Drama/Deporte",
            rating: 6.1
        }
    ];

    return (
        <div className="movie-container">
            {movies.map((movie) => (
                <Movie
                    key={movie.id}
                    title={movie.title}
                    img={movie.img}
                    synopsis={movie.synopsis}
                    length={movie.length}
                    genre={movie.genre}
                    rating={movie.rating}
                />
            ))}
    </div>
    )
}