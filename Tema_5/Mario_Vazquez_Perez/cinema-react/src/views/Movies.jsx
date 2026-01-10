import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer';
import MovieList from '../components/MovieList';

function Movies() {
    return (
        <div className="movies-container">
            <Header />
            <MovieList />
            <Footer />
        </div>
    );
}

export default Movies;