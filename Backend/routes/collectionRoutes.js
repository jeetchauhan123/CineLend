const express = require("express");

const {
  createCollection,
  getUserCollections,
  getCollection,
  updateCollection,
  deleteCollection,
  addMovieToCollection,
  removeMovieFromCollection,
} = require("../controllers/collectionController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =========================================================
// COLLECTIONS
// =========================================================

// Create collection
router.post("/", authMiddleware, createCollection);

// Get logged-in user's collections
router.get("/", authMiddleware, getUserCollections);

// Get a single collection with its movies
router.get(
  "/:collectionId",
  authMiddleware,
  getCollection
);

// Update collection
router.put(
  "/:collectionId",
  authMiddleware,
  updateCollection
);

// Delete collection
router.delete(
  "/:collectionId",
  authMiddleware,
  deleteCollection
);

// =========================================================
// MOVIES INSIDE COLLECTIONS
// =========================================================

// Add movie to collection
router.post(
  "/:collectionId/movies",
  authMiddleware,
  addMovieToCollection
);

// Remove movie from collection
router.delete(
  "/:collectionId/movies/:movieId",
  authMiddleware,
  removeMovieFromCollection
);

module.exports = router;
