const mongoose = require("mongoose");
const { cineLendDB } = require("../config/db");

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

likeSchema.index(
  { userId: 1, movieId: 1 },
  { unique: true }
);

const Like = cineLendDB.model("Like", likeSchema);

module.exports = Like;