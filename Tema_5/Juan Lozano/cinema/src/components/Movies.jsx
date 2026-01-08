import React from "react";

export const Movie = ({ name,image, genero,sinopsis, rating }) => {
    return (
        <div className="card">
            <img src={image} alt="image" className="imageMovie" />
            <dir className='infoMovie'>
            <h3 className="name">{name}</h3>
            <p>Genero: {genero}</p>
            <p>Sinopsis: {sinopsis}</p>
            <p>Calificación: {rating} / 5</p>
            <button className="botonSillas">selección de asientos </button>
            </dir>
            
        </div>
    );
}