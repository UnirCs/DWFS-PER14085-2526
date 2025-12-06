import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <MovieList />
      <Footer />
    </div>
  );
}

export default App;
