import React from "react";
import Movie from "./Movie.jsx";
import "../estilos/movieList.css";
import inception from "../assets/inception.jpg";
import interstellar from "../assets/interstellar.jpg";
import darkknight from "../assets/darkknight.jpg";

function MovieList() {
    const movies = [
        {
            title: "Inception",
            image: inception,
            synopsis: "Un ladrón que roba secretos corporativos a través de sueños.",
            duration: 148,
            genre: "Ciencia Ficción",
            rating: 8.8,
        },
        {
            title: "Interstellar",
            image: interstellar,
            synopsis: "Un grupo de astronautas viaja a través de un agujero de gusano.",
            duration: 169,
            genre: "Aventura / Ciencia Ficción",
            rating: 8.6,
        },
        {
            title: "The Dark Knight",
            image: darkknight,
            synopsis: "Batman enfrenta al Joker en Gotham.",
            duration: 152,
            genre: "Acción / Drama",
            rating: 9.0,
        },
    ];

    return (
        <main className="movie-list">
            {movies.map((movie, index) => (
                <Movie key={index} {...movie} />
            ))}
        </main>
    );
}

export default MovieList;
