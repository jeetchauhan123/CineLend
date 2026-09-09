const mongoose = require("mongoose");
const { sampleDB } = require("../config/db");

const movieSchema = new mongoose.Schema(
  {
    fullplot: String,

    imdb: {
      rating: Number,
      votes: Number,
      id: Number,
    },

    year: Number,

    plot: String,

    genres: [String],

    rated: String,

    metacritic: Number,

    title: {
      type: String,
      required: true,
    },

    lastupdated: String,

    languages: [String],

    writers: [String],

    type: String,

    tomatoes: {
      website: String,

      viewer: {
        rating: Number,
        numReviews: Number,
        meter: Number,
      },

      dvd: Date,

      critic: {
        rating: Number,
        numReviews: Number,
        meter: Number,
      },

      boxOffice: String,

      consensus: String,

      rotten: Number,

      production: String,

      lastUpdated: Date,

      fresh: Number,
    },

    poster: String,

    num_mflix_comments: Number,

    released: Date,

    awards: {
      wins: Number,
      nominations: Number,
      text: String,
    },

    countries: [String],

    cast: [String],

    directors: [String],

    runtime: Number,
  },
  {
    collection: "movies",
  }
);

const Movie = sampleDB.model("Movie", movieSchema);

module.exports = Movie;