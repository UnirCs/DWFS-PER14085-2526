import React from 'react';
import { useParams } from 'react-router-dom';
import Movie from '../components/Movie';
import { CinemaContext } from '../context/CinemaContext';

export const DetailsMovie = () => {
    const id = useParams();
    const { movies } = React.useContext(CinemaContext);
    const movie = movies.find((m) => m.id === parseInt(id.id));
    return (
        <Movie movie={movie} ></Movie>
    );
}