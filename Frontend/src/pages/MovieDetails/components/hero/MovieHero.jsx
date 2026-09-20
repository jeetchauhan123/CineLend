import axios from "axios";
import Skeleton from "../../../../components/Skeleton/Skeleton";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

import CollectionModal from "./CollectionModal";

import "./MovieHero.css";

const MovieHero = ({ movie, loading, movieId, commentsCount }) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [movieLiked, setMovieLiked] = useState(false);
  const [movieLikeCount, setMovieLikeCount] = useState(0);
  const [likeProcessing, setLikeProcessing] = useState(false);

  const [collectionModalOpen, setCollectionModalOpen] = useState(false);

  const discoverLink = (param, value) =>
    `/discover?${new URLSearchParams({
      [param]: value,
    }).toString()}`;

  const discoverYearLink = (year) =>
    `/discover?${new URLSearchParams({
      yearFrom: year,
      yearTo: year,
    }).toString()}`;

  useEffect(() => {
    const getLikeStatus = async () => {
      try {
        if (token) {
          const response = await axios.get(
            `http://localhost:3000/likes/${movieId}/status`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          setMovieLiked(response.data.liked);
          setMovieLikeCount(response.data.likeCount);

          return;
        }

        const response = await axios.get(
          `http://localhost:3000/likes/${movieId}/count`,
        );

        setMovieLiked(false);
        setMovieLikeCount(response.data.likeCount);
      } catch (error) {
        console.error("Error loading like status:", error);
      }
    };

    getLikeStatus();
  }, [movieId, token]);

  const handleMovieLike = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (likeProcessing) {
      return;
    }

    const previousLiked = movieLiked;
    const previousLikeCount = movieLikeCount;

    setLikeProcessing(true);

    setMovieLiked(!previousLiked);

    setMovieLikeCount(
      previousLiked
        ? Math.max(0, previousLikeCount - 1)
        : previousLikeCount + 1,
    );

    try {
      if (previousLiked) {
        const response = await axios.delete(
          `http://localhost:3000/likes/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setMovieLiked(response.data.liked);
        setMovieLikeCount(response.data.likeCount);
      } else {
        const response = await axios.post(
          "http://localhost:3000/likes",
          {
            movieId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setMovieLiked(response.data.liked);
        setMovieLikeCount(response.data.likeCount);
      }
    } catch (error) {
      console.error("Error updating movie like:", error);

      setMovieLiked(previousLiked);
      setMovieLikeCount(previousLikeCount);
    } finally {
      setLikeProcessing(false);
    }
  };

  const poster =
    movie?.poster ||
    "https://placehold.co/350x520/2c2c2c/ffffff?text=No+Poster";

  const releaseYear = movie?.released
    ? new Date(movie.released).getFullYear()
    : movie?.year || "N/A";

  const rating = movie?.imdb?.rating ?? "N/A";

  const runtime = movie?.runtime ? `${movie.runtime} min` : "N/A";

  return (
    <>
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
              <img src={poster} alt={movie?.title || "Movie poster"} />
            )}
          </div>

          <div className="movie-hero__info">
            <div className="movie-hero__heading">
              {loading ? (
                <Skeleton width="min(520px, 80%)" height="52px" />
              ) : (
                <h1>{movie?.title || "N/A"}</h1>
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
                ) : movie?.rated ? (
                  <Link
                    to={discoverLink("rated", movie.rated)}
                    className="movie-discover-link"
                  >
                    {movie.rated}
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
              ) : movie?.genres?.length ? (
                movie.genres.map((genre) => (
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

              <button
                type="button"
                className="movie-hero__wishlist"
                onClick={() => {
                  if (!token) {
                    navigate("/login");
                    return;
                  }

                  setCollectionModalOpen(true);
                }}
              >
                <span>＋</span>
                <span>Add to Collection</span>
              </button>
            </div>

            <div className="movie-hero__community">
              <button
                type="button"
                className={`movie-hero__community-item ${
                  movieLiked ? "is-liked" : ""
                } ${likeProcessing ? "is-processing" : ""}`}
                onClick={handleMovieLike}
                disabled={likeProcessing}
                aria-label={movieLiked ? "Unlike movie" : "Like movie"}
              >
                <span className="movie-hero__community-icon">
                  {movieLiked ? "♥" : "♡"}
                </span>

                <span className="movie-hero__community-count">
                  {movieLikeCount}
                </span>
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

                <span className="movie-hero__community-count">
                  {commentsCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <CollectionModal
        movieId={movieId}
        isOpen={collectionModalOpen}
        onClose={() => setCollectionModalOpen(false)}
      />
    </>
  );
};

export default MovieHero;
