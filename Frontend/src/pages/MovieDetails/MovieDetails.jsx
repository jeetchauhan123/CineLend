import axios from "axios";
import MovieCard from "../../components/homemovie/MovieCard";
import Skeleton from "../../components/Skeleton/Skeleton";
import "./MovieDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("above use effect");
  useEffect(() => {
    const getdetail = async () => {
      try {
        const res = await axios.get("http://localhost:3000/moviepage");

        console.log("RESPONSE DATA:", res.data);
        console.log("POSTER:", res.data.poster);

        setMovieData(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error loading movie:", error);
        setLoading(false);
      }
    };

    getdetail();
  }, []);

  const poster =
    movieData?.poster ||
    "https://placehold.co/350x520/2c2c2c/ffffff?text=No+Poster";

  return (
    <div className="movie-page">
      <section className="hero">
        {loading ? (
          <Skeleton width="100%" height="100%" />
        ) : (
          <div
            className="hero-bg"
            style={{
              backgroundImage: `url(${poster})`,
            }}
          />
        )}

        <div className="hero-overlay"></div>
      </section>

      <section className="hero-content">
        <div className="poster-box">
          {loading ? (
            <Skeleton width="100%" height="100%" />
          ) : (
            <img src={poster} alt={movieData.title} />
          )}
        </div>

        <div className="movie-main">
          <h1 className="movie-title">
            {loading ? (
              <Skeleton width="320px" height="48px" />
            ) : (
              movieData.title || "N/A"
            )}
          </h1>

          <div className="meta">
            <span>
              {loading ? (
                <Skeleton width="60px" height="20px" />
              ) : (
                movieData.imdb?.rating || "N/A"
              )}
            </span>

            <span>
              {loading ? (
                <Skeleton width="50px" height="20px" />
              ) : (
                movieData.year || "N/A"
              )}
            </span>

            <span>
              {loading ? (
                <Skeleton width="80px" height="20px" />
              ) : movieData.runtime ? (
                `${movieData.runtime} min`
              ) : (
                "N/A"
              )}
            </span>
          </div>

          <div className="genre-list">
            {loading ? (
              <>
                <Skeleton width="70px" height="30px" borderRadius="20px" />
                <Skeleton width="85px" height="30px" borderRadius="20px" />
                <Skeleton width="65px" height="30px" borderRadius="20px" />
              </>
            ) : movieData.genres?.length ? (
              movieData.genres.map((genre) => <span key={genre}>{genre}</span>)
            ) : (
              <span>N/A</span>
            )}
          </div>

          <div className="buttons">
            <button className="rent-btn">Rent Movie</button>

            <button className="wishlist-btn">Wishlist</button>
          </div>
        </div>
      </section>

      <section className="overview">
        <h2>Overview</h2>

        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Skeleton width="97%" height="20px" />
            <Skeleton width="90%" height="20px" />
            <Skeleton width="94%" height="20px" />
            <Skeleton width="35%" height="20px" />
          </div>
        ) : (
          <p>{movieData.fullplot || "N/A"}</p>
        )}
      </section>

      <section className="details-grid">
        {/* left side */}
        <div className="info-card">
          <h3>Movie Information</h3>

          <div className="info-row">
            <span>Director</span>
            <strong>
              {loading ? (
                <Skeleton width="180px" height="18px" />
              ) : movieData.directors?.length ? (
                movieData.directors.join(", ")
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="info-row">
            <span>Writers</span>
            <strong>
              {loading ? (
                <Skeleton width="220px" height="18px" />
              ) : movieData.writers?.length ? (
                movieData.writers.join(", ")
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="info-row">
            <span>Languages</span>
            <strong>
              {loading ? (
                <Skeleton width="100px" height="18px" />
              ) : movieData.languages?.length ? (
                movieData.languages.join(", ")
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="info-row">
            <span>Country</span>
            <strong>
              {loading ? (
                <Skeleton width="120px" height="18px" />
              ) : movieData.countries?.length ? (
                movieData.countries.join(", ")
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="info-row">
            <span>Runtime</span>
            <strong>
              {loading ? (
                <Skeleton width="80px" height="18px" />
              ) : movieData.runtime ? (
                `${movieData.runtime} min`
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="info-row">
            <span>Year</span>
            <strong>
              {loading ? (
                <Skeleton width="60px" height="18px" />
              ) : (
                movieData.year || "N/A"
              )}
            </strong>
          </div>
        </div>

        {/* right side */}
        <div className="ratings-card">
          <h3>Ratings</h3>

          <div className="rating-box">
            <span>IMDb</span>

            <strong>
              {loading ? (
                <Skeleton width="45px" height="26px" />
              ) : (
                movieData.imdb?.rating || "N/A"
              )}
            </strong>

            <small>
              {loading ? (
                <Skeleton width="80px" height="18px" />
              ) : movieData.imdb?.votes ? (
                `${movieData.imdb.votes} votes`
              ) : (
                "N/A"
              )}
            </small>
          </div>

          <div className="rating-box">
            <span>Critics</span>

            <strong>
              {loading ? (
                <Skeleton width="45px" height="26px" />
              ) : movieData.tomatoes?.critic?.meter ? (
                `${movieData.tomatoes.critic.meter}%`
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="rating-box">
            <span>Audience</span>

            <strong>
              {loading ? (
                <Skeleton width="45px" height="26px" />
              ) : movieData.tomatoes?.viewer?.meter ? (
                `${movieData.tomatoes.viewer.meter}%`
              ) : (
                "N/A"
              )}
            </strong>
          </div>
        </div>
      </section>

      <section className="cast-section">
        <h2>Cast</h2>

        <div className="cast-list">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                width="120px"
                height="40px"
                borderRadius="20px"
              />
            ))
          ) : movieData.cast?.length ? (
            movieData.cast.map((actor) => (
              <div className="cast-chip" key={actor}>
                {actor}
              </div>
            ))
          ) : (
            <span>N/A</span>
          )}
        </div>
      </section>

      <section className="awards-section">
        <h2>Awards</h2>

        <div className="award-card">
          {loading ? (
            <Skeleton width="180px" height="20px" />
          ) : movieData.awards?.text ? (
            <>🏆 {movieData.awards.text}</>
          ) : (
            "N/A"
          )}
        </div>
      </section>

      <section className="facts-section">
        <h2>Movie Facts</h2>

        <div className="facts-grid">
          <div className="fact-card">
            <h4>Production</h4>

            <div>
              {loading ? (
                <Skeleton width="140px" height="18px" />
              ) : (
                movieData.tomatoes?.production || "N/A"
              )}
            </div>
          </div>

          <div className="fact-card">
            <h4>Type</h4>

            <div>
              {loading ? (
                <Skeleton width="80px" height="18px" />
              ) : (
                movieData.type || "N/A"
              )}
            </div>
          </div>

          <div className="fact-card">
            <h4>Genres</h4>

            <div>
              {loading ? (
                <Skeleton width="150px" height="18px" />
              ) : movieData.genres?.length ? (
                movieData.genres.join(", ")
              ) : (
                "N/A"
              )}
            </div>
          </div>

          <div className="fact-card">
            <h4>Release Year</h4>

            <div>
              {loading ? (
                <Skeleton width="60px" height="18px" />
              ) : (
                movieData.year || "N/A"
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="similar-section">
        <h2>You May Also Like</h2>

        <div className="similar-slider">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                width="240px"
                height="360px"
                borderRadius="12px"
              />
            ))
          ) : (
            <>
              <MovieCard movie={movieData} />
              <MovieCard movie={movieData} />
              <MovieCard movie={movieData} />
              <MovieCard movie={movieData} />
              <MovieCard movie={movieData} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
