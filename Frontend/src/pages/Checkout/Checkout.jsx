import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const rental = location.state?.rental;

  if (!rental) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h1>Checkout unavailable</h1>
          <p>
            Your rental information is missing. Please select a rental duration
            again.
          </p>

          <Link to="/cart" className="checkout-primary-button">
            Back to Cart
          </Link>
        </div>
      </main>
    );
  }

  const isSingle = rental.type === "single";

  const rentals = isSingle
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

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        rental: {
          ...rental,
          rentals,
          totalPrice,
        },
      },
    });
  };

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-heading">
          <div>
            <span className="checkout-eyebrow">CINELEND</span>
            <h1>Checkout</h1>
            <p>Review your rental before continuing to payment.</p>
          </div>

          <Link to="/cart" className="checkout-back-link">
            ← Back to Cart
          </Link>
        </div>

        <div className="checkout-layout">
          <section className="checkout-main">
            <div className="checkout-section">
              <div className="checkout-section-heading">
                <div>
                  <span>RENTAL</span>
                  <h2>
                    {isSingle ? "Your movie" : `${rentals.length} movies`}
                  </h2>
                </div>
              </div>

              <div className="checkout-movie-list">
                {rentals.map(({ movie, duration }) => (
                  <article className="checkout-movie" key={movie._id}>
                    <img
                      src={movie.poster || "/placeholder-poster.jpg"}
                      alt={movie.title}
                    />

                    <div className="checkout-movie-info">
                      <h3>{movie.title}</h3>

                      <div className="checkout-movie-meta">
                        <span>{duration.name}</span>
                        <span>•</span>
                        <span>
                          {duration.days} {duration.days === 1 ? "day" : "days"}
                        </span>
                      </div>
                    </div>

                    <strong>₹{duration.price}</strong>
                  </article>
                ))}
              </div>
            </div>

            <div className="checkout-section checkout-info">
              <span className="checkout-info-icon">i</span>

              <div>
                <h3>Demo rental</h3>
                <p>
                  This project uses a demo payment flow. No real payment will be
                  processed.
                </p>
              </div>
            </div>
          </section>

          <aside className="checkout-summary">
            <span className="checkout-summary-label">ORDER SUMMARY</span>

            <div className="checkout-summary-row">
              <span>Movies</span>
              <strong>{rentals.length}</strong>
            </div>

            <div className="checkout-summary-row">
              <span>Rental</span>
              <strong>{isSingle ? "Individual" : "All Movies"}</strong>
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-total">
              <span>Total</span>
              <strong>₹{totalPrice}</strong>
            </div>

            <button
              type="button"
              className="checkout-payment-button"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>

            <p className="checkout-secure-text">
              Demo payment • No real charge
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
