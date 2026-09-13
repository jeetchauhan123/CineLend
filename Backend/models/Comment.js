const mongoose = require("mongoose");
const { cineLendDB } = require("../config/db");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = cineLendDB.model("Comment", commentSchema);

module.exports = Comment;