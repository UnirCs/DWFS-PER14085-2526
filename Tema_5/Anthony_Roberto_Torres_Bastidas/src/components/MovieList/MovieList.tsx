import React from 'react';
import Movie from "../Movie/Movie";
import Box from '@mui/material/Box';
import moviePlaceholder from '../../assets/movie.svg';
import styles from './MovieList.module.css';

interface ListMoviesProps {
}

const movies = [
    { imdbID: 1,Title: "The Shawshank Redemption", Duration: "100", Score: 10, Type: "fiction", Sinopsis:"El multimillonario John Hammond hace realidad su sueño de clonar dinosaurios del Jurásico y crear con ellos un parque temático en una isla. Antes de abrir el parque al público general, Hammond invita a una pareja de científicos y a un matemático para que comprueben la viabilidad del proyecto. Sin embargo, el sistema de seguridad falla y los dinosaurios se escapan." , Poster: moviePlaceholder },
    { imdbID: 2,Title: "The Shawshank Redemption", Duration: "194", Score: 4, Type: "fiction", Sinopsis:"El multimillonario John Hammond hace realidad su sueño de clonar dinosaurios del Jurásico y crear con ellos un parque temático en una isla. Antes de abrir el parque al público general, Hammond invita a una pareja de científicos y a un matemático para que comprueben la viabilidad del proyecto. Sin embargo, el sistema de seguridad falla y los dinosaurios se escapan." , Poster: moviePlaceholder },
    { imdbID: 3,Title: "The Shawshank Redemption", Duration: "94", Score: 7, Type: "fiction", Sinopsis:"El multimillonario John Hammond hace realidad su sueño de clonar dinosaurios del Jurásico y crear con ellos un parque temático en una isla. Antes de abrir el parque al público general, Hammond invita a una pareja de científicos y a un matemático para que comprueben la viabilidad del proyecto. Sin embargo, el sistema de seguridad falla y los dinosaurios se escapan." , Poster: moviePlaceholder },
    { imdbID: 4,Title: "The Shawshank Redemption", Duration: "4", Score: 1, Type: "fiction", Sinopsis:"El multimillonario John Hammond hace realidad su sueño de clonar dinosaurios del Jurásico y crear con ellos un parque temático en una isla. Antes de abrir el parque al público general, Hammond invita a una pareja de científicos y a un matemático para que comprueben la viabilidad del proyecto. Sin embargo, el sistema de seguridad falla y los dinosaurios se escapan." , Poster: moviePlaceholder },
    { imdbID: 5,Title: "The Shawshank Redemption", Duration: "994", Score: 1, Type: "fiction", Sinopsis:"El multimillonario John Hammond hace realidad su sueño de clonar dinosaurios del Jurásico y crear con ellos un parque temático en una isla. Antes de abrir el parque al público general, Hammond invita a una pareja de científicos y a un matemático para que comprueben la viabilidad del proyecto. Sin embargo, el sistema de seguridad falla y los dinosaurios se escapan." , Poster: moviePlaceholder },
    { imdbID: 6,Title: "The Shawshank Redemption", Duration: "1994", Score: 4, Type: "fiction", Sinopsis:"El multimillonario John Hammond hace realidad su sueño de clonar dinosaurios del Jurásico y crear con ellos un parque temático en una isla. Antes de abrir el parque al público general, Hammond invita a una pareja de científicos y a un matemático para que comprueben la viabilidad del proyecto. Sin embargo, el sistema de seguridad falla y los dinosaurios se escapan." , Poster: moviePlaceholder },
    { imdbID: 7,Title: "The Shawshank Redemption", Duration: "1994", Score: 9, Type: "fiction", Sinopsis:"El multimillonario John Hammond hace realidad su sueño de clonar dinosaurios del Jurásico y crear con ellos un parque temático en una isla. Antes de abrir el parque al público general, Hammond invita a una pareja de científicos y a un matemático para que comprueben la viabilidad del proyecto. Sin embargo, el sistema de seguridad falla y los dinosaurios se escapan." , Poster: moviePlaceholder },
    { imdbID: 8,Title: "The Shawshank Redemption", Duration: "1994", Score: 1, Type: "fiction", Sinopsis:"El multimillonario John Hammond hace realidad su sueño de clonar dinosaurios del Jurásico y crear con ellos un parque temático en una isla. Antes de abrir el parque al público general, Hammond invita a una pareja de científicos y a un matemático para que comprueben la viabilidad del proyecto. Sin embargo, el sistema de seguridad falla y los dinosaurios se escapan." , Poster: moviePlaceholder },
];

const MovieList: React.FC<ListMoviesProps> = () => {
    return (
        <div className={styles.container}>
            {movies.map((movie) => (
                <Box key={movie.imdbID} sx={{
                    width: {
                        xs: '100%',
                        sm: 'calc(50% - 12px)',
                        md: 'calc(33.333% - 16px)',
                        lg: 'calc(25% - 18px)'
                    }
                }}>
                    <Movie
                        Title={movie.Title}
                        Duration={movie.Duration}
                        Score={movie.Score}
                        Sinopsis={movie.Sinopsis}
                        Type={movie.Type}
                        ImdbID={movie.imdbID}
                        Poster={movie.Poster}
                    />
                </Box>
            ))}
        </div>
    );
};

export default MovieList;