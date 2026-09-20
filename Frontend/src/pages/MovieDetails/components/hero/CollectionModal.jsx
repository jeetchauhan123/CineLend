import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../../context/AuthContext";

import "./CollectionModal.css";

const CollectionModal = ({ movieId, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [collections, setCollections] = useState([]);
  const [collectionsLoading, setCollectionsLoading] = useState(false);

  // Stores collection IDs currently being added/removed.
  // Each collection is processed independently.
  const [processingCollections, setProcessingCollections] = useState(new Set());

  const [collectionError, setCollectionError] = useState("");

  const [newCollectionName, setNewCollectionName] = useState("");

  const [newCollectionDescription, setNewCollectionDescription] = useState("");

  const [creatingCollection, setCreatingCollection] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!token) {
      onClose();
      navigate("/login");
      return;
    }

    const getCollections = async () => {
      try {
        setCollectionsLoading(true);
        setCollectionError("");

        const response = await axios.get(
          `http://localhost:3000/collections?movieId=${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCollections(response.data.collections || []);
      } catch (error) {
        console.error("Error loading collections:", error);

        setCollectionError(
          error.response?.data?.message || "Failed to load collections.",
        );
      } finally {
        setCollectionsLoading(false);
      }
    };

    getCollections();
  }, [isOpen, token, navigate, onClose, movieId]);

  const setCollectionProcessing = (collectionId, processing) => {
    setProcessingCollections((previous) => {
      const next = new Set(previous);

      if (processing) {
        next.add(collectionId);
      } else {
        next.delete(collectionId);
      }

      return next;
    });
  };

  const handleToggleCollection = async (collectionId) => {
    if (!token) {
      return;
    }

    // Don't allow another click on this same collection
    // while its current request is still running.
    if (processingCollections.has(collectionId)) {
      return;
    }

    const selectedCollection = collections.find(
      (collection) => collection._id === collectionId,
    );

    if (!selectedCollection) {
      return;
    }

    const alreadyAdded = selectedCollection.containsMovie;

    try {
      setCollectionProcessing(collectionId, true);

      setCollectionError("");

      if (alreadyAdded) {
        // REMOVE
        await axios.delete(
          `http://localhost:3000/collections/${collectionId}/movies/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        // ADD
        await axios.post(
          `http://localhost:3000/collections/${collectionId}/movies`,
          {
            movieId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      // Update only the collection that was clicked.
      setCollections((previous) =>
        previous.map((collection) =>
          collection._id === collectionId
            ? {
                ...collection,
                containsMovie: !alreadyAdded,
              }
            : collection,
        ),
      );
    } catch (error) {
      console.error("Error updating collection:", error);

      setCollectionError(
        error.response?.data?.message ||
          `Failed to ${
            alreadyAdded ? "remove movie from" : "add movie to"
          } collection.`,
      );
    } finally {
      setCollectionProcessing(collectionId, false);
    }
  };

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) {
      setCollectionError("Collection name is required.");
      return;
    }

    if (creatingCollection) {
      return;
    }

    try {
      setCreatingCollection(true);
      setCollectionError("");

      const response = await axios.post(
        "http://localhost:3000/collections",
        {
          name: newCollectionName.trim(),
          description: newCollectionDescription.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const newCollection = response.data.collection;

      // Add the newly-created collection to the UI
      // immediately as "not added" first.
      setCollections((previous) => [
        {
          ...newCollection,
          containsMovie: false,
        },
        ...previous,
      ]);

      setNewCollectionName("");
      setNewCollectionDescription("");

      // Immediately add the movie to the new collection.
      setCollectionProcessing(newCollection._id, true);

      try {
        await axios.post(
          `http://localhost:3000/collections/${newCollection._id}/movies`,
          {
            movieId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCollections((previous) =>
          previous.map((collection) =>
            collection._id === newCollection._id
              ? {
                  ...collection,
                  containsMovie: true,
                }
              : collection,
          ),
        );
      } catch (error) {
        console.error("Error adding movie to new collection:", error);

        setCollectionError(
          error.response?.data?.message ||
            "Collection was created, but the movie could not be added.",
        );
      } finally {
        setCollectionProcessing(newCollection._id, false);
      }
    } catch (error) {
      console.error("Error creating collection:", error);

      setCollectionError(
        error.response?.data?.message || "Failed to create collection.",
      );
    } finally {
      setCreatingCollection(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="collection-modal__backdrop" onClick={onClose}>
      <div
        className="collection-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="collection-modal__header">
          <div>
            <span className="collection-modal__eyebrow">YOUR LIBRARY</span>

            <h2>Manage Collections</h2>

            <p>Add or remove this movie from your collections.</p>
          </div>

          <button
            type="button"
            className="collection-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {collectionError && (
          <p className="collection-modal__error">{collectionError}</p>
        )}

        <div className="collection-modal__body">
          <div className="collection-modal__existing">
            <div className="collection-modal__section-title">
              <span>Your Collections</span>
            </div>

            {collectionsLoading ? (
              <div className="collection-modal__loading">
                Loading collections...
              </div>
            ) : collections.length ? (
              <div className="collection-modal__list">
                {collections.map((collection) => {
                  const alreadyAdded = collection.containsMovie;

                  const isProcessing = processingCollections.has(
                    collection._id,
                  );

                  return (
                    <button
                      key={collection._id}
                      type="button"
                      className={`collection-modal__item ${
                        alreadyAdded ? "is-added" : ""
                      } ${isProcessing ? "is-processing" : ""}`}
                      onClick={() => handleToggleCollection(collection._id)}
                      disabled={isProcessing || creatingCollection}
                    >
                      <span className="collection-modal__item-icon">
                        {isProcessing ? "..." : alreadyAdded ? "✓" : "+"}
                      </span>

                      <span className="collection-modal__item-info">
                        <strong>{collection.name}</strong>

                        {collection.description && (
                          <small>{collection.description}</small>
                        )}
                      </span>

                      {alreadyAdded && (
                        <span className="collection-modal__item-status">
                          Added
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="collection-modal__empty">
                You haven't created any collections yet.
              </div>
            )}
          </div>

          <div className="collection-modal__divider">
            <span>or</span>
          </div>

          <div className="collection-modal__create">
            <div className="collection-modal__section-title">
              <span>Create New Collection</span>
            </div>

            <input
              type="text"
              placeholder="Collection name"
              value={newCollectionName}
              onChange={(event) => {
                setNewCollectionName(event.target.value);
                setCollectionError("");
              }}
              disabled={creatingCollection}
            />

            <textarea
              placeholder="Description (optional)"
              rows="2"
              value={newCollectionDescription}
              onChange={(event) => {
                setNewCollectionDescription(event.target.value);
                setCollectionError("");
              }}
              disabled={creatingCollection}
            />

            <button
              type="button"
              className="collection-modal__create-btn"
              onClick={handleCreateCollection}
              disabled={creatingCollection || !newCollectionName.trim()}
            >
              {creatingCollection ? "Creating..." : "Create & Add Movie"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;
