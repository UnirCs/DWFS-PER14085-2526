import React from "react";
import "../styles/header.css";
export const Header = () => {

    return (
        <header className="header">
            <h1 className="header-text">Cines Alejandro</h1>

            <div className="barra-botones">
                <button className="barra-botones__inicio">
                    Inicio
                </button>
                <button className="barra-botones__cartelera">
                    Cartelera
                </button>
                <button className="barra-botones__peliculas">
                    Películas
                </button>
                <button className="barra-botones__cines">
                    Cines
                </button>
            </div>
        </header>
    );
}