const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  likeMovie,
  unlikeMovie,
  getMovieLikeStatus,
  getMovieLikeCount,
  getMyLikes,
} = require("../controllers/likeController");

const router = express.Router();

// Public total like count
router.get("/:movieId/count", getMovieLikeCount);

// Like a movie — authentication required
router.post("/", authMiddleware, likeMovie);

// Logged-in user's liked movies — authentication required
router.get("/", authMiddleware, getMyLikes);

// Unlike a movie — authentication required
router.delete("/:movieId", authMiddleware, unlikeMovie);

// Logged-in user's like status + total count — authentication required
router.get("/:movieId/status", authMiddleware, getMovieLikeStatus);

module.exports = router;
