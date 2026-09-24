import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import "./Collections.css";

function Collections({ onBack }) {
  const { token } = useAuth();

  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const [loading, setLoading] = useState(true);
  const [collectionLoading, setCollectionLoading] = useState(false);

  const [error, setError] = useState("");

  // FETCH ALL COLLECTIONS
  const fetchCollections = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/collections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }

      const data = await response.json();

      setCollections(data.collections || []);
    } catch (error) {
      console.error("Error loading collections:", error);

      setError("Unable to load your collections.");
      setCollections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchCollections();
  }, [token]);

  // OPEN COLLECTION
  const openCollection = async (collectionId) => {
    try {
      setCollectionLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/collections/${collectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch collection");
      }

      const data = await response.json();

      setSelectedCollection(data);
    } catch (error) {
      console.error("Error loading collection:", error);

      setError("Unable to open this collection.");
    } finally {
      setCollectionLoading(false);
    }
  };

  // BACK TO COLLECTION LIST
  const closeCollection = () => {
    setSelectedCollection(null);
    setError("");
  };

  // COLLECTION DETAIL VIEW
  if (selectedCollection) {
    const { collection, movies } = selectedCollection;

    return (
      <section className="collections">
        <button
          type="button"
          className="collections-back-btn"
          onClick={closeCollection}
        >
          <span>←</span>
          Back to Collections
        </button>

        <div className="collection-detail-header">
          <div>
            <span className="collection-detail-label">YOUR COLLECTION</span>

            <h2>{collection.name}</h2>

            <p>
              {collection.description || "Movies saved in this collection."}
            </p>
          </div>

          <div className="collection-detail-count">
            <strong>{movies.length}</strong>

            <span>{movies.length === 1 ? "movie" : "movies"}</span>
          </div>
        </div>

        {error && <div className="collections-error">{error}</div>}

        {movies.length === 0 ? (
          <div className="collection-detail-empty">
            <div className="collections-empty-icon">▱</div>

            <h3>This collection is empty</h3>

            <p>Add movies to this collection and they will appear here.</p>
          </div>
        ) : (
          <div className="collection-movies-grid">
            {movies.map((movie) => (
              <article className="collection-movie-card" key={movie._id}>
                <div className="collection-movie-poster">
                  {movie.poster ? (
                    <img src={movie.poster} alt={movie.title} />
                  ) : (
                    <div className="collection-movie-no-poster">No Poster</div>
                  )}
                </div>

                <div className="collection-movie-info">
                  <h3>{movie.title}</h3>

                  {movie.released && (
                    <span>{new Date(movie.released).getFullYear()}</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {collectionLoading && (
          <div className="collections-loading-overlay">Loading...</div>
        )}
      </section>
    );
  }

  // COLLECTION LIST VIEW
  return (
    <section className="collections">
      <button type="button" className="collections-back-btn" onClick={onBack}>
        <span>←</span>
        Back to Overview
      </button>

      <div className="collections-header">
        <div className="collections-heading">
          <span>YOUR LIBRARY</span>

          <div className="collections-title-row">
            <h2>Collections</h2>

            {!loading && (
              <span className="collections-count">{collections.length}</span>
            )}
          </div>

          <p>
            Create your own spaces for the movies you want to keep together.
          </p>
        </div>

        <button type="button" className="collections-primary-btn">
          <span>+</span>
          New Collection
        </button>
      </div>

      {error && <div className="collections-error">{error}</div>}

      {loading ? (
        <div className="collections-loading">Loading your collections...</div>
      ) : collections.length === 0 ? (
        <div className="collections-empty-state">
          <div className="collections-empty-icon">▱</div>

          <h3>Your collections are empty</h3>

          <p>Create a collection and start organizing your favorite movies.</p>

          <button type="button" className="collections-empty-btn">
            + Create your first collection
          </button>
        </div>
      ) : (
        <div className="collections-grid">
          {collections.map((collection) => (
            <article
              className="collection-card"
              key={collection._id}
              onClick={() => openCollection(collection._id)}
            >
              <div className="collection-card-top">
                <div className="collection-icon">▱</div>

                <button
                  type="button"
                  className="collection-menu-btn"
                  aria-label="Collection options"
                  onClick={(event) => event.stopPropagation()}
                >
                  •••
                </button>
              </div>

              <div className="collection-card-content">
                <h3>{collection.name}</h3>

                <p>
                  {collection.description || "Your personal movie collection"}
                </p>
              </div>

              <div className="collection-card-footer">
                <span>
                  {collection.movieCount}{" "}
                  {collection.movieCount === 1 ? "movie" : "movies"}
                </span>

                <span className="collection-open">Open →</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Collections;
