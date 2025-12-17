import Header from '../components/Header.jsx'
import MovieCard from '../components/MovieCard.jsx'
import Footer from '../components/Footer.jsx'
import moviesData from '../data/movies.json'
import '../styles/Overview.css' 

function Overview() {
  return (
    <div>
      <Header />
      <main className="movie-grid">
        {moviesData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </main>
      <Footer />
    </div>
  )
}