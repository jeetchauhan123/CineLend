const express = require("express");

const {
  getMovieComments,
} = require("../controllers/commentController");

const router = express.Router();

// Get comments for a movie
router.get("/:movieId", getMovieComments);

module.exports = router;