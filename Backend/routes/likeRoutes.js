const express = require("express");

const {
  likeMovie,
  unlikeMovie,
  getMovieLikeStatus,
  getMovieLikeCount,
} = require("../controllers/likeController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Like a movie
router.post("/", authMiddleware, likeMovie);

// Unlike a movie
router.delete("/:movieId", authMiddleware, unlikeMovie);

// Logged-in user's like status + total count
router.get("/:movieId/status", authMiddleware, getMovieLikeStatus);

// Public total like count
router.get("/:movieId/count", getMovieLikeCount);

module.exports = router;
