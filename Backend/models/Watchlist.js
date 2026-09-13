const mongoose = require("mongoose");
const { cineLendDB } = require("../config/db");

const watchlistSchema = new mongoose.Schema(
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

watchlistSchema.index(
  { userId: 1, movieId: 1 },
  { unique: true }
);

const Watchlist = cineLendDB.model("Watchlist", watchlistSchema);

module.exports = Watchlist;