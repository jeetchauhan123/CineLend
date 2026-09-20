const mongoose = require("mongoose");

const Like = require("../models/Like");
const Movie = require("../models/Movie");

// =========================================================
// LIKE A MOVIE
// =========================================================

const likeMovie = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findById(movieId).select("_id");

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    const existingLike = await Like.findOne({
      userId,
      movieId,
    });

    if (existingLike) {
      return res.status(409).json({
        message: "Movie already liked",
      });
    }

    const like = await Like.create({
      userId,
      movieId,
    });

    const likeCount = await Like.countDocuments({ movieId });

    res.status(201).json({
      message: "Movie liked",
      liked: true,
      likeCount,
      like,
    });
  } catch (error) {
    console.error("Like movie error:", error);

    res.status(500).json({
      message: "Failed to like movie",
    });
  }
};

// =========================================================
// UNLIKE A MOVIE
// =========================================================

const unlikeMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const deletedLike = await Like.findOneAndDelete({
      userId,
      movieId,
    });

    if (!deletedLike) {
      return res.status(404).json({
        message: "Like not found",
      });
    }

    const likeCount = await Like.countDocuments({ movieId });

    res.json({
      message: "Movie unliked",
      liked: false,
      likeCount,
    });
  } catch (error) {
    console.error("Unlike movie error:", error);

    res.status(500).json({
      message: "Failed to unlike movie",
    });
  }
};

// =========================================================
// GET MOVIE LIKE STATUS + COUNT
// =========================================================

const getMovieLikeStatus = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const liked = await Like.exists({
      userId,
      movieId,
    });

    const likeCount = await Like.countDocuments({
      movieId,
    });

    res.json({
      liked: Boolean(liked),
      likeCount,
    });
  } catch (error) {
    console.error("Get like status error:", error);

    res.status(500).json({
      message: "Failed to get like status",
    });
  }
};

// =========================================================
// GET MOVIE LIKE COUNT
// =========================================================

const getMovieLikeCount = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const likeCount = await Like.countDocuments({
      movieId,
    });

    res.json({
      likeCount,
    });
  } catch (error) {
    console.error("Get like count error:", error);

    res.status(500).json({
      message: "Failed to get like count",
    });
  }
};

module.exports = {
  likeMovie,
  unlikeMovie,
  getMovieLikeStatus,
  getMovieLikeCount,
};
