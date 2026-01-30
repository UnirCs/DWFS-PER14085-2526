import MovieList from "../components/MovieList";
import movies from "../data/movies";

export default function Home() {
  return (
    <main>
      <section id="peliculas">
        <h2>CARTELERA</h2>
        <MovieList movies={movies} />
      </section>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <a href="/sala" className="btn-go-to-seats">
          Ir a Selección de Sillas
        </a>
      </div>
    </main>
  );
}
