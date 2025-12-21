import React from "react";
import Header from "./header";
import Footer from "./footer";
import MovieList from "./movieList";

export default function MoviesPage() {
    return (
        <div>
            <Header />
            <MovieList />
            <Footer />
        </div>
    );
}
