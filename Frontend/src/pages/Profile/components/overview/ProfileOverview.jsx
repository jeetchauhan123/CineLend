import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../../../context/AuthContext";

import "./ProfileOverview.css";

function ProfileOverview({ onSectionChange }) {
  const { token } = useAuth();

  const [rentalItems, setRentalItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [collectionCount, setCollectionCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const [rentalMovies, setRentalMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchOverview = async () => {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const results = await Promise.allSettled([
        axios.get("http://localhost:3000/rentals", { headers }),
        axios.get("http://localhost:3000/cart", { headers }),
        axios.get("http://localhost:3000/likes", { headers }),
        axios.get("http://localhost:3000/collections", { headers }),
        axios.get("http://localhost:3000/comments/mine", { headers }),
      ]);

      /*
       * =======================================================
       * RENTALS
       * =======================================================
       */

      if (results[0].status === "fulfilled") {
        const data = results[0].value.data;

        const rentals = Array.isArray(data)
          ? data
          : Array.isArray(data?.rentals)
            ? data.rentals
            : [];

        const activeItems = rentals.flatMap((rental) =>
          (rental.items || [])
            .filter((item) => {
              if (item.status !== "active") {
                return false;
              }

              if (
                item.expiresAt &&
                new Date(item.expiresAt).getTime() <= Date.now()
              ) {
                return false;
              }

              return true;
            })
            .map((item) => ({
              ...item,
              rentalId: rental._id,
            })),
        );

        setRentalItems(activeItems);
      } else {
        console.error("Failed to load rentals:", results[0].reason);

        setRentalItems([]);
      }

      /*
       * =======================================================
       * CART
       * =======================================================
       */

      if (results[1].status === "fulfilled") {
        const data = results[1].value.data;

        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
            ? data.items
            : [];

        setCartCount(items.length);
      } else {
        console.error("Failed to load cart:", results[1].reason);

        setCartCount(0);
      }

      /*
       * =======================================================
       * LIKES
       * =======================================================
       */

      if (results[2].status === "fulfilled") {
        const data = results[2].value.data;

        const count =
          typeof data?.count === "number"
            ? data.count
            : Array.isArray(data)
              ? data.length
              : Array.isArray(data?.likes)
                ? data.likes.length
                : 0;

        setLikeCount(count);

        console.log("Likes response:", data);
        console.log("Like count:", count);
      } else {
        console.error("Failed to load likes:", results[2].reason);

        setLikeCount(0);
      }

      /*
       * =======================================================
       * COLLECTIONS
       * =======================================================
       */

      if (results[3].status === "fulfilled") {
        const data = results[3].value.data;

        const collections = Array.isArray(data)
          ? data
          : Array.isArray(data?.collections)
            ? data.collections
            : [];

        setCollectionCount(
          typeof data?.count === "number" ? data.count : collections.length,
        );
      } else {
        console.error("Failed to load collections:", results[3].reason);

        setCollectionCount(0);
      }

      /*
       * =======================================================
       * COMMENTS
       * =======================================================
       */

      if (results[4].status === "fulfilled") {
        const data = results[4].value.data;

        const comments = Array.isArray(data)
          ? data
          : Array.isArray(data?.comments)
            ? data.comments
            : [];

        setCommentCount(
          typeof data?.count === "number" ? data.count : comments.length,
        );
      } else {
        console.error("Failed to load comments:", results[4].reason);

        setCommentCount(0);
      }

      setLoading(false);
    };

    fetchOverview();
  }, [token]);

  /*
   * =========================================================
   * LOAD RENTED MOVIE POSTERS
   * =========================================================
   */

  useEffect(() => {
    if (!rentalItems.length) {
      setRentalMovies([]);
      return;
    }

    const fetchRentalMovies = async () => {
      const previewItems = rentalItems.slice(0, 4);

      const movies = await Promise.all(
        previewItems.map(async (item) => {
          try {
            const response = await axios.get(
              `http://localhost:3000/movies/${item.movieId}`,
            );

            return {
              ...item,
              movie: response.data,
            };
          } catch (error) {
            console.error(`Failed to load movie ${item.movieId}:`, error);

            return null;
          }
        }),
      );

      setRentalMovies(movies.filter((item) => item && item.movie));
    };

    fetchRentalMovies();
  }, [rentalItems]);

  /*
   * =========================================================
   * NEXT EXPIRY
   * =========================================================
   */

  const nextExpiry = useMemo(() => {
    if (!rentalItems.length) {
      return null;
    }

    return [...rentalItems].sort(
      (a, b) =>
        new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime(),
    )[0];
  }, [rentalItems]);

  /*
   * =========================================================
   * EXPIRY
   * =========================================================
   */

  const formatExpiry = (date) => {
    if (!date) {
      return "";
    }

    const difference = new Date(date).getTime() - Date.now();

    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return "Expires today";
    }

    if (days === 1) {
      return "Expires tomorrow";
    }

    return `Expires in ${days} days`;
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <section className="profile-overview">
      {/* =====================================================
          INTRO
      ===================================================== */}

      <div className="profile-overview-intro">
        <span className="profile-overview-eyebrow">YOUR LIBRARY</span>

        <h2>Your cinematic space</h2>

        <p>
          Keep track of your rentals, favorites, collections, and everything
          you've been watching.
        </p>
      </div>

      {/* =====================================================
          MAIN LIBRARY
      ===================================================== */}

      <div className="profile-overview-library-grid">
        {/* ===================================================
            RENTED MOVIES
        =================================================== */}

        <section className="profile-overview-card profile-rented-card">
          <div className="profile-card-heading">
            <div className="profile-card-title">
              <span>LIBRARY</span>
              <h3>Rented Movies</h3>
            </div>

            <button type="button" onClick={() => onSectionChange("rented")}>
              View all →
            </button>
          </div>

          <div className="profile-rented-layout">
            <div className="profile-rented-posters">
              {loading ? (
                <div className="profile-rented-empty">
                  <span>◷</span>
                  <p>Loading your rentals...</p>
                </div>
              ) : rentalMovies.length > 0 ? (
                rentalMovies.map((item) => (
                  <Link
                    key={item._id}
                    to={`/movie/${item.movieId}`}
                    className="profile-rented-poster"
                  >
                    <img src={item.movie.poster} alt={item.movie.title} />

                    <div className="profile-rented-poster-info">
                      <strong>{item.movie.title}</strong>

                      <span>{formatExpiry(item.expiresAt)}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="profile-rented-empty">
                  <span>◷</span>

                  <p>No active rentals yet.</p>

                  <Link to="/discover">Explore movies →</Link>
                </div>
              )}
            </div>

            <div className="profile-rented-data">
              <span className="profile-live-label">ACTIVE RENTALS</span>

              <strong className="profile-rented-count">
                {loading ? "—" : rentalItems.length}
              </strong>

              {nextExpiry && (
                <span className="profile-expiry">
                  {formatExpiry(nextExpiry.expiresAt)}
                </span>
              )}

              <button type="button" onClick={() => onSectionChange("rented")}>
                Manage rentals →
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================
            CART
        =================================================== */}

        <Link to="/cart" className="profile-overview-card profile-stat-card">
          <div className="profile-card-heading">
            <div className="profile-card-title">
              <span>READY TO RENT</span>
              <h3>Your Cart</h3>
            </div>

            <span className="profile-card-icon">↗</span>
          </div>

          <div className="profile-stat-body">
            <strong>{loading ? "—" : cartCount}</strong>

            <span>{cartCount === 1 ? "movie waiting" : "movies waiting"}</span>
          </div>

          <span className="profile-card-action">View cart →</span>
        </Link>
      </div>

      {/* =====================================================
          ACTIVITY
      ===================================================== */}

      <div className="profile-overview-section-label">
        <span>YOUR ACTIVITY</span>
      </div>

      <div className="profile-overview-activity-grid">
        {/* LIKES */}

        <button
          type="button"
          className="profile-overview-card profile-stat-card"
        >
          <div className="profile-card-heading">
            <div className="profile-card-title">
              <span>FAVORITES</span>
              <h3>Liked Movies</h3>
            </div>

            <span className="profile-card-icon">♡</span>
          </div>

          <div className="profile-stat-body">
            <strong>{loading ? "—" : likeCount}</strong>

            <span>{likeCount === 1 ? "liked movie" : "liked movies"}</span>
          </div>

          <span className="profile-card-action">Your favorites →</span>
        </button>

        {/* COLLECTIONS */}

        <button
          type="button"
          className="profile-overview-card profile-stat-card"
          onClick={() => onSectionChange("collections")}
        >
          <div className="profile-card-heading">
            <div className="profile-card-title">
              <span>ORGANIZE</span>
              <h3>Collections</h3>
            </div>

            <span className="profile-card-icon">✦</span>
          </div>

          <div className="profile-stat-body">
            <strong>{loading ? "—" : collectionCount}</strong>

            <span>{collectionCount === 1 ? "collection" : "collections"}</span>
          </div>

          <span className="profile-card-action">Manage collections →</span>
        </button>

        {/* COMMENTS */}

        <button
          type="button"
          className="profile-overview-card profile-stat-card"
          onClick={() => onSectionChange("comments")}
        >
          <div className="profile-card-heading">
            <div className="profile-card-title">
              <span>ACTIVITY</span>
              <h3>Comments</h3>
            </div>

            <span className="profile-card-icon">◌</span>
          </div>

          <div className="profile-stat-body">
            <strong>{loading ? "—" : commentCount}</strong>

            <span>
              {commentCount === 1 ? "movie comment" : "movie comments"}
            </span>
          </div>

          <span className="profile-card-action">Manage comments →</span>
        </button>
      </div>

      {/* =====================================================
          EXPLORE
      ===================================================== */}

      <section className="profile-overview-card profile-explore-card">
        <div className="profile-card-heading">
          <div className="profile-card-title">
            <span>DISCOVER</span>
            <h3>Continue Exploring</h3>
          </div>

          <Link to="/discover">Explore →</Link>
        </div>

        <div className="profile-explore-content">
          <div className="profile-explore-mark">✦</div>

          <div className="profile-explore-copy">
            <strong>There's always another movie to discover.</strong>

            <p>
              Browse the CineLend library and find something worth adding to
              your collection.
            </p>
          </div>

          <Link to="/discover" className="profile-explore-button">
            Browse library →
          </Link>
        </div>
      </section>
    </section>
  );
}

export default ProfileOverview;
