const express = require("express");

const {
  createComment,
  getMovieComments,
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a comment
router.post("/", authMiddleware, createComment);

// Get comments for a movie
router.get("/:movieId", getMovieComments);

module.exports = router;
