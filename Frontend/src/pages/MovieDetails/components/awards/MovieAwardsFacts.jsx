import { Link } from "react-router-dom";

import Skeleton from "../../../../components/Skeleton/Skeleton";

import "./MovieAwardsFacts.css";

const MovieAwardsFacts = ({ movie, loading }) => {
  const discoverLink = (param, value) =>
    `/discover?${new URLSearchParams({
      [param]: value,
    }).toString()}`;

  const releaseYear = movie?.released
    ? new Date(movie.released).getFullYear()
    : movie?.year || "N/A";

  return (
    <section className="movie-section movie-awards-facts">
      <div className="movie-section__heading">
        <span className="movie-section__eyebrow">
          MORE TO KNOW
        </span>

        <h2>Awards & Facts</h2>
      </div>

      <div className="movie-awards">
        <div className="movie-awards__main">
          <span className="movie-awards__icon">
            🏆
          </span>

          <div>
            <span className="movie-awards__label">
              Awards
            </span>

            <strong>
              {loading ? (
                <Skeleton
                  width="300px"
                  height="20px"
                />
              ) : (
                movie?.awards?.text ||
                "No awards information available."
              )}
            </strong>
          </div>
        </div>

        <div className="movie-awards__stats">
          <div>
            <strong>
              {loading ? (
                <Skeleton
                  width="35px"
                  height="25px"
                />
              ) : (
                movie?.awards?.wins ?? 0
              )}
            </strong>

            <span>Wins</span>
          </div>

          <div>
            <strong>
              {loading ? (
                <Skeleton
                  width="35px"
                  height="25px"
                />
              ) : (
                movie?.awards?.nominations ?? 0
              )}
            </strong>

            <span>Nominations</span>
          </div>
        </div>
      </div>

      <div className="movie-facts">
        <div className="movie-fact">
          <span>Release Year</span>

          <strong>
            {loading ? (
              <Skeleton
                width="55px"
                height="20px"
              />
            ) : releaseYear !== "N/A" ? (
              <Link
                to={discoverLink(
                  "year",
                  releaseYear
                )}
                className="movie-discover-link"
              >
                {releaseYear}
              </Link>
            ) : (
              releaseYear
            )}
          </strong>
        </div>

        <div className="movie-fact">
          <span>Genres</span>

          <strong>
            {loading ? (
              <Skeleton
                width="130px"
                height="20px"
              />
            ) : movie?.genres?.length ? (
              movie.genres.map((genre, index) => (
                <span key={genre}>
                  {index > 0 && ", "}

                  <Link
                    to={discoverLink(
                      "genres",
                      genre
                    )}
                    className="movie-discover-link"
                  >
                    {genre}
                  </Link>
                </span>
              ))
            ) : (
              "N/A"
            )}
          </strong>
        </div>

        <div className="movie-fact">
          <span>Production</span>

          <strong>
            {loading ? (
              <Skeleton
                width="130px"
                height="20px"
              />
            ) : (
              movie?.tomatoes?.production || "N/A"
            )}
          </strong>
        </div>

        <div className="movie-fact">
          <span>Movie Type</span>

          <strong>
            {loading ? (
              <Skeleton
                width="80px"
                height="20px"
              />
            ) : (
              movie?.type || "N/A"
            )}
          </strong>
        </div>
      </div>
    </section>
  );
};

export default MovieAwardsFacts;