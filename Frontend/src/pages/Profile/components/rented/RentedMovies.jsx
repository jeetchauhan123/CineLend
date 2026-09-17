import "./RentedMovies.css";

function RentedMovies({ onBack }) {
  return (
    <section className="rented-movies">
      <button type="button" className="rented-back-btn" onClick={onBack}>
        <span>←</span>
        Back to Overview
      </button>

      <div className="rented-header">
        <div>
          <span>YOUR LIBRARY</span>

          <h2>Rented Movies</h2>

          <p>Manage your active rentals and rental history.</p>
        </div>
      </div>

      <div className="rented-empty-state">
        <div className="rented-empty-icon">◷</div>

        <h3>No rentals yet</h3>

        <p>
          Movies you rent will appear here so you can manage and return them.
        </p>
      </div>
    </section>
  );
}

export default RentedMovies;
