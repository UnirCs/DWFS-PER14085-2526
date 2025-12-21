import React from 'react';
import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import MovieList from "../components/MovieList.jsx";

export const Overview = () => {

    return (
        <div>
            <Header/>
            <MovieList/>
            <Footer/>
        </div>
    );
}