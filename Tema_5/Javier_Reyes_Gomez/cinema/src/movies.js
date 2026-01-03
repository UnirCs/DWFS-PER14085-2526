import jurassicPark from "./assets/jurassic-park.jpg";
import forrestGump from "./assets/forrest-gump.jpg";
import interstellar from "./assets/interstellar.jpg";
import endgame from "./assets/endgame.jpg";

const movies = [
  {
    id: 1,
    title: "Jurassic Park",
    image: jurassicPark,
    synopsis: "Un parque temático con dinosaurios clonados se vuelve incontrolable.",
    duration: 127,
    genre: "Aventura / Ciencia ficción",
    rating: 8.1
  },
  {
    id: 2,
    title: "Interstellar",
    image: interstellar,
    synopsis: "Un grupo de astronautas viaja a través de un agujero de gusano.",
    duration: 169,
    genre: "Ciencia ficción / Drama",
    rating: 8.6
  },
  {
    id: 3,
    title: "Forrest Gump",
    image: forrestGump,
    synopsis: "La historia de un hombre sencillo que presencia eventos clave del siglo XX.",
    duration: 142,
    genre: "Drama / Romance",
    rating: 8.8
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    image: endgame,
    synopsis: "Los Vengadores intentan revertir el caos causado por Thanos.",
    duration: 181,
    genre: "Acción / Fantasía",
    rating: 8.4
  }
];

export default movies;
