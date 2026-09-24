import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Skeleton from "../../../../components/Skeleton/Skeleton";
import { useAuth } from "../../../../context/AuthContext";

import "./MovieComments.css";

const COMMENTS_PER_LOAD = 5;

const MovieComments = ({
  movieId,
  onCommentsCountChange,
}) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] =
    useState(true);

  const [commentText, setCommentText] = useState("");
  const [commentRating, setCommentRating] =
    useState("");

  const [commentSubmitting, setCommentSubmitting] =
    useState(false);

  const [commentError, setCommentError] =
    useState("");

  const [commentsVisible, setCommentsVisible] =
    useState(COMMENTS_PER_LOAD);

  useEffect(() => {
    const getComments = async () => {
      setCommentsLoading(true);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/comments/${movieId}`
        );

        const loadedComments = res.data;

        setComments(loadedComments);

        onCommentsCountChange?.(
          loadedComments.length
        );
      } catch (error) {
        console.log(
          "Error loading comments:",
          error
        );

        setComments([]);

        onCommentsCountChange?.(0);
      } finally {
        setCommentsLoading(false);
      }
    };

    getComments();

    setCommentsVisible(COMMENTS_PER_LOAD);
    setCommentText("");
    setCommentRating("");
    setCommentError("");
  }, [movieId, onCommentsCountChange]);

  const handlePostComment = async () => {
    setCommentError("");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!commentText.trim()) {
      setCommentError(
        "Please write something before posting."
      );
      return;
    }

    try {
      setCommentSubmitting(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments`,
        {
          movieId,
          text: commentText.trim(),
          rating:
            commentRating === ""
              ? null
              : Number(commentRating),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newComment =
        response.data.comment || response.data;

      setComments((previous) => [
        newComment,
        ...previous,
      ]);

      onCommentsCountChange?.(
        comments.length + 1
      );

      setCommentText("");
      setCommentRating("");
    } catch (error) {
      console.error(
        "Error posting comment:",
        error
      );

      setCommentError(
        error.response?.data?.message ||
          "Failed to post comment. Please try again."
      );
    } finally {
      setCommentSubmitting(false);
    }
  };

  return (
    <section
      id="movie-comments"
      className="movie-section movie-comments"
    >
      <div className="movie-section__heading">
        <span className="movie-section__eyebrow">
          THE COMMUNITY
        </span>

        <h2>What People Are Saying</h2>

        <p>
          Share your thoughts about this movie.
        </p>
      </div>

      <div className="movie-comments__composer">
        <textarea
          placeholder={
            token
              ? "Write your thoughts..."
              : "Sign in to share your thoughts..."
          }
          rows="3"
          value={commentText}
          onChange={(event) => {
            setCommentText(event.target.value);
            setCommentError("");
          }}
          disabled={!token || commentSubmitting}
        />

        <div className="movie-comments__composer-footer">
          <div className="movie-comments__rating">
            <span className="movie-comments__rating-label">
              Rate this movie
            </span>

            <div className="movie-comments__rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={
                    star <= Number(commentRating)
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCommentRating(
                      star ===
                        Number(commentRating)
                        ? ""
                        : String(star)
                    )
                  }
                  disabled={
                    !token || commentSubmitting
                  }
                  aria-label={`Rate ${star} out of 5`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {commentError && (
            <span className="movie-comments__error">
              {commentError}
            </span>
          )}

          <button
            type="button"
            onClick={
              token
                ? handlePostComment
                : () => navigate("/login")
            }
            disabled={commentSubmitting}
          >
            {commentSubmitting
              ? "Posting..."
              : "Post Comment"}
          </button>
        </div>
      </div>

      <div className="movie-comments__list">
        {commentsLoading ? (
          <div className="movie-comment">
            <Skeleton
              width="42px"
              height="42px"
              borderRadius="50%"
            />

            <div className="movie-comment__content">
              <Skeleton
                width="140px"
                height="16px"
              />

              <Skeleton
                width="85%"
                height="16px"
              />

              <Skeleton
                width="65%"
                height="16px"
              />
            </div>
          </div>
        ) : comments.length ? (
          comments
            .slice(0, commentsVisible)
            .map((comment) => (
              <div
                className="movie-comment"
                key={comment._id}
              >
                <div className="movie-comment__avatar">
                  {comment.name
                    ?.charAt(0)
                    .toUpperCase() || "U"}
                </div>

                <div className="movie-comment__content">
                  <div className="movie-comment__header">
                    <strong>
                      {comment.name || "User"}
                    </strong>

                    <span>
                      {comment.createdAt
                        ? new Date(
                            comment.createdAt
                          ).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "Just now"}
                    </span>
                  </div>

                  <p>{comment.text}</p>

                  {comment.rating && (
                    <span className="movie-comment__rating">
                      ★ {comment.rating}/5
                    </span>
                  )}

                  <button
                    type="button"
                    className="movie-comment__like"
                  >
                    ♡ 0
                  </button>
                </div>
              </div>
            ))
        ) : (
          <div className="movie-comment movie-comment--empty">
            <div className="movie-comment__avatar">
              U
            </div>

            <div className="movie-comment__content">
              <div className="movie-comment__header">
                <strong>No comments yet</strong>
              </div>

              <p>
                Be the first to share your thoughts
                about this movie.
              </p>
            </div>
          </div>
        )}
      </div>

      {commentsVisible < comments.length && (
        <button
          type="button"
          className="movie-comments__more"
          onClick={() =>
            setCommentsVisible(
              (previous) =>
                previous + COMMENTS_PER_LOAD
            )
          }
        >
          Read more
        </button>
      )}
    </section>
  );
};

export default MovieComments;