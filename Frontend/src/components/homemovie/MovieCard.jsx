import "./MovieCard.css";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie-card">
        <div className="poster-wrapper">
          <img
            src={movie.image}
            alt={movie.title}
            className="movie-poster"
            draggable="false"
          />

          <div className="rating-badge">
            {/* ⭐ {movie.rating} */}
            {movie.rating}
          </div>
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>

          <p>{movie.year}</p>
        </div>

      </div>
    </Link>
  );
}

export default MovieCard;