const express = require("express");

const {
  getMovies,
  getMovieById,
  getGenres,
  getFilters,
  getPeople,
  getRecentMovies,
  getRelatedMovies,
} = require("../controllers/movieController");

const router = express.Router();

// Flexible movie API
router.get("/", getMovies);

// Discover page filters
router.get("/filters", getFilters);

// Search cast/directors/writers
router.get("/people", getPeople);

// Genres (keep temporarily if onboarding still uses it)
router.get("/genres", getGenres);

// Hero Slider
router.get("/recent", getRecentMovies);

// Movie detail bottom suggestion
router.get("/related/:id", getRelatedMovies);

// Movie details
router.get("/:id", getMovieById);

module.exports = router;