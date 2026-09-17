import "./Collections.css";

function Collections({ onBack }) {
  return (
    <section className="collections">
      <button type="button" className="collections-back-btn" onClick={onBack}>
        <span>←</span>
        Back to Overview
      </button>

      <div className="collections-header">
        <div>
          <span>YOUR LIBRARY</span>

          <h2>Collections</h2>

          <p>
            Create your own spaces for the movies you want to keep together.
          </p>
        </div>

        <button type="button" className="collections-primary-btn">
          + New Collection
        </button>
      </div>

      <div className="collections-empty-state">
        <div className="collections-empty-icon">▱</div>

        <h3>Your collections are empty</h3>

        <p>Create a collection and start organizing your favorite movies.</p>
      </div>
    </section>
  );
}

export default Collections;
