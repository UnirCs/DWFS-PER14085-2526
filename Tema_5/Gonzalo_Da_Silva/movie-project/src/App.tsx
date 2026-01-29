import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './components/MovieList';
import { useMovies } from './hooks/useMovies';
import { ImDbMovieApiRepository } from './infra/imDbMovieApiRepository';
import axios from 'axios';


function App() {

  const movieApiRepository = new ImDbMovieApiRepository(axios);
  
  const { movies } = useMovies(movieApiRepository);

  return (
    <div className="app">
      <Header />
      <main>
        <MovieList movies={movies} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
