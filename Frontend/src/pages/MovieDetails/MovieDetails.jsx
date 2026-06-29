import MovieCard from "../../components/homemovie/MovieCard";
import "./MovieDetails.css";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();

  const movie = {
    title: "Foolish Wives",
    year: 1922,
    runtime: 117,
    genres: ["Drama"],

    plot: "A con artist masquerades as Russian nobility and attempts to seduce the wife of an American diplomat.",

    fullplot:
      '"Count" Karanzim, a Don Juan is with his cousins in Monte Carlo, living from fake money while trying to seduce the wife of the new American ambassador.',

    poster: "",

    imdb: {
      rating: 7.3,
      votes: 1777,
    },

    directors: ["Erich von Stroheim"],

    writers: ["Erich von Stroheim", "Marian Ainslee", "Walter Anthony"],

    cast: ["Rudolph Christians", "Miss DuPont", "Maude George", "Mae Busch"],

    countries: ["USA"],

    languages: ["English"],

    awards: {
      text: "1 Win",
    },

    tomatoes: {
      critic: {
        meter: 89,
      },
      viewer: {
        meter: 77,
      },
    },
  };

  const poster =
    movie.poster || "https://placehold.co/350x520/2c2c2c/ffffff?text=No+Poster";

  return (
    <div className="movie-page">
      <section className="hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url(${poster})`,
          }}
        />

        <div className="hero-overlay"></div>
      </section>

      <section className="hero-content">
        <div className="poster-box">
          <img src={poster} alt={movie.title} />
        </div>

        <div className="movie-main">
          <h1>{movie.title}</h1>

          <div className="meta">
            <span>⭐ {movie.imdb.rating}</span>

            <span>{movie.year}</span>

            <span>{movie.runtime} min</span>
          </div>

          <div className="genre-list">
            {movie.genres.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>

          <div className="buttons">
            <button className="rent-btn">Rent Movie</button>

            <button className="wishlist-btn">Wishlist</button>
          </div>
        </div>
      </section>

      <section className="overview">
        <h2>Overview</h2>

        <p>{movie.fullplot}</p>
      </section>

      <section className="details-grid">
        <div className="info-card">
          <h3>Movie Information</h3>

          <div className="info-row">
            <span>Director</span>
            <strong>{movie.directors.join(", ")}</strong>
          </div>

          <div className="info-row">
            <span>Writers</span>
            <strong>{movie.writers.join(", ")}</strong>
          </div>

          <div className="info-row">
            <span>Languages</span>
            <strong>{movie.languages.join(", ")}</strong>
          </div>

          <div className="info-row">
            <span>Country</span>
            <strong>{movie.countries.join(", ")}</strong>
          </div>

          <div className="info-row">
            <span>Runtime</span>
            <strong>{movie.runtime} min</strong>
          </div>

          <div className="info-row">
            <span>Year</span>
            <strong>{movie.year}</strong>
          </div>
        </div>

        <div className="ratings-card">
          <h3>Ratings</h3>

          <div className="rating-box">
            <span>IMDb</span>

            <strong>{movie.imdb.rating}</strong>

            <small>{movie.imdb.votes} votes</small>
          </div>

          <div className="rating-box">
            <span>Critics</span>

            <strong>{movie.tomatoes.critic.meter}%</strong>
          </div>

          <div className="rating-box">
            <span>Audience</span>

            <strong>{movie.tomatoes.viewer.meter}%</strong>
          </div>
        </div>
      </section>

      <section className="cast-section">
        <h2>Cast</h2>

        <div className="cast-list">
          {movie.cast.map((actor) => (
            <div className="cast-chip" key={actor}>
              {actor}
            </div>
          ))}
        </div>
      </section>

      <section className="awards-section">
        <h2>Awards</h2>

        <div className="award-card">🏆 {movie.awards.text}</div>
      </section>

      <section className="facts-section">
        <h2>Movie Facts</h2>

        <div className="facts-grid">
          <div className="fact-card">
            <h4>Production</h4>

            <p>{movie.tomatoes.production}</p>
          </div>

          <div className="fact-card">
            <h4>Type</h4>

            <p>{movie.type}</p>
          </div>

          <div className="fact-card">
            <h4>Genres</h4>

            <p>{movie.genres.join(", ")}</p>
          </div>

          <div className="fact-card">
            <h4>Release Year</h4>

            <p>{movie.year}</p>
          </div>
        </div>
      </section>

      <section className="similar-section">
        <h2>You May Also Like</h2>

        <div className="similar-slider">
          <MovieCard movie={movie} />

          <MovieCard movie={movie} />

          <MovieCard movie={movie} />

          <MovieCard movie={movie} />

          <MovieCard movie={movie} />
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
