const mongoose = require("mongoose");

const Comment = require("../models/Comment");
const SampleComment = require("../models/SampleComment");
const Movie = require("../models/Movie");
const User = require("../models/User");

// Create a comment
const createComment = async (req, res) => {
  try {
    const { movieId, text, rating } = req.body;

    const userId = req.user.userId;

    // Validate movie ID
    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    // Validate comment text
    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    // Check that the movie exists in sampleDB
    const movie = await Movie.findById(movieId).select("_id");

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    // Validate rating if provided
    if (
      rating !== undefined &&
      rating !== null &&
      (Number(rating) < 1 || Number(rating) > 5)
    ) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // Get the logged-in user
    const user = await User.findById(userId).select("name");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Create comment in CineLend DB
    const comment = await Comment.create({
      userId,
      name: user.name,
      movieId,
      text: text.trim(),
      rating: rating === undefined || rating === null ? null : Number(rating),
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment: {
        ...comment.toObject(),
        source: "cinelend",
      },
    });
  } catch (error) {
    console.error("Error creating comment:", error.message);

    res.status(500).json({
      message: "Failed to add comment",
    });
  }
};

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
    const [sampleComments, cineLendComments] = await Promise.all([
      SampleComment.find({ movie_id: movieId }).sort({ date: -1 }).lean(),

      Comment.find({ movieId }).sort({ createdAt: -1 }).lean(),
    ]);

    // Convert Sample comments into the same structure
    // used by CineLend comments
    const formattedSampleComments = sampleComments.map((comment) => ({
      _id: comment._id,
      userId: null,
      name: comment.name || "User",
      movieId: comment.movie_id,
      text: comment.text || "",
      rating: null,
      createdAt: comment.date,
      updatedAt: comment.date,
      source: "sample",
    }));

    // Mark CineLend comments separately
    const formattedCineLendComments = cineLendComments.map((comment) => ({
      ...comment,
      source: "cinelend",
    }));

    // Combine both sources
    const comments = [...formattedSampleComments, ...formattedCineLendComments];

    // Newest comments first
    comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching movie comments:", error.message);

    res.status(500).json({
      message: "Failed to fetch movie comments",
    });
  }
};

// GET LOGGED-IN USER'S COMMENTS
const getMyComments = async (req, res) => {
  try {
    const userId = req.user.userId;

    const comments = await Comment.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error(
      "Error fetching my comments:",
      error.message,
    );

    return res.status(500).json({
      message: "Failed to load your comments",
    });
  }
};


module.exports = {
  createComment,
  getMovieComments,
  getMyComments,
};
