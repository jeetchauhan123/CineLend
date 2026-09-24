import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import "./RentedMovies.css";

const RentedMovies = () => {
  const { token } = useAuth();

  const [rentals, setRentals] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [returningItem, setReturningItem] = useState(null);
  const [error, setError] = useState("");

  const fetchRentals = async () => {
    if (!token) {
      setRentals([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/rentals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const rentalDocuments = response.data || [];

      const flattenedRentals = rentalDocuments.flatMap((rental) =>
        rental.items.map((item) => ({
          ...item,
          rentalId: rental._id,
        })),
      );

      setRentals(flattenedRentals);

      const uniqueMovieIds = [
        ...new Set(flattenedRentals.map((item) => String(item.movieId))),
      ];

      const movieResponses = await Promise.all(
        uniqueMovieIds.map(async (movieId) => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}/movies/${movieId}`,
            );

            return {
              movieId,
              movie: response.data,
            };
          } catch (error) {
            console.error(`Failed to load movie ${movieId}:`, error);

            return {
              movieId,
              movie: null,
            };
          }
        }),
      );

      const detailsMap = {};

      movieResponses.forEach(({ movieId, movie }) => {
        detailsMap[movieId] = movie;
      });

      setMovieDetails(detailsMap);
    } catch (error) {
      console.error("Failed to load rentals:", error);

      setError(
        error.response?.data?.message || "Failed to load your rented movies.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, [token]);

  const handleReturnMovie = async (rentalId, itemId) => {
    try {
      setReturningItem(itemId);
      setError("");

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/rentals/${rentalId}/items/${itemId}/return`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchRentals();
    } catch (error) {
      console.error("Failed to return movie:", error);

      setError(error.response?.data?.message || "Failed to return the movie.");
    } finally {
      setReturningItem(null);
    }
  };

  const activeRentals = rentals.filter((item) => item.status === "active");

  const rentalHistory = rentals.filter((item) => item.status !== "active");

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getMovie = (movieId) => {
    return movieDetails[String(movieId)];
  };

  const RentalCard = ({ item }) => {
    const movie = getMovie(item.movieId);

    return (
      <article className="rented-movie-card">
        <div className="rented-movie-poster">
          {movie?.poster ? (
            <img src={movie.poster} alt={movie.title || item.title} />
          ) : (
            <div className="rented-movie-poster-placeholder">No Poster</div>
          )}
        </div>

        <div className="rented-movie-content">
          <div className="rented-movie-main">
            <h3>{movie?.title || item.title}</h3>

            <span
              className={`rented-movie-status rented-movie-status--${item.status}`}
            >
              {item.status}
            </span>
          </div>

          <div className="rented-movie-meta">
            <span>
              {item.durationDays} {item.durationDays === 1 ? "day" : "days"}
            </span>

            <span>₹{item.price}</span>

            <span>Rented {formatDate(item.rentedAt)}</span>

            <span>
              {item.status === "active"
                ? `Expires ${formatDate(item.expiresAt)}`
                : item.status === "expired"
                  ? `Expired ${formatDate(item.expiresAt)}`
                  : `Returned ${formatDate(item.updatedAt)}`}
            </span>
          </div>

          {item.status === "active" && (
            <button
              type="button"
              className="rented-movie-return"
              onClick={() => handleReturnMovie(item.rentalId, item._id)}
              disabled={returningItem === item._id}
            >
              {returningItem === item._id ? "Returning..." : "Return Movie"}
            </button>
          )}
        </div>
      </article>
    );
  };

  if (loading) {
    return (
      <section className="rented-movies-section">
        <div className="rented-movies-heading">
          <h2>Rented Movies</h2>
          <p>Loading your rentals...</p>
        </div>

        <div className="rented-movies-loading">Loading...</div>
      </section>
    );
  }

  return (
    <section className="rented-movies-section">
      <div className="rented-movies-heading">
        <h2>Rented Movies</h2>
        <p>Manage your active rentals and view your rental history.</p>
      </div>

      {error && <div className="rented-movies-error">{error}</div>}

      {!rentals.length ? (
        <div className="rented-movies-empty">
          <h3>No rented movies yet</h3>
          <p>Movies you rent will appear here.</p>
        </div>
      ) : (
        <>
          {activeRentals.length > 0 && (
            <div className="rented-movies-group">
              <div className="rented-movies-group-heading">
                <h3>Active Rentals</h3>
                <span>{activeRentals.length}</span>
              </div>

              <div className="rented-movies-list">
                {activeRentals.map((item) => (
                  <RentalCard
                    key={`${item.rentalId}-${item._id}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}

          {rentalHistory.length > 0 && (
            <div className="rented-movies-group rented-movies-history">
              <div className="rented-movies-group-heading">
                <h3>Rental History</h3>
                <span>{rentalHistory.length}</span>
              </div>

              <div className="rented-movies-list">
                {rentalHistory.map((item) => (
                  <RentalCard
                    key={`${item.rentalId}-${item._id}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default RentedMovies;
