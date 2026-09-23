import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import "./MyComments.css";

function MyComments({ onBack }) {
  const { token } = useAuth();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyComments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:3000/comments/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();

      setComments(data.comments || []);
    } catch (error) {
      console.error("Error loading comments:", error);

      setError("Unable to load your comments.");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchMyComments();
  }, [token]);

  const openComment = (movieId, commentId) => {
    window.location.href = `/movie/${movieId}?comment=${commentId}`;
  };

  return (
    <section className="my-comments">
      <button type="button" className="comments-back-btn" onClick={onBack}>
        <span>←</span>
        Back to Overview
      </button>

      <div className="comments-header">
        <div>
          <span>YOUR ACTIVITY</span>

          <div className="comments-title-row">
            <h2>My Comments</h2>

            {!loading && (
              <span className="comments-count">{comments.length}</span>
            )}
          </div>

          <p>View and manage the comments you've posted on movies.</p>
        </div>
      </div>

      {error && <div className="comments-error">{error}</div>}

      {loading ? (
        <div className="comments-loading">Loading your comments...</div>
      ) : comments.length === 0 ? (
        <div className="comments-empty-state">
          <div className="comments-empty-icon">◌</div>

          <h3>No comments yet</h3>

          <p>Your movie discussions and reviews will appear here.</p>
        </div>
      ) : (
        <div className="comments-list">
          {comments.map((comment) => {
            const movie = comment.movie;

            const year = movie?.released
              ? new Date(movie.released).getFullYear()
              : null;

            const commentDate = comment.createdAt
              ? new Date(comment.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "";

            return (
              <article className="my-comment-card" key={comment._id}>
                <div className="my-comment-movie">
                  <div className="my-comment-poster">
                    {movie?.poster ? (
                      <img src={movie.poster} alt={movie.title} />
                    ) : (
                      <div className="my-comment-no-poster">No Poster</div>
                    )}
                  </div>

                  <div className="my-comment-movie-info">
                    <span className="my-comment-label">COMMENTED ON</span>

                    <h3>{movie?.title || "Unknown Movie"}</h3>

                    {year && <span className="my-comment-year">{year}</span>}
                  </div>
                </div>

                <div className="my-comment-content">
                  <div className="my-comment-meta">
                    <span>{commentDate}</span>

                    {comment.rating !== null &&
                      comment.rating !== undefined && (
                        <span className="my-comment-rating">
                          ★ {comment.rating}/5
                        </span>
                      )}
                  </div>

                  <p className="my-comment-text">{comment.text}</p>

                  {movie?._id && (
                    <button
                      type="button"
                      className="my-comment-link"
                      onClick={() => openComment(movie._id, comment._id)}
                    >
                      View comment
                      <span>→</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default MyComments;
