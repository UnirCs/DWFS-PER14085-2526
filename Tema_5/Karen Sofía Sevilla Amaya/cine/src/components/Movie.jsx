import React from "react";


const Pelicula = ({ titulo, imagen, sinopsis, duracion, genero, puntuacion }) => {
  return (
    <div className="card">
      <img src={`/imagenes/${imagen}`} className="card-img" />
      <div className="card-body">
        <h3>{titulo}</h3>
        <p><strong>Sinopsis:</strong> {sinopsis}</p>
        <p><strong>Duración:</strong> {duracion}</p>
        <p><strong>Género:</strong> {genero}</p>
        <p><strong>Puntuación:</strong> {puntuacion}</p>
        <button onClick={() => alert(`Selecciona butaca para  ${titulo}`)}>
          Selección Butaca
        </button>
      </div>
    </div>
  );
};

export default Pelicula;
