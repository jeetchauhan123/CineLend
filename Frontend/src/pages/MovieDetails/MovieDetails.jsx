import axios from "axios";
import MovieCard from "../../components/homemovie/MovieCard";
import Skeleton from "../../components/Skeleton/Skeleton";
import "./MovieDetails.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();

  const discoverLink = (param, value) =>
    `/discover?${new URLSearchParams({ [param]: value }).toString()}`;

  const discoverYearLink = (year) =>
    `/discover?${new URLSearchParams({
      yearFrom: year,
      yearTo: year,
    }).toString()}`;

  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [overviewExpanded, setOverviewExpanded] = useState(false);

  useEffect(() => {
    const getDetail = async () => {
      setLoading(true);
      setOverviewExpanded(false);

      try {
        const res = await axios.get(`http://localhost:3000/movies/${id}`);

        setMovieData(res.data);
      } catch (error) {
        console.log("Error loading movie:", error);
        setMovieData(null);
      } finally {
        setLoading(false);
      }
    };

    getDetail();
  }, [id]);

  const poster =
    movieData?.poster ||
    "https://placehold.co/350x520/2c2c2c/ffffff?text=No+Poster";

  const releaseYear = movieData?.released
    ? new Date(movieData.released).getFullYear()
    : movieData?.year || "N/A";

  const releaseDate = movieData?.released
    ? new Date(movieData.released).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A";

  const rating = movieData?.imdb?.rating ?? "N/A";

  const runtime = movieData?.runtime ? `${movieData.runtime} min` : "N/A";

  /*
   * Overview logic:
   *
   * 1. If plot exists, use it as the short/default description.
   * 2. If only fullplot exists, use fullplot.
   * 3. If both exist, Read More reveals the fullplot.
   * 4. If only plot exists and it is long, Read More expands it.
   */

  const shortPlot = movieData?.plot || movieData?.fullplot || "";

  const fullPlot =
    movieData?.fullplot && movieData.fullplot !== movieData?.plot
      ? movieData.fullplot
      : null;

  const shouldShowReadMore =
    Boolean(fullPlot) || (!fullPlot && shortPlot.length > 420);

  const plot = shortPlot || "No story description is available for this title.";

  return (
    <div className="movie-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="movie-hero">
        {loading ? (
          <div className="movie-hero__background movie-hero__background--loading">
            <Skeleton width="100%" height="100%" />
          </div>
        ) : (
          <div
            className="movie-hero__background"
            style={{
              backgroundImage: `url(${poster})`,
            }}
          />
        )}

        <div className="movie-hero__overlay" />

        <div className="movie-hero__content">
          <div className="movie-hero__poster">
            {loading ? (
              <Skeleton width="100%" height="100%" borderRadius="20px" />
            ) : (
              <img src={poster} alt={movieData?.title || "Movie poster"} />
            )}
          </div>

          <div className="movie-hero__info">
            <div className="movie-hero__heading">
              {loading ? (
                <Skeleton width="min(520px, 80%)" height="52px" />
              ) : (
                <h1>{movieData?.title || "N/A"}</h1>
              )}
            </div>

            <div className="movie-hero__meta">
              <span className="movie-hero__rating">
                <span className="movie-hero__rating-star">★</span>
                {loading ? <Skeleton width="35px" height="18px" /> : rating}
              </span>

              <span>
                {loading ? (
                  <Skeleton width="45px" height="18px" />
                ) : releaseYear !== "N/A" ? (
                  <Link
                    to={discoverYearLink(releaseYear)}
                    className="movie-discover-link"
                  >
                    {releaseYear}
                  </Link>
                ) : (
                  releaseYear
                )}
              </span>

              <span>
                {loading ? <Skeleton width="65px" height="18px" /> : runtime}
              </span>

              <span>
                {loading ? (
                  <Skeleton width="45px" height="18px" />
                ) : movieData?.rated ? (
                  <Link
                    to={discoverLink("rated", movieData.rated)}
                    className="movie-discover-link"
                  >
                    {movieData.rated}
                  </Link>
                ) : (
                  "N/A"
                )}
              </span>
            </div>

            <div className="movie-hero__genres">
              {loading ? (
                <>
                  <Skeleton width="70px" height="28px" borderRadius="999px" />
                  <Skeleton width="85px" height="28px" borderRadius="999px" />
                  <Skeleton width="65px" height="28px" borderRadius="999px" />
                </>
              ) : movieData?.genres?.length ? (
                movieData.genres.map((genre) => (
                  <span key={genre}>
                    <Link
                      to={discoverLink("genres", genre)}
                      className="movie-discover-link"
                    >
                      {genre}
                    </Link>
                  </span>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>

            <div className="movie-hero__actions">
              <button type="button" className="movie-hero__rent">
                Rent Movie
              </button>

              <button type="button" className="movie-hero__wishlist">
                <span>♡</span>
                <span>Wishlist</span>
              </button>
            </div>

            <div className="movie-hero__community">
              <button type="button" className="movie-hero__community-item">
                <span className="movie-hero__community-icon">♡</span>

                <span className="movie-hero__community-count">0</span>
              </button>

              <span className="movie-hero__community-divider">·</span>

              <button
                type="button"
                className="movie-hero__community-item"
                onClick={() => {
                  document.getElementById("movie-comments")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <span className="movie-hero__community-icon">💬</span>

                <span className="movie-hero__community-count">0</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OVERVIEW
      ===================================================== */}

      <section className="movie-section movie-overview">
        {/* Cinematic background decoration */}
        <img
          className="movie-overview__decoration"
          src="/image4.webp"
          alt=""
          aria-hidden="true"
        />

        <div className="movie-section__heading">
          <span className="movie-section__eyebrow">THE STORY</span>

          <h2>Overview</h2>
        </div>

        {loading ? (
          <div className="movie-overview__skeleton">
            <Skeleton width="92%" height="18px" />
            <Skeleton width="84%" height="18px" />
            <Skeleton width="88%" height="18px" />
          </div>
        ) : (
          <div
            className={`movie-overview__content ${
              overviewExpanded ? "is-expanded" : ""
            }`}
          >
            <div className="movie-overview__text">
              <p>{overviewExpanded && fullPlot ? fullPlot : plot}</p>
            </div>

            {shouldShowReadMore && (
              <button
                type="button"
                className="movie-overview__more"
                onClick={() => setOverviewExpanded((previous) => !previous)}
              >
                {overviewExpanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        )}
      </section>

      {/* =====================================================
          ABOUT THE FILM
      ===================================================== */}

      <section className="movie-section movie-about">
        {/* Cinematic background decoration */}
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
              <span>Director</span>

              <strong>
                {loading ? (
                  <Skeleton width="180px" height="18px" />
                ) : movieData?.directors?.length ? (
                  movieData.directors.map((director, index) => (
                    <span key={director}>
                      {index > 0 && ", "}
                      <Link
                        to={discoverLink("director", director)}
                        className="movie-discover-link"
                      >
                        {director}
                      </Link>
                    </span>
                  ))
                ) : (
                  "N/A"
                )}
              </strong>
            </div>

            <div className="movie-detail-item">
              <span>Writers</span>

              <strong>
                {loading ? (
                  <Skeleton width="220px" height="18px" />
                ) : movieData?.writers?.length ? (
                  movieData.writers.map((writer, index) => (
                    <span key={writer}>
                      {index > 0 && ", "}
                      <Link
                        to={discoverLink("writer", writer)}
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
                  <Skeleton width="140px" height="18px" />
                ) : (
                  releaseDate
                )}
              </strong>
            </div>

            <div className="movie-detail-item">
              <span>Languages</span>

              <strong>
                {loading ? (
                  <Skeleton width="130px" height="18px" />
                ) : movieData?.languages?.length ? (
                  movieData.languages.map((language, index) => (
                    <span key={language}>
                      {index > 0 && ", "}
                      <Link
                        to={discoverLink("languages", language)}
                        className="movie-discover-link"
                      >
                        {language}
                      </Link>
                    </span>
                  ))
                ) : (
                  "N/A"
                )}
              </strong>
            </div>

            <div className="movie-detail-item">
              <span>Country</span>

              <strong>
                {loading ? (
                  <Skeleton width="120px" height="18px" />
                ) : movieData?.countries?.length ? (
                  movieData.countries.map((country, index) => (
                    <span key={country}>
                      {index > 0 && ", "}
                      <Link
                        to={discoverLink("countries", country)}
                        className="movie-discover-link"
                      >
                        {country}
                      </Link>
                    </span>
                  ))
                ) : (
                  "N/A"
                )}
              </strong>
            </div>

            <div className="movie-detail-item">
              <span>Runtime</span>

              <strong>
                {loading ? <Skeleton width="80px" height="18px" /> : runtime}
              </strong>
            </div>

            <div className="movie-detail-item">
              <span>Rated</span>

              <strong>
                {loading ? (
                  <Skeleton width="60px" height="18px" />
                ) : movieData?.rated ? (
                  <Link
                    to={discoverLink("rated", movieData.rated)}
                    className="movie-discover-link"
                  >
                    {movieData.rated}
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
                  <Skeleton width="80px" height="18px" />
                ) : (
                  movieData?.type || "N/A"
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
                ) : movieData?.imdb?.votes ? (
                  `${movieData.imdb.votes.toLocaleString()} votes`
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
                ) : movieData?.tomatoes?.critic?.rating ? (
                  movieData.tomatoes.critic.rating
                ) : movieData?.tomatoes?.critic?.meter ? (
                  `${movieData.tomatoes.critic.meter}%`
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
                ) : movieData?.tomatoes?.viewer?.rating ? (
                  movieData.tomatoes.viewer.rating
                ) : movieData?.tomatoes?.viewer?.meter ? (
                  `${movieData.tomatoes.viewer.meter}%`
                ) : (
                  "N/A"
                )}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CAST & CREW
      ===================================================== */}

      <section className="movie-section movie-cast-crew">
        {/* Cinematic background decoration */}
        <img
          className="movie-cast-crew__decoration"
          src="/chair.png"
          alt=""
          aria-hidden="true"
        />

        <div className="movie-section__heading">
          <span className="movie-section__eyebrow">THE PEOPLE</span>

          <h2>Cast & Crew</h2>
        </div>

        <div className="movie-cast-crew__group">
          <h3>Cast</h3>

          <div className="movie-cast-crew__list">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  width="120px"
                  height="38px"
                  borderRadius="999px"
                />
              ))
            ) : movieData?.cast?.length ? (
              movieData.cast.map((actor) => (
                <Link
                  className="movie-person movie-discover-link"
                  key={actor}
                  to={discoverLink("cast", actor)}
                >
                  {actor}
                </Link>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>

        <div className="movie-cast-crew__group">
          <h3>Directors</h3>

          <div className="movie-cast-crew__list">
            {loading ? (
              <Skeleton width="180px" height="38px" borderRadius="999px" />
            ) : movieData?.directors?.length ? (
              movieData.directors.map((director) => (
                <Link
                  className="movie-person movie-discover-link"
                  key={director}
                  to={discoverLink("director", director)}
                >
                  {director}
                </Link>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>

        <div className="movie-cast-crew__group">
          <h3>Writers</h3>

          <div className="movie-cast-crew__list">
            {loading ? (
              <Skeleton width="180px" height="38px" borderRadius="999px" />
            ) : movieData?.writers?.length ? (
              movieData.writers.map((writer) => (
                <Link
                  className="movie-person movie-discover-link"
                  key={writer}
                  to={discoverLink("writer", writer)}
                >
                  {writer}
                </Link>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          AWARDS & FACTS
      ===================================================== */}

      <section className="movie-section movie-awards-facts">
        <div className="movie-section__heading">
          <span className="movie-section__eyebrow">MORE TO KNOW</span>

          <h2>Awards & Facts</h2>
        </div>

        <div className="movie-awards">
          <div className="movie-awards__main">
            <span className="movie-awards__icon">🏆</span>

            <div>
              <span className="movie-awards__label">Awards</span>

              <strong>
                {loading ? (
                  <Skeleton width="300px" height="20px" />
                ) : (
                  movieData?.awards?.text || "No awards information available."
                )}
              </strong>
            </div>
          </div>

          <div className="movie-awards__stats">
            <div>
              <strong>
                {loading ? (
                  <Skeleton width="35px" height="25px" />
                ) : (
                  (movieData?.awards?.wins ?? 0)
                )}
              </strong>

              <span>Wins</span>
            </div>

            <div>
              <strong>
                {loading ? (
                  <Skeleton width="35px" height="25px" />
                ) : (
                  (movieData?.awards?.nominations ?? 0)
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
                <Skeleton width="55px" height="20px" />
              ) : releaseYear !== "N/A" ? (
                <Link
                  to={discoverYearLink(releaseYear)}
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
                <Skeleton width="130px" height="20px" />
              ) : movieData?.genres?.length ? (
                movieData.genres.map((genre, index) => (
                  <span key={genre}>
                    {index > 0 && ", "}
                    <Link
                      to={discoverLink("genres", genre)}
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
                <Skeleton width="130px" height="20px" />
              ) : (
                movieData?.tomatoes?.production || "N/A"
              )}
            </strong>
          </div>

          <div className="movie-fact">
            <span>Movie Type</span>

            <strong>
              {loading ? (
                <Skeleton width="80px" height="20px" />
              ) : (
                movieData?.type || "N/A"
              )}
            </strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMENTS
      ===================================================== */}

      <section id="movie-comments" className="movie-section movie-comments">
        <div className="movie-section__heading">
          <span className="movie-section__eyebrow">THE COMMUNITY</span>

          <h2>What People Are Saying</h2>

          <p>Share your thoughts about this movie.</p>
        </div>

        <div className="movie-comments__composer">
          <textarea placeholder="Write your thoughts..." rows="3" />

          <button type="button">Post Comment</button>
        </div>

        <div className="movie-comments__list">
          <div className="movie-comment">
            <div className="movie-comment__avatar">U</div>

            <div className="movie-comment__content">
              <div className="movie-comment__header">
                <strong>User</strong>
                <span>Just now</span>
              </div>

              <p>No comments yet. Be the first to share your thoughts.</p>

              <button type="button" className="movie-comment__like">
                ♡ 0
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RELATED MOVIES
      ===================================================== */}

      <section className="movie-section movie-related">
        <div className="movie-section__heading">
          <span className="movie-section__eyebrow">KEEP EXPLORING</span>

          <h2>You May Also Like</h2>
        </div>

        <div className="movie-related__slider">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                width="240px"
                height="360px"
                borderRadius="18px"
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
