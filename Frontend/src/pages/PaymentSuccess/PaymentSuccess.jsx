import { Link, useLocation } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const location = useLocation();
  const rental = location.state?.rental;

  if (!rental) {
    return (
      <main className="payment-success-page">
        <div className="payment-success-card">
          <div className="payment-success-icon">?</div>

          <h1>Rental information unavailable</h1>

          <p>
            We couldn't find the details for this rental.
          </p>

          <Link
            to="/profile"
            className="payment-success-button"
          >
            Go to Profile
          </Link>
        </div>
      </main>
    );
  }

  const activeItems = rental.items || [];

  return (
    <main className="payment-success-page">
      <div className="payment-success-card">
        <div className="payment-success-icon">
          ✓
        </div>

        <span className="payment-success-eyebrow">
          RENTAL CONFIRMED
        </span>

        <h1>Payment successful</h1>

        <p className="payment-success-message">
          Your movie{activeItems.length !== 1 ? "s" : ""}{" "}
          {activeItems.length !== 1 ? "are" : "is"} now available
          in your rentals.
        </p>

        <div className="payment-success-summary">
          <div className="payment-success-summary-row">
            <span>Movies</span>
            <strong>{activeItems.length}</strong>
          </div>

          <div className="payment-success-summary-row">
            <span>Total paid</span>
            <strong>₹{rental.totalPrice}</strong>
          </div>

          <div className="payment-success-summary-row">
            <span>Payment</span>
            <strong>Demo</strong>
          </div>
        </div>

        <div className="payment-success-movies">
          {activeItems.map((item) => (
            <div
              className="payment-success-movie"
              key={item._id}
            >
              <div>
                <strong>{item.title}</strong>

                <span>
                  {item.durationDays}{" "}
                  {item.durationDays === 1
                    ? "day"
                    : "days"}
                </span>
              </div>

              <strong>₹{item.price}</strong>
            </div>
          ))}
        </div>

        <div className="payment-success-actions">
          <Link
            to="/profile"
            className="payment-success-button"
          >
            View My Rentals
          </Link>

          <Link
            to="/discover"
            className="payment-success-secondary"
          >
            Continue Exploring
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;