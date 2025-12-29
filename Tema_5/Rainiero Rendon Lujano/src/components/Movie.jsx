import { Link } from "react-router-dom";
import './Movie.css'
export function Movie ({id, titulo, imagen, sinopsis, duracion, genero, puntacion}) {
      
    return(
        <div className="movie-card">
        <Link to={`/movie/${id}`}>
         <img src={imagen} alt={titulo}/>        
        </Link>
          
        
        <p>{titulo}</p> 
        <p> {sinopsis.substring(0,200) + '...'} <Link to={`/movie/${id}`}>  ver mas.. </Link></p> 
        <p> {duracion} </p>
        <p> {genero} </p>
        <p> {puntacion} </p>

        
        </div>
    )

}