import { Link } from "react-router-dom";

import Skeleton from "../../../../components/Skeleton/Skeleton";

import "./MovieAbout.css";

const MovieAbout = ({ movie, loading }) => {
  const discoverLink = (param, value) =>
    `/discover?${new URLSearchParams({
      [param]: value,
    }).toString()}`;

  const releaseDate = movie?.released
    ? new Date(movie.released).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A";

  const rating = movie?.imdb?.rating ?? "N/A";

  const runtime = movie?.runtime ? `${movie.runtime} min` : "N/A";

  const renderLinkedValues = (values, param) => {
    if (!values?.length) {
      return (
        <>
          <i className="movie-detail-dot"></i>
          <span>N/A</span>
        </>
      );
    }

    return (
      <>
        <i className="movie-detail-dot"></i>

        {values.map((value, index) => (
          <span className="movie-detail-value-item" key={value}>
            <Link
              to={discoverLink(param, value)}
              className="movie-discover-link"
            >
              {value}
            </Link>

            {index < values.length - 1 && (
              <i className="movie-detail-separator">•</i>
            )}
          </span>
        ))}
      </>
    );
  };

  return (
    <section className="movie-section movie-about">
      <img
        className="movie-about__decoration"
        src="/image4.png"
        alt=""
        aria-hidden="true"
      />

      <div className="movie-section__heading">
        <span className="movie-section__eyebrow">THE FILM</span>

        <h2>About the Film</h2>
      </div>

      <div className="movie-about__layout">
        <div className="movie-about__details">
          <div className="movie-detail-item">
            <span className="movie-detail-label">Director</span>

            <strong className="movie-detail-value">
              {loading ? (
                <Skeleton width="180px" height="18px" />
              ) : (
                renderLinkedValues(movie?.directors, "director")
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span className="movie-detail-label">Writers</span>

            <strong className="movie-detail-value">
              {loading ? (
                <Skeleton width="220px" height="18px" />
              ) : (
                renderLinkedValues(movie?.writers, "writer")
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span className="movie-detail-label">Released</span>

            <strong className="movie-detail-value">
              {loading ? (
                <Skeleton width="140px" height="18px" />
              ) : (
                <>
                  <i className="movie-detail-dot"></i>
                  <span>{releaseDate}</span>
                </>
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span className="movie-detail-label">Languages</span>

            <strong className="movie-detail-value">
              {loading ? (
                <Skeleton width="130px" height="18px" />
              ) : (
                renderLinkedValues(movie?.languages, "languages")
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span className="movie-detail-label">Country</span>

            <strong className="movie-detail-value">
              {loading ? (
                <Skeleton width="120px" height="18px" />
              ) : (
                renderLinkedValues(movie?.countries, "countries")
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span className="movie-detail-label">Runtime</span>

            <strong className="movie-detail-value">
              {loading ? (
                <Skeleton width="80px" height="18px" />
              ) : (
                <>
                  <i className="movie-detail-dot"></i>
                  <span>{runtime}</span>
                </>
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span className="movie-detail-label">Rated</span>

            <strong className="movie-detail-value">
              {loading ? (
                <Skeleton width="60px" height="18px" />
              ) : movie?.rated ? (
                <>
                  <i className="movie-detail-dot"></i>

                  <Link
                    to={discoverLink("rated", movie.rated)}
                    className="movie-discover-link"
                  >
                    {movie.rated}
                  </Link>
                </>
              ) : (
                <>
                  <i className="movie-detail-dot"></i>
                  <span>N/A</span>
                </>
              )}
            </strong>
          </div>

          <div className="movie-detail-item">
            <span className="movie-detail-label">Type</span>

            <strong className="movie-detail-value">
              {loading ? (
                <Skeleton width="80px" height="18px" />
              ) : (
                <>
                  <i className="movie-detail-dot"></i>
                  <span>{movie?.type || "N/A"}</span>
                </>
              )}
            </strong>
          </div>
        </div>

        <div className="movie-about__ratings">
          <div className="movie-rating-main">
            <span className="movie-rating-main__label">IMDb</span>

            <strong>
              {loading ? <Skeleton width="65px" height="40px" /> : rating}
            </strong>

            <small>
              {loading ? (
                <Skeleton width="100px" height="16px" />
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
                <Skeleton width="50px" height="22px" />
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
                <Skeleton width="50px" height="22px" />
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
