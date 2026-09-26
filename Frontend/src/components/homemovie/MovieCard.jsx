import "./MovieCard.css";

import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const releaseYear = movie.released
    ? new Date(movie.released).getFullYear()
    : "N/A";

  const rating = movie.imdb?.rating ?? "N/A";

  return (
    <Link
      to={`/movie/${movie._id}`}
      className="movie-card-link"
      draggable="false"
    >
      <div className="movie-card">
        <div className="poster-wrapper">
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="movie-poster"
              draggable="false"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/movie-placeholder.gif";
              }}
            />
          ) : (
            <div className="movie-poster-placeholder">No Poster</div>
          )}

          <div className="rating-badge">⭐ {rating}</div>
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{releaseYear}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
