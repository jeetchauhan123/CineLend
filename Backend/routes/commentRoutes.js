const express = require("express");

const {
  createComment,
  getMovieComments,
  getMyComments,
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a comment
router.post("/", authMiddleware, createComment);

// LOGGED-IN USER'S COMMENTS
router.get("/mine", authMiddleware, getMyComments);

// Get comments for a movie
router.get("/:movieId", getMovieComments);

module.exports = router;
