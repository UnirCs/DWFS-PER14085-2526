import React from 'react';
import Movie from './Movie.jsx'

const MovieList = () => {

 const Peliculas = [
  { id: 1, titulo: "La era del hielo", imagen:"era_hielo.jpg", sinopsis: "Hace 20.000 años, la Tierra es un lugar prehistórico lleno de peligros, entre ellos el comienzo de la Edad de hielo. Para evitar quedarse congelados, las criaturas majestuosas empiezan a migrar hacia el sur. Entonces, un grupo de animales muy distintos, entre los que se encuentra un mamut gruñón y un perezoso, deben ayudar a un niño perdido a regresar a su clan.",duracion: "2" ,genero: "Infantil", puntuacion: 6.9 },
  { id: 2, titulo: "Fractura", imagen:"fractura.jpg", sinopsis:" thriller psicológico de Netflix sobre Ray, cuya esposa e hija desaparecen misteriosamente de un hospital tras un accidente menor donde su hija se rompe un brazo, sumergiendo al padre en una pesadilla de intriga y dudas sobre su propia cordura, mientras busca respuestas en un hospital que parece ocultar secretos y no tiene registro de su familia, revelándose un oscuro giro sobre su realidad y una posible red criminal. ", duracion: "1.40", genero: "Terror", puntuacion: 6.5 },
  { id: 3, titulo: "Harta", imagen:"harta.jpg", sinopsis: "Una madre soltera llega al límite debido a sus dificultades económicas. Desesperada, sin tener dónde vivir y viendo amenazada la vida de su hija, irrumpe en un banco.", duracion: "2" , genero: "Drama", puntuacion: 7.5 },
  { id: 4, titulo: "Los Ilusionistas", imagen:"los_ilusionistas.jpg", sinopsis: "Un grupo, formado por los mejores ilusionistas del mundo, llevan a cabo arriesgados atracos contra hombres de negocios corruptos.", duracion: "1.50",genero: "Entretenimiento", puntuacion: 7.2  }, 
];

  return (
    <div className="movies-container">
        {Peliculas.map(({ id,titulo, imagen, sinopsis, duracion, genero,  puntuacion }) => (
          <Movie
            key={id}
            titulo={titulo}
            imagen={imagen}
            sinopsis={sinopsis}
            duracion = {duracion}
            genero={genero}
            puntuacion={puntuacion}
          />
        ))}
      </div>
  );
};

export default MovieList;