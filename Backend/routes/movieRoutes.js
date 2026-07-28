const express = require("express");

const {
  getMovies,
  getMovieById,
  getGenres,
  getRecentMovies,
} = require("../controllers/movieController");

const router = express.Router();

// Flexible movie API
router.get("/", getMovies);

// Get all unique genres
router.get("/genres", getGenres);

// Hero Slider API
router.get("/recent", getRecentMovies);

// Get one movie by ID
router.get("/:id", getMovieById);

module.exports = router;