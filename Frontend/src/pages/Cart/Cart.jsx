import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RentalPanel from "./components/RentalPanel";
import "./Cart.css";

const Cart = () => {
  const { token } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingMovieId, setRemovingMovieId] = useState(null);
  const [clearing, setClearing] = useState(false);

  const [rentalTarget, setRentalTarget] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, [token]);

  const removeMovie = async (movieId) => {
    try {
      setRemovingMovieId(movieId);

      await axios.delete(`http://localhost:3000/cart/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems((currentItems) =>
        currentItems.filter((item) => item.movieId !== movieId),
      );
    } catch (error) {
      console.error("Error removing movie:", error);
    } finally {
      setRemovingMovieId(null);
    }
  };

  const clearCart = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your cart?",
    );

    if (!confirmed) return;

    try {
      setClearing(true);

      await axios.delete("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setClearing(false);
    }
  };

  const openSingleRental = async (movieId) => {
    try {
      const [movieResponse, pricingResponse] = await Promise.all([
        axios.get(`http://localhost:3000/movies/${movieId}`),
        axios.get(`http://localhost:3000/movies/${movieId}/pricing`),
      ]);

      setRentalTarget({
        type: "single",
        movie: movieResponse.data,
        pricing: pricingResponse.data,
      });
    } catch (error) {
      console.error("Error loading rental information:", error);
    }
  };

  const openRentAll = async () => {
    try {
      const rentalMovies = await Promise.all(
        cartItems.map(async (item) => {
          const [movieResponse, pricingResponse] = await Promise.all([
            axios.get(`http://localhost:3000/movies/${item.movieId}`),
            axios.get(
              `http://localhost:3000/movies/${item.movieId}/pricing`,
            ),
          ]);

          return {
            movie: movieResponse.data,
            pricing: pricingResponse.data,
          };
        }),
      );

      setRentalTarget({
        type: "all",
        movies: rentalMovies,
      });
    } catch (error) {
      console.error("Error loading rental information:", error);
    }
  };

  const handleContinueToCheckout = (rentalData) => {
    console.log("Rental selected:", rentalData);

    // Checkout will be implemented next.
  };

  if (!token) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <h1>Sign in to view your cart</h1>
          <p>Your cart is available after you sign in.</p>

          <Link to="/login" className="cart-primary-button">
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="cart-page">
        <div className="cart-loading">Loading your cart...</div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-heading">
          <div>
            <span className="cart-eyebrow">CINELEND</span>

            <h1>Your Cart</h1>

            <p>
              {cartItems.length === 0
                ? "Your cart is currently empty."
                : `${cartItems.length} movie${
                    cartItems.length !== 1 ? "s" : ""
                  } ready to rent.`}
            </p>
          </div>

          {cartItems.length > 0 && (
            <div className="cart-heading-actions">
              <button
                type="button"
                className="cart-rent-all-button"
                onClick={openRentAll}
              >
                Rent All
              </button>

              <button
                type="button"
                className="cart-clear-button"
                onClick={clearCart}
                disabled={clearing}
              >
                {clearing ? "Clearing..." : "Clear Cart"}
              </button>
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">＋</div>

            <h2>Your cart is empty</h2>

            <p>
              Browse the collection and add movies you want to rent.
            </p>

            <Link to="/discover" className="cart-primary-button">
              Explore Movies
            </Link>
          </div>
        ) : (
          <div className="cart-list">
            {cartItems.map((item) => (
              <CartItem
                key={item.movieId}
                movieId={item.movieId}
                removing={removingMovieId === item.movieId}
                onRemove={removeMovie}
                onRent={openSingleRental}
              />
            ))}
          </div>
        )}
      </div>

      {rentalTarget && (
        <RentalPanel
          target={rentalTarget}
          onClose={() => setRentalTarget(null)}
          onContinue={handleContinueToCheckout}
        />
      )}
    </main>
  );
};

const CartItem = ({
  movieId,
  removing,
  onRemove,
  onRent,
}) => {
  const [movie, setMovie] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieAndPricing = async () => {
      try {
        const [movieResponse, pricingResponse] = await Promise.all([
          axios.get(`http://localhost:3000/movies/${movieId}`),
          axios.get(`http://localhost:3000/movies/${movieId}/pricing`),
        ]);

        setMovie(movieResponse.data);
        setPricing(pricingResponse.data);
      } catch (error) {
        console.error("Error loading movie or pricing:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovieAndPricing();
  }, [movieId]);

  if (loading) {
    return (
      <div className="cart-item cart-item-loading">
        Loading movie...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="cart-item cart-item-error">
        <span>Unable to load this movie.</span>

        <button
          type="button"
          onClick={() => onRemove(movieId)}
          disabled={removing}
        >
          Remove
        </button>
      </div>
    );
  }

  const year = movie.released
    ? new Date(movie.released).getFullYear()
    : "N/A";

  return (
    <article className="cart-item">
      <Link
        to={`/movie/${movie._id}`}
        className="cart-item-poster"
      >
        <img
          src={movie.poster || "/placeholder-poster.jpg"}
          alt={movie.title}
        />
      </Link>

      <div className="cart-item-info">
        <Link
          to={`/movie/${movie._id}`}
          className="cart-item-title"
        >
          {movie.title}
        </Link>

        <div className="cart-item-meta">
          <span>{year}</span>

          {movie.runtime && (
            <>
              <span>•</span>
              <span>{movie.runtime} min</span>
            </>
          )}

          {movie.imdb?.rating && (
            <>
              <span>•</span>
              <span>★ {movie.imdb.rating}</span>
            </>
          )}
        </div>

        {movie.genres?.length > 0 && (
          <div className="cart-item-genres">
            {movie.genres.slice(0, 3).map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
        )}

        {pricing && (
          <div className="cart-item-pricing">
            <span>Starting from</span>
            <strong>₹{pricing.baseDailyPrice}/day</strong>
          </div>
        )}
      </div>

      <div className="cart-item-action">
        <button
          type="button"
          className="cart-rent-button"
          onClick={() => onRent(movieId)}
        >
          Rent Movie
        </button>

        <button
          type="button"
          className="cart-remove-button"
          onClick={() => onRemove(movieId)}
          disabled={removing}
        >
          {removing ? "Removing..." : "Remove"}
        </button>
      </div>
    </article>
  );
};

export default Cart;