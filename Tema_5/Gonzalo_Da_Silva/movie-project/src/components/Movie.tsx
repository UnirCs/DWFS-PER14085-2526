import './Movie.css';

interface MovieProps {
  title: string;
  image: string;
  synopsis: string;
  duration?: number;
  genre: string[];
  rating: number;
}

const Movie = ({ title, image, synopsis, duration, genre, rating }: MovieProps) => {
  return (
    <div className="movie-card">
      <div className="movie-image-container">
        <img src={image} alt={title} className="movie-image" />
        <div className="movie-rating">
          <span className="rating-star">★</span>
          <span className="rating-value">{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="movie-content">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-meta">
          {genre.map((g, index) => (
            <span key={index} className="movie-genre">{g}</span>
          ))}
          {duration && <span className="movie-duration">{duration} min</span>}
        </div>
        <p className="movie-synopsis">{synopsis}</p>
        <button className="movie-button">
          Seleccionar asientos
        </button>
      </div>
    </div>
  );
};

export default Movie;
