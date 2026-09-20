const mongoose = require("mongoose");

const { cineLendDB } = require("../config/db");

const collectionMovieSchema = new mongoose.Schema(
  {
    collectionId: {
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

collectionMovieSchema.index(
  { collectionId: 1, movieId: 1 },
  { unique: true }
);

const CollectionMovie = cineLendDB.model(
  "CollectionMovie",
  collectionMovieSchema
);

module.exports = CollectionMovie;