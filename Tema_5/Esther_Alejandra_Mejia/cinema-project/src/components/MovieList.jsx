import Movie from "./Movie";

export default function MovieList({ movies, onSelectSeats }) {
  return (
    <main className="movie-grid">
      {movies.map((movie, index) => (
        <Movie
          key={index}
          {...movie}
          onSelectSeats={() => onSelectSeats(movie)}
        />
      ))}
    </main>
  );
}

