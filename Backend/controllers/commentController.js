const mongoose = require("mongoose");

const Comment = require("../models/Comment");
const SampleComment = require("../models/SampleComment");
const Movie = require("../models/Movie");

// Get comments for a movie
const getMovieComments = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Validate movie ID
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    // Check that the movie exists in sampleDB
    const movie = await Movie.findById(movieId).select("_id");

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    // Fetch comments from both databases
    const [sampleComments, cineLendComments] =
      await Promise.all([
        SampleComment.find({ movie_id: movieId })
          .sort({ date: -1 })
          .lean(),

        Comment.find({ movieId })
          .sort({ createdAt: -1 })
          .lean(),
      ]);

    // Convert Sample comments into the same structure
    // used by CineLend comments
    const formattedSampleComments = sampleComments.map(
      (comment) => ({
        _id: comment._id,
        userId: null,
        name: comment.name || "User",
        movieId: comment.movie_id,
        text: comment.text || "",
        rating: null,
        createdAt: comment.date,
        updatedAt: comment.date,
        source: "sample",
      })
    );

    // Mark CineLend comments separately
    const formattedCineLendComments = cineLendComments.map(
      (comment) => ({
        ...comment,
        source: "cinelend",
      })
    );

    // Combine both sources
    const comments = [
      ...formattedSampleComments,
      ...formattedCineLendComments,
    ];

    // Newest comments first
    comments.sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json(comments);
  } catch (error) {
    console.error(
      "Error fetching movie comments:",
      error.message
    );

    res.status(500).json({
      message: "Failed to fetch movie comments",
    });
  }
};

module.exports = {
  getMovieComments,
};