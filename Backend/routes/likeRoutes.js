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

router.use(authMiddleware);

// Like a movie
router.post("/", likeMovie);

// Logged-in user's liked movies
router.get("/", getMyLikes);

// Unlike a movie
router.delete("/:movieId", unlikeMovie);

// Logged-in user's like status + total count
router.get("/:movieId/status", getMovieLikeStatus);

// Public total like count
router.get("/:movieId/count", getMovieLikeCount);

module.exports = router;