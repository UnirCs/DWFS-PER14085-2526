import { Movie } from "./Movie";
import './Movielist.css'

    export const movies=[
        { id: 1,
          titulo:'My llitle Pony',
          imagen: 'https://m.media-amazon.com/images/S/pv-target-images/0e43deec864bcba1eeff4b7d068729f749e9c874171ee9ec8e5b72e1e75ba4af.png',
          sinopsis: 'la magia de la amistad',
          duracion: '1h:30m',
          genero: 'Infantil',
          puntacion: '5/5'
        },

          { id: 2,
          titulo:'El nino feo ',
          imagen: 'https://m.media-amazon.com/images/M/MV5BODFhN2Q0YWUtMWVmZS00OGQyLTk5NTYtYWNhNzU2NDBmYTEyXkEyXkFqcGc@._V1_QL75_UY281_CR5,0,190,281_.jpg',
          sinopsis: 'son feos',
          duracion: '1h:30m',
          genero: 'Infantil',
          puntacion: '3/5'
        },

         { id: 3,
          titulo:'Mario Bros',
          imagen: 'https://m.media-amazon.com/images/S/pv-target-images/8f736db97b078f3cabac0016447a7a8830e5e2aa39cbaec68a67df46c3865de3.jpg',
          sinopsis: 'fontanero agil',
          duracion: '1h:30m',
          genero: 'videjuegos',
          puntacion: '4.5/5'
        },

        { id: 4,
          titulo:'BlackJack',
          imagen: 'https://images.justwatch.com/poster/176339155/s718/21-black-jack.jpg',
          sinopsis: 'Juego de Math con alchool',
          duracion: '2h:10m',
          genero: 'Juegos',
          puntacion: '4/5'
        },

        { id: 5,
        titulo:'El Último Horizonte',
        imagen: 'https://m.media-amazon.com/images/M/MV5BODc4OTRiZWItMGE0MC00OGY4LWEyNjctYjc3NjJhMWE0MmYzXkEyXkFqcGc@._V1_.jpg',
        sinopsis: 'Un grupo de exploradores viaja a un planeta desconocido en busca de una nueva esperanza.',
        duracion: '2h:05m',
        genero: 'Ciencia Ficción',
        puntacion: '4/5'
        },

        { id: 6,
        titulo:'Sombras del Pasado',
        imagen: 'https://m.media-amazon.com/images/S/pv-target-images/2b50611b9a7fd5c6b725ed7a5868dc1117f0d733b31ec7910fd8c2386688e500.png',
        sinopsis: 'Un joven descubre secretos familiares que cambian todo lo que creía saber.',
        duracion: '1h:50m',
        genero: 'Drama',
        puntacion: '5/5'
        },

        { id: 7,
        titulo:'Código Silencioso',
        imagen: 'https://m.media-amazon.com/images/S/pv-target-images/1876bcb6d60c7847ead558fca9549e5d7a03fe1b370490f3b13e385b51c5405c.jpg',
        sinopsis: 'Un hacker adolescente se ve envuelto en una conspiración internacional.',
        duracion: '1h:40m',
        genero: 'Suspenso',
        puntacion: '4/5'
        },

        { id: 8,
        titulo:'La Trinchera Infinita',
        imagen: 'https://es.web.img2.acsta.net/pictures/19/09/17/17/10/5806561.jpg',
        sinopsis: 'Un grupo queda atrapado en un rascacielos lleno de misterios y acertijos.',
        duracion: '2h',
        genero: 'Aventura',
        puntacion: '3/5'
        },

        { id: 9,
        titulo:'Criaturas del Bosque',
        imagen: 'https://pics.filmaffinity.com/Donde_viven_los_monstruos-770736079-mmed.jpg',
        sinopsis: 'Unos amigos descubren seres mágicos ocultos en un bosque antiguo.',
        duracion: '1h:30m',
        genero: 'Fantasía',
        puntacion: '4/5'
        },

        { id: 10,
        titulo:'Ritmo Salvaje',
        imagen: 'https://es.web.img2.acsta.net/medias/nmedia/18/67/89/80/20251177.jpg',
        sinopsis: 'Un talentoso bailarín lucha por cumplir su sueño en la ciudad.',
        duracion: '1h:55m',
        genero: 'Musical',
        puntacion: '4/5'
        }
    ]
    export const MovieList= () =>{
    
    return(
           <div className="movie-list">
             <h1> Para acceder al boton de comprar Asiento o Boleto hay que entrar a la pelicula </h1>
           {movies.map(movie=>(<Movie key={movie.id} {...movie}/>))}
           
           </div>
    )}