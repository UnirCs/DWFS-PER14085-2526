import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieList from "../components/MovieList";

export default function Principal() {
  return (
    <div className="cinema">
      <Header />

      <main className="cinema__main">
        <div className="container cinema__layout">
          <section aria-label="Cartelera">
            <h2 className="movies__title">Cartelera</h2>
            <p className="movies__subtitle">
              Selecciona una película para continuar a la selección de asientos.
            </p>
            <MovieList />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}