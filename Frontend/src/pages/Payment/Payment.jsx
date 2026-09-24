import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const rental = location.state?.rental;

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  if (!rental) {
    return (
      <main className="payment-page">
        <div className="payment-empty">
          <h1>Payment unavailable</h1>
          <p>
            Your payment information is missing. Please return to checkout and
            try again.
          </p>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="payment-primary-button"
          >
            Back to Cart
          </button>
        </div>
      </main>
    );
  }

  const rentals =
    rental.type === "single"
      ? [
          {
            movie: rental.movie,
            duration: rental.duration,
          },
        ]
      : rental.rentals || [];

  const totalPrice = rentals.reduce(
    (total, item) => total + (item.duration?.price || 0),
    0,
  );

  const handlePayment = async () => {
    if (!token || processing) return;

    try {
      setProcessing(true);
      setError("");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/rentals`,
        {
          items: rentals.map(({ movie, duration }) => ({
            movieId: movie._id,
            duration: {
              type: duration.id,
              days: duration.days,
            },
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/payment/success", {
        state: {
          rental: response.data.rental,
        },
        replace: true,
      });
    } catch (error) {
      console.error("Payment error:", error);

      setError(
        error.response?.data?.message ||
          "Payment could not be completed. Please try again.",
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="payment-page">
      <div className="payment-container">
        <div className="payment-heading">
          <span className="payment-eyebrow">CINELEND</span>
          <h1>Demo Payment</h1>
          <p>Complete your rental with our demo payment flow.</p>
        </div>

        <div className="payment-layout">
          <section className="payment-card">
            <div className="payment-method">
              <div className="payment-method-icon">✓</div>

              <div>
                <span>PAYMENT METHOD</span>
                <h2>Demo Payment</h2>
              </div>
            </div>

            <div className="payment-notice">
              <strong>No real payment will be processed.</strong>

              <p>
                This is a portfolio demonstration. Clicking the button below
                will simulate a successful payment.
              </p>
            </div>

            <div className="payment-order">
              <div className="payment-order-heading">
                <span>YOUR RENTAL</span>
                <strong>
                  {rentals.length} {rentals.length === 1 ? "Movie" : "Movies"}
                </strong>
              </div>

              <div className="payment-movie-list">
                {rentals.map(({ movie, duration }) => (
                  <div className="payment-movie" key={movie._id}>
                    <img
                      src={movie.poster || "/placeholder-poster.jpg"}
                      alt={movie.title}
                    />

                    <div className="payment-movie-info">
                      <h3>{movie.title}</h3>

                      <span>
                        {duration.name} · {duration.days}{" "}
                        {duration.days === 1 ? "day" : "days"}
                      </span>
                    </div>

                    <strong>₹{duration.price}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="payment-summary">
            <span className="payment-summary-label">PAYMENT SUMMARY</span>

            <div className="payment-summary-row">
              <span>Movies</span>
              <strong>{rentals.length}</strong>
            </div>

            <div className="payment-summary-row">
              <span>Payment</span>
              <strong>Demo</strong>
            </div>

            <div className="payment-summary-divider" />

            <div className="payment-total">
              <span>Total</span>
              <strong>₹{totalPrice}</strong>
            </div>

            {error && <div className="payment-error">{error}</div>}

            <button
              type="button"
              className="payment-confirm-button"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? "Processing Payment..." : `Pay ₹${totalPrice}`}
            </button>

            <button
              type="button"
              className="payment-back-button"
              onClick={() => navigate(-1)}
              disabled={processing}
            >
              ← Back to Checkout
            </button>

            <p className="payment-demo-note">
              Demo only • No real money is charged
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Payment;
