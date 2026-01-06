import { useEffect, useState } from "react";
import { movies } from "../data/movies";

export const useMovies = () => {

    const [movie, setMovies] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setMovies(movies);
        }, 2500);
    }, []);

    return movie;
}