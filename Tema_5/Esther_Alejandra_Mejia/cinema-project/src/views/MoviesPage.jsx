import { useState } from "react";
import "../styles/cinema.css";
import batmanImg from "../assets/movies/batman.jpg"; 
import inceptionImg from"../assets/movies/inception.jpg";
import interstellarImg from"../assets/movies/interstellar.jpg";
import matrixImg from"../assets/movies/matrix.jpg"

import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieList from "../components/MovieList";
import SeatsPage from "./SeatsPage";

export default function MoviesPage() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movies = [
    {
      title: "Matrix",
      image: matrixImg,
      synopsis: "Un hacker descubre la verdad sobre su realidad.",
      duration: "136 min",
      genre: "Ciencia ficción",
      rating: "8.7",
    },
    {
      title: "Inception",
      image: inceptionImg,
      synopsis: "Sueños dentro de sueños.",
      duration: "148 min",
      genre: "Acción",
      rating: "8.8",
    },
    {
      title: "Interstellar",
      image: interstellarImg,
      synopsis: "Una misión para salvar a la humanidad explorando el espacio.",
      duration: "169 min",
      genre: "Ciencia ficción",
      rating: "8.6",
    },
    {
      title: "The Dark Knight",
      image: batmanImg,
      synopsis: "Batman enfrenta al Joker en Gotham.",
      duration: "152 min",
      genre: "Acción / Drama",
      rating: "9.0",
    },
  ];

  const handleSelectSeats = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBack = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="page">
      <div className="container">
        <Header />

        {!selectedMovie ? (
          <MovieList movies={movies} onSelectSeats={handleSelectSeats} />
        ) : (
          <SeatsPage movie={selectedMovie} onBack={handleBack} />
        )}

        <Footer />
      </div>
    </div>
  );
}
