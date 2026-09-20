import { Link } from "react-router-dom";

import Skeleton from "../../../../components/Skeleton/Skeleton";

import "./MovieAbout.css";

const MovieAbout = ({ movie, loading }) => {
  const discoverLink = (param, value) =>
    `/discover?${new URLSearchParams({
      [param]: value,
    }).toString()}`;

  const releaseDate = movie?.released
    ? new Date(movie.released).toLocaleDateString(
        "en-US",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "N/A";

  const rating = movie?.imdb?.rating ?? "N/A";

  const runtime = movie?.runtime
    ? `${movie.runtime} min`
    : "N/A";

  return (
    <section className="movie-section movie-about">
      <img
        className="movie-about__decoration"
        src="/image4.png"
        alt=""
        aria-hidden="true"
      />

      <div className="movie-section__heading">
        <span className="movie-section__eyebrow">
          THE FILM
        </span>

        <h2>About the Film</h2>
      </div>

      <div className="movie-about__layout">
        <div className="movie-about__details">
          <div className="movie-detail-item">
            <span>Director</span>

            <strong>
              {loading ? (
                <Skeleton
                  width="180px"
                  height="18px"
                />
              ) : movie?.directors?.length ? (
                movie.directors.map(
                  (director, index) => (
                    <span key={director}>
                      {index > 0 && ", "}

                      <Link
                        to={discoverLink(
                          "director",
                          director
                        )}
                        className="movie-discover-link"
                      >
                        {director}
                      </Link>
                    </span>
                  )
                )
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span>Writers</span>

            <strong>
              {loading ? (
                <Skeleton
                  width="220px"
                  height="18px"
                />
              ) : movie?.writers?.length ? (
                movie.writers.map((writer, index) => (
                  <span key={writer}>
                    {index > 0 && ", "}

                    <Link
                      to={discoverLink(
                        "writer",
                        writer
                      )}
                      className="movie-discover-link"
                    >
                      {writer}
                    </Link>
                  </span>
                ))
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span>Released</span>

            <strong>
              {loading ? (
                <Skeleton
                  width="140px"
                  height="18px"
                />
              ) : (
                releaseDate
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span>Languages</span>

            <strong>
              {loading ? (
                <Skeleton
                  width="130px"
                  height="18px"
                />
              ) : movie?.languages?.length ? (
                movie.languages.map(
                  (language, index) => (
                    <span key={language}>
                      {index > 0 && ", "}

                      <Link
                        to={discoverLink(
                          "languages",
                          language
                        )}
                        className="movie-discover-link"
                      >
                        {language}
                      </Link>
                    </span>
                  )
                )
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span>Country</span>

            <strong>
              {loading ? (
                <Skeleton
                  width="120px"
                  height="18px"
                />
              ) : movie?.countries?.length ? (
                movie.countries.map(
                  (country, index) => (
                    <span key={country}>
                      {index > 0 && ", "}

                      <Link
                        to={discoverLink(
                          "countries",
                          country
                        )}
                        className="movie-discover-link"
                      >
                        {country}
                      </Link>
                    </span>
                  )
                )
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span>Runtime</span>

            <strong>
              {loading ? (
                <Skeleton
                  width="80px"
                  height="18px"
                />
              ) : (
                runtime
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span>Rated</span>

            <strong>
              {loading ? (
                <Skeleton
                  width="60px"
                  height="18px"
                />
              ) : movie?.rated ? (
                <Link
                  to={discoverLink(
                    "rated",
                    movie.rated
                  )}
                  className="movie-discover-link"
                >
                  {movie.rated}
                </Link>
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span>Type</span>

            <strong>
              {loading ? (
                <Skeleton
                  width="80px"
                  height="18px"
                />
              ) : (
                movie?.type || "N/A"
              )}
            </strong>
          </div>
        </div>

        <div className="movie-about__ratings">
          <div className="movie-rating-main">
            <span className="movie-rating-main__label">
              IMDb
            </span>

            <strong>
              {loading ? (
                <Skeleton
                  width="65px"
                  height="40px"
                />
              ) : (
                rating
              )}
            </strong>

            <small>
              {loading ? (
                <Skeleton
                  width="100px"
                  height="16px"
                />
              ) : movie?.imdb?.votes ? (
                `${movie.imdb.votes.toLocaleString()} votes`
              ) : (
                "N/A"
              )}
            </small>
          </div>

          <div className="movie-rating-row">
            <span>Critics</span>

            <strong>
              {loading ? (
                <Skeleton
                  width="50px"
                  height="22px"
                />
              ) : movie?.tomatoes?.critic?.rating ? (
                movie.tomatoes.critic.rating
              ) : movie?.tomatoes?.critic?.meter ? (
                `${movie.tomatoes.critic.meter}%`
              ) : (
                "N/A"
              )}
            </strong>
          </div>

          <div className="movie-rating-row">
            <span>Audience</span>

            <strong>
              {loading ? (
                <Skeleton
                  width="50px"
                  height="22px"
                />
              ) : movie?.tomatoes?.viewer?.rating ? (
                movie.tomatoes.viewer.rating
              ) : movie?.tomatoes?.viewer?.meter ? (
                `${movie.tomatoes.viewer.meter}%`
              ) : (
                "N/A"
              )}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieAbout;