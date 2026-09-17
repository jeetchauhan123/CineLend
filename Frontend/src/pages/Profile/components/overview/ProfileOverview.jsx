import "./ProfileOverview.css";

function ProfileOverview({ onSectionChange }) {
  return (
    <section className="profile-overview">
      <div className="profile-overview-intro">
        <span>YOUR LIBRARY</span>

        <h2>Your cinematic space</h2>

        <p>
          Keep track of your rentals, organize movies into collections, and
          revisit your activity.
        </p>
      </div>

      <div className="profile-stat-grid">
        <button
          type="button"
          className="profile-stat-card"
          onClick={() => onSectionChange("rented")}
        >
          <div>
            <span className="profile-stat-label">RENTED MOVIES</span>

            <strong>0</strong>
          </div>

          <span className="profile-stat-action">Manage →</span>
        </button>

        <button
          type="button"
          className="profile-stat-card"
          onClick={() => onSectionChange("collections")}
        >
          <div>
            <span className="profile-stat-label">COLLECTIONS</span>

            <strong>0</strong>
          </div>

          <span className="profile-stat-action">Manage →</span>
        </button>

        <button
          type="button"
          className="profile-stat-card"
          onClick={() => onSectionChange("comments")}
        >
          <div>
            <span className="profile-stat-label">COMMENTS</span>

            <strong>0</strong>
          </div>

          <span className="profile-stat-action">Manage →</span>
        </button>
      </div>

      <div className="profile-overview-grid">
        <section className="profile-overview-panel profile-explore-panel">
          <div className="profile-panel-heading">
            <div>
              <span>DISCOVER</span>
              <h3>Continue Exploring</h3>
            </div>

            <button type="button">Explore →</button>
          </div>

          <div className="profile-overview-placeholder">
            <span>✦</span>

            <p>Movies you explore will appear here.</p>
          </div>
        </section>

        <section className="profile-overview-panel">
          <div className="profile-panel-heading">
            <div>
              <span>LIBRARY</span>
              <h3>Recently Rented</h3>
            </div>

            <button type="button" onClick={() => onSectionChange("rented")}>
              View all →
            </button>
          </div>

          <div className="profile-overview-placeholder">
            <span>◷</span>

            <p>Your latest rentals will appear here.</p>
          </div>
        </section>
      </div>
    </section>
  );
}

export default ProfileOverview;
