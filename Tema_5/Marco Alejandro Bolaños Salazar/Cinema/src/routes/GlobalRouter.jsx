import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaPrincipal from "../views/Movies";
import Landing from '../views/landing';
import { DetailsMovie } from '../views/DetailsMovie';

function GlobalRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/movies" element={<Layout><PaginaPrincipal /></Layout>} />
                <Route path="/movies/:id" element={<Layout><DetailsMovie /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
}

const Layout = ({ children }) => (
    <>
        {children}
    </>
);

export default GlobalRouter;
