import { useState } from 'react'
import './App.css'
import {Movie} from "./components/Movies";
import {Header} from "./components/Header"
import {Footer} from "./components/Footer";



function App() {
  const movies = [
        { name: "Interstellar", genero: "Ciencia Ficción / Drama:",sinopsis:'Una obra maestra visual de Christopher Nolan. Trata sobre un grupo de astronautas que viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad, explorando temas como el amor, el tiempo y la supervivencia.', rating: 4.5, image:'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg'},
        
        { name: "Parasite", genero: "Suspenso / Psicológico",sinopsis:'Esta película surcoreana hizo historia al ganar el Óscar a Mejor Película. Es una mezcla fascinante de comedia negra y thriller que analiza las diferencias de clase social a través de dos familias que se entrelazan de forma inesperada.', rating: 4.5, image:'https://puertafalsa.com/wp-content/uploads/2020/01/0c921ca22494902088e55f009228941f.jpg' },
        { name: "Spiderman: Across the Spider-Verse", genero: "Animación / Aventura",sinopsis:'Aunque es animada, es una joya para cualquier edad. Destaca por su estilo artístico innovador y una historia profunda sobre el destino, la identidad y el multiverso.', rating: 4.5,image:'https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg' },
        { name: "Mad Max: Fury Road", genero: "Acción / Post-apocalíptico",sinopsis:'Es pura adrenalina. Si buscas una película con efectos prácticos increíbles, persecuciones constantes y una estética visual única, esta es la elección perfecta.', rating: 4.5,image:'https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg' },
        { name: "The Truman Show", genero: "Comedia / Drama",sinopsis:'Un clásico moderno protagonizado por Jim Carrey. La película plantea una premisa aterradora pero fascinante: ¿qué pasaría si toda tu vida fuera en realidad un programa de televisión grabado las 24 horas sin que tú lo supieras?', rating: 4.5,image:'https://upload.wikimedia.org/wikipedia/en/c/cd/Trumanshow.jpg' },
    ];


  return (
    <div>
            <Header />
            <h2 className="center-text">Restaurantes Disponibles</h2>
            <div className="movies-container">
                {movies.map((movie, index) => (
                    <Movie
                        key={index}
                        name={movie.name}
                        image={movie.image}
                        genero={movie.genero}
                        sinopsis={movie.sinopsis}
                        rating={movie.rating}
                    />
                ))}
            </div>
            <Footer />
        </div>
  )
}

export default App
