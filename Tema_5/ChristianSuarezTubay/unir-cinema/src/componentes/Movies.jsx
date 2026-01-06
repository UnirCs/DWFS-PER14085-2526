import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import MovieList from "./MovieList.jsx";

export default function MoviesPage() {
    return (
        <div>
            <Header />
            <MovieList />
            <Footer />
        </div>
    );
}
