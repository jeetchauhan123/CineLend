import "./MyComments.css";

function MyComments({ onBack }) {
  return (
    <section className="my-comments">
      <button type="button" className="comments-back-btn" onClick={onBack}>
        <span>←</span>
        Back to Overview
      </button>

      <div className="comments-header">
        <div>
          <span>YOUR ACTIVITY</span>

          <h2>My Comments</h2>

          <p>View and manage the comments you've posted on movies.</p>
        </div>
      </div>

      <div className="comments-empty-state">
        <div className="comments-empty-icon">◌</div>

        <h3>No comments yet</h3>

        <p>Your movie discussions and reviews will appear here.</p>
      </div>
    </section>
  );
}

export default MyComments;
