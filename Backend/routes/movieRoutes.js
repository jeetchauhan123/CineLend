const express = require("express");

const {
  getMovieById,
  getGenres,
  getRecentMovies,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "routing is working",
  });
})

router.get("/genres", getGenres);

router.get("/recent", getRecentMovies);

router.get("/:id", getMovieById);

module.exports = router;