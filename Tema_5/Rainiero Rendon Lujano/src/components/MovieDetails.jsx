import { useParams } from "react-router-dom"; 
import { movies } from "./Movielist"; // este la lista de objetos o mis peliculas 


export const MovieDetail = () => {
    const {id} = useParams()
    const movie= movies.find(m => m.id ===Number(id))

    return(
        <>
         
      <h1>{movie.titulo}</h1>
      <img src={movie.imagen} alt={movie.titulo} />
      <p>{movie.sinopsis}</p>
      <p>{movie.duracion}</p>
      <p>{movie.genero}</p>
      <p>{movie.puntacion}</p>
    

       <button> Comprar Boleto </button>
        </>
      
      
  
    )
}